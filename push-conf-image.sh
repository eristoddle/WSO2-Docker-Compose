#!/bin/sh

docker build . -t wso2-dev-config
docker tag wso2-dev-config eristoddle/wso2-dev-config
docker push eristoddle/wso2-dev-config
