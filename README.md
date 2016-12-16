# Docker WSO2 Project

## Docker base images

I have a repo of the dockerfiles at https://github.com/eristoddle/dockerfiles. I used that repo to build the base boxes and push the images to my Docker Hub account: https://hub.docker.com/u/eristoddle/

## Getting Started

### Running with docker-compose

- Make sure you have docker installed.
- You will have to run `prep-conf.sh` to set some environment variables and create the final configuration files for the WSO2 apps. Then run `docker-compose up`
- To manage the boxes through a UI on your dev machine, check out http://portainer.io/. Or just run this `docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer` and Portainer will be accessible at http://localhost:9000.
- This brings up 8 boxes running wso2 applications. For Docker on Mac, you will have to set the memory up a little from the default 2gb or one of the  boxes will crash because it ran out of memory. I set mine up to 6gb and it seems to run fine.
- The esb has the business rules server built in and the brs component is just another esb instance.
- The ports for each box can be found in the `docker-compose.yml` file. The https port Applications run by the application server can found at http://localhost:9769/docs etc.

### Running with Rancher

Rancher will currently only run on a Linux host. So installation on Linux is simple. For Mac (and possibly Windows), you will have to use a different process.

- You will still need Docker for Mac installed.
- You will also need Virtualbox.
- You will be using docker-machine commands instead of docker from your actual physical machine.
- You will be using docker commands inside the vm you built for Rancher.

#### Creating a Rancher Instance
Most of the steps I learned from this post: https://www.webuildinternet.com/2016/09/06/how-to-install-rancheros-and-rancher/. But it didn't really cover adding hosts.

- Run `docker-machine create -d virtualbox --virtualbox-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso rancheros` to create the docker host for rancheros
- Log in to the machine with `docker-machine ssh rancheros`.
- Then run `sudo docker run -d --restart=always -p 8080:8080 rancher/server` inside this new host to start rancher.

#### Managing the Rancher Instance

- The first thing you need to do after following the steps in that post, is create a host after you browse to the Rancher web address.
- I used the 192.168.99.100 address that was already in first form for adding hosts.
- On the second form, I did nothing other than run the command listed at the bottom in the newly created vm. If you followed the instructions in the post above and you're Rancher vm is named `rancheros`, then you would run `docker-machine ssh rancheros` to get shell access to the box and then run the command from the Rancher UI there.
- Click the Close button at the bottom and your new host should show up in a few seconds.

#### Volumes in Environments other than Local

Locally we can sync the volumes to our development machine. On remote hosts, we have to wrap the configuration files into container we will use as a volume. That is the reason for the Dockerfile in this project and the difference between the various docker-compose files. The standard docker-compose.yml file is for local development.

This means the image created from this docker file must be pushed to a private repo and tagged. Then referenced in the docker compose yaml file for that environment.

### Additional Using Rancher on Mac instructions

- https://github.com/rancher/10acre-ranch
- https://media-glass.es/launching-a-local-rancher-cluster-1422b89b0477#.2wmywby6g
- https://gist.github.com/eristoddle/0e72b777f2c0d9fb99fe01c185f6720e
