#!/usr/bin/env groovy

pipeline {
    agent any

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


        stage('install, build, lint & test') {
            agent {
                docker {
                    image 'node:10'
                }
            }
            when {
                expression {
                    env.BRANCH_NAME=='master' || env.BRANCH_NAME=='develop'
                }
            }

            steps {
                sh 'yarn install --frozen-lockfile'
                sh 'yarn build'
                sh 'yarn lint:ci'
                sh 'yarn test:ci'
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

