# Docker WSO2 Project

## Docker base images

For now, since the bases are pretty generic, I have a repo of the dockerfiles at https://github.com/eristoddle/dockerfiles. I used that repo to build the base boxes and push the images to my Docker Hub account, again public since they are generic: https://hub.docker.com/u/eristoddle/

## Getting Started

- Make sure you have docker installed.
- Since the developer I "borrowed" some of the scripts from uses env variables in the docker-compose file, you will have to run `up.sh` to set these variables and bring the network up instead of the running `docker-compose up`. I do plan on changing this.
- To manage the boxes through a UI on your dev machine, check out http://portainer.io/
- This brings up 8 boxes running wso2 applications. So when running all of them locally with 16gb of memory, I have had a random one of them crash because there was not enough memory. I have solved this problem temporarily by commenting out the business rules server section of the docker-compose.yml file. The esb has the business rules server built in and it is just another esb instance.
