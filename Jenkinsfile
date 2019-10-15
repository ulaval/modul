#!/usr/bin/env groovy

pipeline {
	// agent {
	// 	docker {
	// 		image 'node:10'
	// 	}
	// }

    environment {
        DOCKER_REPOSITORY = 'docker-local.maven.at.ulaval.ca/modul'
        DOCKER_REPOSITORY_URL = 'https://docker-local.maven.at.ulaval.ca'
    }

    options {
        // Discarter après 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))

        // Ajouter les timestamps dans le log
        timestamps()
    }


    stages {
        // stage('echo branch name') {
        //     steps {
        //     	echo "branch name ${env.BRANCH_NAME} pull-request ${env.GITHUB_PR_NUMBER}"
        //     }
        // }

        // stage('install, build, lint & test') {

        //     when {
        //         expression {
        //             env.BRANCH_NAME=='master' || env.BRANCH_NAME=='develop'
        //         }
        //     }

        //     steps {
        //         sh 'yarn install --frozen-lockfile'
        //         sh 'yarn build'
        //         sh 'yarn lint:ci'
        //         sh 'yarn test:ci'
        //     }
        // }

        stage('Build docker for openshift') {
            when {
                expression {
                    env.BRANCH_NAME=='master' || env.BRANCH_NAME=='develop' || env.BRANCH_NAME=='feature/configuration_openshift'
                }
            }

            steps {
                script {
                    build(job: "modul-openshift/modul-build-docker",
                    parameters: [
                        [$class: 'StringParameterValue', name: 'branch', value: env.BRANCH_NAME]
                    ])
                }
            }
        }
    }

    post {

        always {
            cleanWs()
        }

        changed {
            echo 'Build status changed'
            step([$class: 'Mailer', recipients: ['charles.maheu@dti.ulaval.ca', emailextrecipients([[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']])].join(' ')])
        }
        failure {
            echo 'Build failure'
            step([$class: 'Mailer', recipients: ['charles.maheu@dti.ulaval.ca', emailextrecipients([[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']])].join(' ')])
        }
        unstable {
            echo 'Build unstable'
            step([$class: 'Mailer', recipients: ['charles.maheu@dti.ulaval.ca', emailextrecipients([[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']])].join(' ')])
        }
    }
}

