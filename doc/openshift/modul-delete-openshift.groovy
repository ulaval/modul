pipeline {
    agent {
        docker {
            image "docker-local.maven.ulaval.ca/ena2/ena2-openshift-client:18.09.19-2"
            registryUrl 'https://docker-local.maven.ulaval.ca/v2'
            registryCredentialsId 'artifactory-docker-registry-credentials'
        }
    }

    options {
        // Discarter après 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))

        // Ajouter les timestamps dans le log
        timestamps()
    }


    parameters {
        string(defaultValue: '', description: 'nom de la branche', name: 'branch')
    }


    environment {
        NAME = branch.toLowerCase().replace('/', '-').replace('_', '-').take(57)
        DOCKER_REPOSITORY_NAME = 'ulaval/modul'
    }

    stages {
        stage('Delete App') {
            steps {
                echo("Deleting branch ${NAME}")

                withCredentials([string(credentialsId: 'openshift-ul-modul-dv01', variable: 'TOKEN')]) {
                    sh("oc delete all --server=https://console-pca.svc.ulaval.ca -n=ul-modul-dv01 -l app=${NAME} --token=${TOKEN} --certificate-authority='/ca-comodo.crt'")
                }
            }
        }

        stage('Delete imagestream') {
            steps {
                echo("Deleting branch ${NAME}")

                withCredentials([string(credentialsId: 'openshift-ul-modul-dv01', variable: 'TOKEN')]) {
                    sh("oc tag -d --server=https://console-pca.svc.ulaval.ca -n=ul-modul-dv01 modul:${NAME} --token=${TOKEN} --certificate-authority='/ca-comodo.crt'")
                }
            }
        }
    }

    post {
        success  {

            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n Openshift application successfully deleted branch name = ${NAME}",
                recipientProviders: [[$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Job ${env.JOB_NAME} : Openshift application successfully deleted"

        }
    }
}
