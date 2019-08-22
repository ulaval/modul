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
        choice(name: 'version', description: 'Incrément de la version.', choices: 'prerelease\npremajor\npreminor\nprepatch')
        string(name: 'prereleaseid', description: 'Indenficatieur de prerelease (eg. 1.0.1-beta.0)', defaultValue: 'beta')
        string(name: 'disttag', description: "Tag spécifique à associer au package sur npm", defaultValue: 'next')
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
					git (branch: BRANCHE_RELEASE,
					credentialsId: GIT_CREDS,
					url: "https://${REPO_URL}")

					sh("git config user.name '${JENKINS_USER}'")
					sh("git config user.email '${JENKINS_EMAIL}'")
					sh("git config push.default simple")
				}
			}
		}

		stage('Install & Build') {

			steps {
				withNPM(npmrcConfig: NPM_CONFIG) {
					echo "Install dependancies..."
					sh "yarn install"

					echo "Bootstrap lerna workspace..."
					sh "yarn run bootstrap"
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
					sh "yarn run lerna changed"
				}
			}
		}

		stage('NPM publish') {
			steps {
				withCredentials([usernamePassword(credentialsId: GIT_CREDS, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
					withNPM(npmrcConfig: NPM_CONFIG) {
						echo "Publish version to npm"
						sh "yarn run lerna publish ${params.version} --conventional-commits --conventional-prerelease --no-changelog --no-push --preid ${params.prereleaseid}  --dist-tag ${params.disttag} --yes"
						sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL} --follow-tags"
					}
				}
			}
		}

	}

	post {
        always {
			echo "Cleaning workspace"
			   cleanWs()
        }
    }
}
