module.exports = {
    dockerLocal: {
        command: [
            'docker build -t wso2-config-local -f docker/Dockerfile .',
            'docker tag wso2-config-local eristoddle/wso2-config-local',
            'docker push eristoddle/wso2-config-local'
        ].join('&&')
    },
    dockerDev: {
        command: [
            'docker build -t wso2-config-dev -f docker/Dockerfile .',
            'docker tag wso2-config-dev eristoddle/wso2-config-dev',
            'docker push eristoddle/wso2-config-dev'
        ].join('&&')
    },
    dockerQa: {
        command: [
            'docker build -t wso2-config-qa -f docker/Dockerfile .',
            'docker tag wso2-config-qa eristoddle/wso2-config-qa',
            'docker push eristoddle/wso2-config-qa'
        ].join('&&')
    },
    dockerStage: {
        command: [
            'docker build -t wso2-config-stage -f docker/Dockerfile .',
            'docker tag wso2-config-stage eristoddle/wso2-config-stage',
            'docker push eristoddle/wso2-config-stage'
        ].join('&&')
    },
    dockerProd: {
        command: [
            'docker build -t wso2-config-prod -f docker/Dockerfile .',
            'docker tag wso2-config-prod eristoddle/wso2-config-prod',
            'docker push eristoddle/wso2-config-prod'
        ].join('&&')
    }
}
