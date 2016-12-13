# Docker WSO2 Project

## Docker base images

I have a repo of the dockerfiles at https://github.com/eristoddle/dockerfiles. I used that repo to build the base boxes and push the images to my Docker Hub account: https://hub.docker.com/u/eristoddle/

## Getting Started

- Make sure you have docker installed.
- You will have to run `up.sh` to set some environment variables and bring the network up instead of the running `docker-compose up`. I do plan on changing this.
- To manage the boxes through a UI on your dev machine, check out http://portainer.io/
- This brings up 8 boxes running wso2 applications. For Docker on Mac, you will have to set the memory up a little from the default 2gb or one of the  boxes will crash because it ran out of memory. I set mine up to 6gb and it seems to run fine.
- The esb has the business rules server built in and the brs component is just another esb instance.
- The ports for each box can be found in the `env.bash` script. Applications run by the application server can found at http://localhost:9769/docs etc.
- Rancher for Mac installation procedures ( I followed #4 after trying the other 3 and not quite getting it, but I think by that point I had finally figured out I had to use docker-machine to build a vm for Rancher and then run all the docker commands, etc inside that vm. #4 explains this better than the first 3)
    - https://github.com/rancher/10acre-ranch
    - https://media-glass.es/launching-a-local-rancher-cluster-1422b89b0477#.2wmywby6g
    - https://gist.github.com/eristoddle/0e72b777f2c0d9fb99fe01c185f6720e
    - https://www.webuildinternet.com/2016/09/06/how-to-install-rancheros-and-rancher/
