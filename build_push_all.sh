#!/bin/sh

docker build . -t wso2-dev-config
docker tag wso2-dev-config eristoddle/wso2-dev-config
docker push eristoddle/wso2-dev-config

docker-compose build -f docker-compose-build

docker push eristoddle/wso2is_final
# ESB is a custom manual build for HL7 due to dependency issues in the scripted process
# docker push eristoddle/wso2esb_final
docker push eristoddle/wso2am_final
docker push eristoddle/wso2as_final
docker push eristoddle/wso2brs_final
docker push eristoddle/wso2dss_final
docker push eristoddle/wso2greg_final
