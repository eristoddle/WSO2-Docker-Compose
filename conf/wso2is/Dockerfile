FROM eristoddle/wso2is_features:5.2.0

COPY /repository/conf/datasources/master-datasources.xml /mnt/wso2is/repository/conf/datasources/master-datasources.xml
COPY /repository/conf/carbon.xml /mnt/wso2is/repository/conf/carbon.xml
COPY /repository/conf/registry.xml /mnt/wso2is/repository/conf/registry.xml
COPY /repository/conf/user-mgt.xml /mnt/wso2is/repository/conf/user-mgt.xml
# TODO: This is supposed to set up service providers. Currently just breaks things
# COPY /repository/conf/identity/sso-idp-config.xml /mnt/wso2is/repository/conf/identity/sso-idp-config.xml
COPY /repository/conf/axis2/axis2.xml /mnt/wso2is/repository/conf/axis2/axis2.xml
