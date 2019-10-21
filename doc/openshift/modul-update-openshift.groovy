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
        NAME = branch.toLowerCase().replace('/', '-').replace('_', '-').take(127)
        DOCKER_REPOSITORY_NAME = 'ulaval/modul'
    }

    stages {
        stage('Update imagestream') {
            steps {
                echo("Create imagestream for tag ${NAME}")

                withCredentials([string(credentialsId: 'openshift-ul-modul-dv01', variable: 'TOKEN')]) {
                    sh("oc tag --source=docker ${DOCKER_REPOSITORY_NAME}:${NAME}  modul:${NAME} --scheduled=true --server=https://console-pca.svc.ulaval.ca -n=ul-modul-dv01 --token=${TOKEN} --certificate-authority='/ca-comodo.crt'")
                }

            }
        }
    }
}
