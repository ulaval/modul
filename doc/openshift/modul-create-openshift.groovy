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
        stage('Create imagestream') {
            steps {
                echo("Create imagestream for tag ${NAME}")

                withCredentials([string(credentialsId: 'openshift-ul-modul-dv01', variable: 'TOKEN')]) {
                    sh("oc tag --source=docker ${DOCKER_REPOSITORY_NAME}:${NAME}  modul:${NAME} --scheduled=true --server=https://console-pca.svc.ulaval.ca -n=ul-modul-dv01 --token=${TOKEN} --certificate-authority='/ca-comodo.crt'")
                }

                sleep(time:10,unit:"SECONDS")
            }
        }

        stage('Create app') {
            steps {
                echo("Create app with name ${NAME}")

                withCredentials([string(credentialsId: 'openshift-ul-modul-dv01', variable: 'TOKEN')]) {
                    sh("oc new-app --image-stream=modul:${NAME} --name ${NAME} --server=https://console-pca.svc.ulaval.ca -n=ul-modul-dv01 --token=${TOKEN} --certificate-authority='/ca-comodo.crt'")
                }

                sleep(time:10,unit:"SECONDS")
            }
        }

        stage('Expose route') {
            steps {
                echo("Expose route for app with name ${NAME}")

                withCredentials([string(credentialsId: 'openshift-ul-modul-dv01', variable: 'TOKEN')]) {
                    sh("oc expose svc ${NAME} --port=5003 --server=https://console-pca.svc.ulaval.ca -n=ul-modul-dv01 --token=${TOKEN} --certificate-authority='/ca-comodo.crt'")
                }
            }
        }
    }

    post {
        success  {

            emailext body: "<p>Openshift application successfully created application at <a href=http://${NAME}-ul-modul-dv01.pca.svc.ulaval.ca>http://${NAME}-ul-modul-dv01.pca.svc.ulaval.ca</a> </p>",
                mimeType: 'text/html',
                recipientProviders: [[$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Job ${env.JOB_NAME} - build ${env.BUILD_NUMBER} : ${currentBuild.currentResult}"

        }
    }
}
