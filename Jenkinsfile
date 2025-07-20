pipeline {
    agent any

    tools {
        nodejs 'node 22'  // Use the name you gave in Jenkins
    }

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
}