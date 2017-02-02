module.exports = {
    authenticators: {
        options: {
            actions: [
                {
                    xpath: '/Authenticators/Authenticator[2]/Config//Parameter[5]',
                    value: 'https://<%= wso2Gateway %>:<%= parseInt(9443) + parseInt(portOffset) %>/acs'
                }, {
                    xpath: '/Authenticators/Authenticator[2]/Config//Parameter[3]',
                    value: 'https://<%= wso2Gateway %>:<%= parseInt(9443) + parseInt(isPortOffset) %>/samlsso'
                }, {
                    xpath: '/Authenticators/Authenticator[2]/Config//Parameter[2]',
                    value: '<%= serviceProviderId %>'
                }, {
                    xpath: '/Authenticators/Authenticator[2]/@disabled',
                    value: 'false'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/security/authenticators.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/security/authenticators.xml'
        }
    },
    masterDatasources: {
        options: {
            actions: [
                {
                    xpath: '/datasources-configuration/datasources/datasource[1]/definition/configuration/url',
                    value: '<%= carbonConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[1]/definition/configuration/username',
                    value: '<%= carbonUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[1]/definition/configuration/password',
                    value: '<%= carbonPassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[1]/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[2]/definition/configuration/url',
                    value: '<%= gregCarbonConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[2]/definition/configuration/username',
                    value: '<%= gregCarbonUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[2]/definition/configuration/password',
                    value: '<%= gregCarbonPassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[2]/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[3]/definition/configuration/url',
                    value: '<%= amApiManagementConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[3]/definition/configuration/username',
                    value: '<%= amApiManagementUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[3]/definition/configuration/password',
                    value: '<%= amApiManagementPassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[3]/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[4]/definition/configuration/url',
                    value: '<%= amMbStoreConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[4]/definition/configuration/username',
                    value: '<%= amMbStoreUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[4]/definition/configuration/password',
                    value: '<%= amMbStorePassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[4]/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/datasources/master-datasources.xml': 'template/customXml/master-datasources.xml'
        }
    },
    removeUnnecessaryConnections: {
        options: {
            actions: [
                {
                    xpath: '/datasources-configuration/datasources/datasource[3]',
                    type: 'D'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource[4]',
                    type: 'D'
                }
            ],
            files: {
                '<%= destPath %>/wso2<%= wso2app %>/repository/conf/datasources/master-datasources.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/datasources/master-datasources.xml'
            }
        }
    },
    registry: {
        options: {
            actions: [
                {
                    type: 'I',
                    xpath: '/wso2registry',
                    node: 'dbConfig[2]'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/dbConfig[2]',
                    node: '@name',
                    value: 'remote_registry'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/dbConfig[2]',
                    node: 'dataSource',
                    value: 'jdbc/WSO2CarbonDB_GREG'
                }, {
                    type: 'I',
                    xpath: '/wso2registry',
                    node: 'remoteInstance'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: 'id',
                    value: 'instanceid'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: 'dbConfig',
                    value: 'remote_registry'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: 'cacheId',
                    value: '<%= gregCarbonConnectionString %>'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: 'readOnly',
                    value: 'false'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: 'enableCache',
                    value: 'false'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: 'registryRoot',
                    value: '/'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/remoteInstance',
                    node: '@url',
                    value: '<%= gregUrl %>'
                }, {
                    type: 'I',
                    xpath: '/wso2registry',
                    node: 'mount'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount',
                    node: '@path',
                    value: '/_system/config'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount',
                    node: '@overwrite',
                    value: 'true'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount',
                    node: 'instanceId',
                    value: 'configMount'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount',
                    node: 'targetPath',
                    value: '/_system/config'
                }, {
                    type: 'I',
                    xpath: '/wso2registry',
                    node: 'mount[2]'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount[2]',
                    node: '@path',
                    value: '/_system/governance'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount[2]',
                    node: '@overwrite',
                    value: 'true'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount[2]',
                    node: 'instanceId',
                    value: 'governanceMount'
                }, {
                    type: 'I',
                    xpath: '/wso2registry/mount[2]',
                    node: 'targetPath',
                    value: '/_system/governance'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/registry.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/registry.xml'
        }
    },
    carbon: {
        options: {
            actions: [
                {
                    xpath: '/Server/Ports/Offset',
                    value: '<%= portOffset %>'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/carbon.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/carbon.xml'
        }
    },
    axis2hl7: {
        options: {
            actions: []
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/axis2/axis2.xml': 'template/customXml/hl7-axis2.xml'
        }
    },
    metricsDataSources: {
        options: {
            actions: [
                {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/url',
                    value: '<%= metricsConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/username',
                    value: '<%= metricsUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/password',
                    value: '<%= metricsPassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/datasources/metrics-datasources.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/datasources/metrics-datasources.xml'
        }
    },
    bpsDataSources: {
        options: {
            actions: [
                {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/url',
                    value: '<%= bpsConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/username',
                    value: '<%= bpsUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/password',
                    value: '<%= bpsPassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/datasources/bps-datasources.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/datasources/bps-datasources.xml'
        }
    },
    socialDataSources: {
        options: {
            actions: [
                {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/url',
                    value: '<%= gregSocialConnectionString %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/username',
                    value: '<%= gregSocialUsername %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/password',
                    value: '<%= gregSocialPassword %>'
                }, {
                    xpath: '/datasources-configuration/datasources/datasource/definition/configuration/driverClassName',
                    value: '<%= databaseDriver %>'
                }
            ]
        },
        files: {
            '<%= destPath %>/wso2<%= wso2app %>/repository/conf/datasources/social-datasources.xml': '<%= srcPath %>/wso2<%= wso2app %>/repository/conf/datasources/social-datasources.xml'
        }
    },
    //TODO: Finish this
    ssoIdpConfig: {
        options: {
            actions: [
                {
                    xpath: '/SSOIdentityProviderConfig/ServiceProviders[1]/ServiceProvider[<%= parseInt(ssoSlot) %>]/Issuer[1]',
                    value: '<%= serviceProviderId %>'
                    // value: 'test'
                }, {
                    xpath: '/SSOIdentityProviderConfig/ServiceProviders[1]/ServiceProvider[<%= ssoSlot %>]/AssertionConsumerServiceURLs[1]/AssertionConsumerServiceURL[1]',
                    value: 'https://<%= wso2Gateway %>:<%= parseInt(9443) + parseInt(portOffset) %>/acs'
                }, {
                    xpath: '/SSOIdentityProviderConfig/ServiceProviders[1]/ServiceProvider[<%= ssoSlot %>]/DefaultAssertionConsumerServiceURL[1]',
                    value: 'https://<%= wso2Gateway %>:<%= parseInt(9443) + parseInt(portOffset) %>/acs'
                }, {
                    xpath: '/SSOIdentityProviderConfig/ServiceProviders[1]/ServiceProvider[<%= ssoSlot %>]/SignResponse[1]',
                    value: 'true'
                }, {
                    xpath: '/SSOIdentityProviderConfig/ServiceProviders[1]/ServiceProvider[<%= ssoSlot %>]/EnableAudienceRestriction[1]',
                    value: 'true'
                }, {
                    xpath: '/SSOIdentityProviderConfig/ServiceProviders[1]/ServiceProvider[<%= ssoSlot %>]/AudiencesList[1]/Audience[1]',
                    value: 'carbonServer'
                }
            ],
            files: {
                "template/customXml/sso-idp-config.xml": "template/customXml/sso-idp-config.xml"
            }
            // files: {
            //     'build/local/conf/wso2is/repository/conf/identity/sso-idp-config.xml': '<%= srcPath %>/wso2is/repository/conf/identity/sso-idp-config.xml'
            // }
        }
    }
};
