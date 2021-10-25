pipeline {
    agent any

    options {
        // Discarter après 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))

        // Ajouter les timestamps dans le log
        timestamps()
    }

    parameters {
        string(defaultValue: 'feature/configuration_openshift', description: '', name: 'branch')
    }

    environment {
        JENKINS_USER = 'Jenkins'
        JENKINS_EMAIL = 'jenkins@dti.ulaval.com'
        REPO_URL = 'github.com/ulaval/modul.git'
        GIT_CREDS = 'github_modul'
        DOCKER_CREDS = 'docker_modul'
        DOCKER_URL = 'https://index.docker.io/v1/'
        DOCKER_REPOSITORY_NAME = 'chocmah/modul'
        NAME = branch.toLowerCase().replace('/', '-').replace('_', '-').take(127)

    }

    stages {
		stage('Checkout & build') {
            agent {
                docker {
                    image 'node:14'
                }
            }

		    steps {
				script {
					git branch: "${params.branch}",
					credentialsId: GIT_CREDS,
					url: "https://${REPO_URL}"

					sh("git config user.name '${JENKINS_USER}'")
					sh("git config user.email '${JENKINS_EMAIL}'")
					sh("git config push.default simple")
				}
                script {
                    echo "Install dependancies..."
                    sh "yarn install --frozen-lockfile"
                    sh "yarn run build"
                }

                stash name: 'sources', includes: '**', excludes: '**/.git/**,**/node_modules/**'
			}

            post {
                always {
                    cleanWs()
                }
            }
		}

        stage('Docker publish') {

                steps {
                    unstash 'sources'
                    script {
                        dockerImage = docker.build DOCKER_REPOSITORY_NAME + ":$NAME"
                        docker.withRegistry( '', DOCKER_CREDS ) {
                            dockerImage.push()
                        }
                        sh "docker rmi $DOCKER_REPOSITORY_NAME:$NAME"
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

