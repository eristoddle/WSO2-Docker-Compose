module.exports = {
    dockerLocal: {
        command: 'docker build -t wso2-config-local -f docker/Dockerfile.local .'
    },
    dockerDev: {
        command: 'docker build -t wso2-config-dev -f docker/Dockerfile.dev .'
    },
    dockerQa: {
        command: 'docker build -t wso2-config-qa -f docker/Dockerfile.qa .'
    },
    dockerStage: {
        command: 'docker build -t wso2-config-stage -f docker/Dockerfile.stage .'
    },
    dockerProd: {
        command: 'docker build -t wso2-config-prod -f docker/Dockerfile.prod .'
    }
}
