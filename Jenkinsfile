#!/usr/bin/env groovy

pipeline {
    agent any

    options {
        // Discarter après 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))

        // Ajouter les timestamps dans le log
        timestamps()
    }

    environment {
        // Pour éviter une erreur: EACCES: permission denied, mkdir '/.npm'
        npm_config_cache = 'npm-cache'
        DOCKER_REPOSITORY = 'docker-local.maven.at.ulaval.ca/modul'
        DOCKER_REPOSITORY_URL = 'https://docker-local.maven.at.ulaval.ca'
    }

    stages {
        stage('Build & test') {
            when {
                expression {
                    env.BRANCH_NAME=='master' || env.BRANCH_NAME=='develop'
                }
            }

            agent {
                docker {
                    image 'node:10.15'
                }
            }

            steps {
                sh 'yarn install'
                sh 'yarn lint:ci'
                sh 'yarn test:ci'
            }
        }
    }

    post {
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

