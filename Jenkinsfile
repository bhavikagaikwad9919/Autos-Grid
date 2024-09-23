pipeline {
    agent any

    stages {
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('autosgrid-staging-reactjs:latest')
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'Autosgrid-ECR', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) 
                    {
                        sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 262930945458.dkr.ecr.ap-south-1.amazonaws.com'
                    }

                    sh 'docker tag autosgrid-staging-reactjs:latest 262930945458.dkr.ecr.ap-south-1.amazonaws.com/autosgrid-staging-reactjs:latest'
                    sh 'docker push 262930945458.dkr.ecr.ap-south-1.amazonaws.com/autosgrid-staging-reactjs:latest'
					withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'Autosgrid-ECR', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) 
                    {
                        sh 'aws ecs  update-service  --cluster autosgrid-staging --service autosgrid-staging --task-definition autosgrid-frontend-staging:3 --force-new-deployment'
                    }
                    
                }
                
            }

            post 
			{
				success 
				{
					slackSend channel: 'autosgrid', color: '#00FF00',
					message: "SUCCESSFUL: Job '${env.JOB_NAME} (${env.BUILD_NUMBER}) [${currentBuild.durationString}]' ",
					teamDomain: 'barquecon', tokenCredentialId: '81037d7a-b6a8-4ae7-b0ff-80517d39cd1e'	
				}
				failure 
				{
					slackSend failOnError: true, channel: 'autosgrid', color: '#FF0000',
					message: "FAILED: Job '${env.JOB_NAME} (${env.BUILD_NUMBER})' ",
					teamDomain: 'barquecon', tokenCredentialId: '81037d7a-b6a8-4ae7-b0ff-80517d39cd1e'	
				}
			}
            
        }
    }
}