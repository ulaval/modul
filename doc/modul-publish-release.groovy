#!/usr/bin/env groovy


// Script jenkins pour la publication npm de release des packages de modul


pipeline {
	agent {
		docker {
			image 'node:10'
		}
	}

    parameters {
        string(name: 'branchname', description: "Nom de la branche à publier (ex: develop).", defaultValue: 'develop')
        choice(name: 'version', description: 'Incrément de la version des packages', choices: 'patch\nminor\nmajor\nprerelease\npremajor\npreminor\nprepatch')
		string(name: 'releasename', description: "Nom de la branche release (ex: 1.1).", defaultValue: '')
		booleanParam(name: 'ffmaster', description: "ff-only merge de la release dans la branche master", defaultValue: true)
        booleanParam(name: 'synccdn', description: "Synchroniser website avec le CDN.", defaultValue: true)
    }

    environment {
        npm_config_cache = 'npm-cache'
        DOCKER_REPOSITORY = 'docker-local.maven.at.ulaval.ca/modul'
        DOCKER_REPOSITORY_URL = 'https://docker-local.maven.at.ulaval.ca'
        REPO_URL = 'github.com/ulaval/modul.git'
        GIT_CREDS = 'fee1a3fd-5a50-4b17-a26e-0ed54f22b011'
        BRANCHE_SOURCE = "${params.branchname}"
		BRANCHE_RELEASE = "release/${params.releasename}"
        JENKINS_USER = 'Jenkins'
        JENKINS_EMAIL = 'jenkins@dti.ulaval.com'
        NPM_CONFIG = 'modul-npmrc-config'
        POST_RECIPIENTS = 'charles.maheu@dti.ulaval.ca'
    }


    options {
        // Discarter après 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))

        // Ajouter les timestamps dans le log
        timestamps()
    }

    stages {
		stage('Checkout branch') {

		    steps {
				script {
					git branch: BRANCHE_SOURCE,
					credentialsId: GIT_CREDS,
					url: "https://${REPO_URL}"

					sh("git config user.name '${JENKINS_USER}'")
					sh("git config user.email '${JENKINS_EMAIL}'")
					sh("git config push.default simple")
				}
			}
		}

		stage('Verification si merge master ff-only possible') {
            when {
                expression { params.ffmaster == true }
            }

		    steps {
				script {
					int status = sh(script: "git merge-base --is-ancestor origin/master ${BRANCHE_SOURCE}", returnStatus: true)
					if (status != 0) {
						error("The branch [${BRANCHE_SOURCE}] is not a ancestor of origin/master. Please merge master into [${BRANCHE_SOURCE}] before continuing...");
					}
				}
			}
		}

		stage('Install & Build') {

			steps {
				withNPM(npmrcConfig: NPM_CONFIG) {
					echo "Install dependancies..."
					sh "yarn install --frozen-lockfile"
				}
			}
		}

		stage('Lint & test') {

			steps {
				withNPM(npmrcConfig: NPM_CONFIG) {
					echo "Lint"
					sh "yarn run lint:ci"

					echo "Test"
					sh "yarn run test"
				}
			}
		}

		stage('Check changed') {
			steps {
				withNPM(npmrcConfig: NPM_CONFIG) {
					echo "Check if packages changed since last publish"
					sh "yarn run lerna changed --conventional-commits --conventional-graduate"
				}
			}
		}

		stage('Création de la branche release') {
			steps {
				script {
					withCredentials([usernamePassword(credentialsId: GIT_CREDS, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
						sh "git checkout -b ${BRANCHE_RELEASE}"
						sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL} --all -u"
					}
				}
			}
		}


		stage('NPM publish') {
			steps {
				withCredentials([usernamePassword(credentialsId: GIT_CREDS, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
					withNPM(npmrcConfig: NPM_CONFIG) {
						echo "Publish version to npm"
						sh "yarn run lerna publish ${params.version} --conventional-commits --conventional-graduate --no-changelog --no-push --yes"
						sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL} --follow-tags"
					}
				}
			}
		}

		stage('Fast-forward master') {
		    when {
                expression { params.ffmaster == true }
            }

			steps {
				withCredentials([usernamePassword(credentialsId: GIT_CREDS, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
					sh "git checkout master"
					sh "git merge --ff-only ${BRANCHE_RELEASE}"
					sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}"
				}
			}
		}

		stage('Creation PR develop') {
			steps {
			    script {
					def reponame = REPO_URL.substring(REPO_URL.lastIndexOf('/') + 1, REPO_URL.lastIndexOf('.'))
					withCredentials([
									[$class: 'UsernamePasswordMultiBinding', credentialsId: GIT_CREDS, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']
								]) {
									sh "curl -u ${GIT_USERNAME}:${GIT_PASSWORD} -d '{\"title\": \"${BRANCHE_RELEASE}\",\"body\": \"Merge back branch `${BRANCHE_RELEASE}` into develop. MERGE COMMIT ONLY - *DO NOT SQUASH/REBASE MERGE*.\",\"head\": \"${BRANCHE_RELEASE}\",\"base\": \"develop\"}' -X POST https://api.github.com/repos/ulaval/modul/pulls"
								}
				}

			}
		}

        stage('Deployer website CDN') {
			when {
                expression { params.synccdn == true }
            }

            steps {
                script {
                    build(job: "MonPortail/Mpo-Contenu/sync-npm-ul",
                    parameters: [
                        [$class: 'StringParameterValue', name: 'scope', value: '@ulaval'],
						[$class: 'StringParameterValue', name: 'nom', value: 'modul-website'],
						[$class: 'StringParameterValue', name: 'version', value: 'latest'],
                        [$class: 'BooleanParameterValue', name: 'force_release', value: true],
                        [$class: 'BooleanParameterValue', name: 'dryrun', value: false]
                    ])
                }
            }
        }
	}

	post {
        always {
            cleanWs()
        }
    }
}
