module.exports = {
    local: {
        files: [
            {
                expand: true,
                src: ['template/conf/**'],
                dest: 'build/local/'
            }
        ]
    },
    dev: {
        files: [
            {
                expand: true,
                src: ['template/conf/**'],
                dest: 'build/dev/'
            }
        ]
    },
    qa: {
        files: [
            {
                expand: true,
                src: ['template/conf/**'],
                dest: 'build/qa/'
            }
        ]
    },
    stage: {
        files: [
            {
                expand: true,
                src: ['template/conf/**'],
                dest: 'build/stage/'
            }
        ]
    },
    prod: {
        files: [
            {
                expand: true,
                src: ['template/conf/**'],
                dest: 'build/prod/'
            }
        ]
    },
    brs: {
        files: [
            {
                expand: true,
                cwd: 'template/conf/wso2esb/',
                src: ['**'],
                dest: 'build/<%= env %>/conf/wso2brs/'
            }
        ]
    },
    esb: {
        files: [
            {
                expand: true,
                cwd: 'template/conf/wso2esb/',
                src: ['**'],
                dest: 'build/<%= env %>/conf/wso2esb/'
            }
        ]
    },
    am: {
        files: [
            {
                expand: true,
                cwd: 'template/conf/wso2am/',
                src: ['**'],
                dest: 'build/<%= env %>/conf/wso2am/'
            }
        ]
    },
    dss: {
        files: [
            {
                expand: true,
                cwd: 'template/conf/wso2dss/',
                src: ['**'],
                dest: 'build/<%= env %>/conf/wso2dss/'
            }
        ]
    },
    greg: {
        files: [
            {
                expand: true,
                cwd: 'template/conf/wso2greg/',
                src: ['**'],
                dest: 'build/<%= env %>/conf/wso2greg/'
            }
        ]
    },
    is: {
        files: [
            {
                expand: true,
                cwd: 'template/conf/wso2is/',
                src: ['**'],
                dest: 'build/<%= env %>/conf/wso2is/'
            }
        ]
    },
    ssoIdpConfig: {
        files: [
            {
                cwd: '',
                src: 'template/customXml/sso-idp-config.xml',
                dest: 'build/<%= env %>/conf/wso2is/repository/conf/identity/sso-idp-config.xml'
            }
        ]
    }
};
