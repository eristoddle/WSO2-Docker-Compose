# Docker WSO2 Project

## Docker base images

For now, since the bases are pretty generic, I have a repo of the dockerfiles at https://github.com/eristoddle/dockerfiles. I used that repo to build the base boxes and push the images to my Docker Hub account, again public since they are generic: https://hub.docker.com/u/eristoddle/

## Getting Started

- Make sure you have docker installed.
- Since the developer I "borrowed" some of the scripts from uses env variables in the docker-compose file, you will have to run `up.sh` to set these variables and bring the network up instead of the running `docker-compose up`. I do plan on changing this.
- To manage the boxes through a UI on your dev machine, check out http://portainer.io/
- This brings up 8 boxes running wso2 applications. For Docker on Mac, you will have to set the memory up a little from the default 2gb or one of the  boxes will crash because it ran out of memory. I set mine up to 6gb and it seems to run fine. 
- The esb has the business rules server built in and the brs component is just another esb instance.
- The ports for each box can be found in the `env.bash` script. Applications run by the application server can found at http://localhost:9769/docs etc.
