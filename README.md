# Docker WSO2 Project

## Docker base images

I have a repo of the dockerfiles at https://github.com/eristoddle/dockerfiles.  That repo can be used to create generic docker images of wso2 applications using a Centos 7 base image. The base image Dockerfile is also included in that repo. The base image should only have to be updated to update Centos. The wso2 images should only have to be updated to install a new version of WSO2.

I used that repo to build the base image and wso2 images and push the images to my Docker Hub account: https://hub.docker.com/u/eristoddle/

## Getting Started

**For a local dev environment, all you have to worry about is the docker-compose section**

### Running with docker-compose

- Make sure you have docker installed.
- Run `docker-compose up`
- To manage the boxes through a UI on your dev machine, check out http://portainer.io/. Or just run this `docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer` and Portainer will be accessible at http://localhost:9000.
- This brings up 8 boxes running wso2 applications. For Docker on Mac, you will have to set the memory up a little from the default 2gb or one of the  boxes will crash because it ran out of memory. I set mine up to 6gb and it seems to run fine.
- The esb has the business rules server built in and the brs component is just another esb instance.
- The ports for each box can be found in the `docker-compose.yml` file.

### Local Urls with Docker Compose

Default user: admin
Default password: admin

- ESB: https://localhost:9443/carbon/admin/login.jsp
- BRS: https://localhost:9444/carbon/admin/login.jsp
- GREG: https://localhost:9445/carbon/admin/login.jsp
- DSS: https://localhost:9446/carbon/admin/login.jsp
- IS: https://localhost:9447/carbon/admin/login.jsp
- AM: https://localhost:9448/carbon/admin/login.jsp
- AS: https://localhost:9449/carbon/admin/login.jsp

## Running with Rancher

NOTE: Not necessary for local development, but for playing with a production level environment locally.

Rancher will currently only run on a Linux host. So installation on Linux is simple. For Mac (and possibly Windows), you will have to use a different process.

- You will still need Docker for Mac installed.
- You will also need Virtualbox.
- You will be using docker-machine commands instead of docker from your actual physical machine.
- You will be using docker commands inside the vm you built for Rancher.

### Creating a Rancher Instance

Most of the steps I learned from this post: https://www.webuildinternet.com/2016/09/06/how-to-install-rancheros-and-rancher/.

- Run `docker-machine create -d virtualbox --virtualbox-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso rancheros` to create the docker host for rancheros
- Log in to the machine with `docker-machine ssh rancheros`
- Then run `sudo docker run -d --restart=always -p 8080:8080 rancher/server` inside this new host to start rancher.

### Managing the Rancher Instance

- The first thing you need to do after following the steps in that post, is create a host after you browse to the Rancher web address.
- I used the 192.168.99.100 address that was already in first form for adding hosts.
- On the second form, I did nothing other than run the command listed at the bottom in the newly created vm. If you followed the instructions in the post above and you're Rancher vm is named `rancheros`, then you would run `docker-machine ssh rancheros` to get shell access to the box and then run the command from the Rancher UI there.
- Click the Close button at the bottom and your new host should show up in a few seconds.

### Other Rancher/Docker commands & quirks

Because stuff happens.

- To restart docker running in RancherOS: `sudo ros service restart`
- Stop all containers: `docker stop $(docker ps -a -q)`
- Remove all containers: `docker rm $(docker ps -a -q)`

If you make a mistake creating a stack and try again and get errors about a name not being unique the second time, try a new name for a stack.

### Configuring an insecure registry in Rancher

Normally you would edit the config file at `/etc/default/docker`. Not so in RancherOS. It has a configuration file at `/var/lib/rancher/conf/docker`. You will add this line to that file: `--insecure-registry 192.168.99.100:5000` and then restart docker with the command listed above.

Searching 'Registry' in Rancher's catalog will bring up a registry stack. Set the FDQN to the IP of Rancher, which in my case was `192.168.99.100`. Let it do it's thing after it launches. It takes quite a while, 5-10 minutes locally. I tried clicking things during the process because I thought I had to, but that broke the container.

You may have to stop the virtualbox image and up the memory if it crashes.

## Volumes in Environments other than Local

Locally we can sync the volumes to our development machine. On remote hosts, we have to wrap the configuration files into container that will sync the files to the host machine for the other containers to use. That is the reason for the Dockerfile in this project and the difference between the various docker-compose files. The standard docker-compose.yml file is for local development.

This means the image created from this docker file must be pushed to a private repo and tagged. Then referenced in the docker compose yaml file for that environment.

This is an old method for doing this and probably should be changed to use volume drivers like:
- Flocker
- Convoy
- NFS
After some research on the what would work best for us.

## AWS Elastic Beanstalk - WIP

Follow the instructions here: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker-eblocal.html


### More AWS/Docker Reading

- https://github.com/hopsoft/relay/wiki/How-to-Deploy-Docker-apps-to-Elastic-Beanstalk
- https://blog.mebooks.co.nz/automating-elastic-beanstalk/
- http://prakhar.me/docker-curriculum/
- https://blog.mikesir87.io/2016/04/pushing-to-ecr-using-jenkins-pipeline-plugin/

### Notes

- Currently there is a bug in the version of Docker that Elastic Beanstalk uses. Running `eb local run` will throw an error like this: `ERROR: ValueError :: Extra data:`. In this case, just use `docker pull` to pull all the images you need first and then the Beanstalk command will work. See: https://forums.docker.com/t/cant-use-docker-due-to-valueerror-extra-data-known-issue/19535/3.

### More Docker Reading

- https://github.com/veggiemonk/awesome-docker
- https://www.katacoda.com/

## WSO2 Development - WIP

Artifacts for Carbon Apps (C-App) get added directly to `< CARBON_HOME>/repository/deployment/server/carbonapps`.

See these links:
- https://docs.wso2.com/display/TS110/Creating+and+Deploying+C-App
- https://docs.wso2.com/display/DVS380/Packaging+Artifacts+Into+Deployable+Archives
- http://wso2.com/library/articles/2015/10/article-wso2-developer-studio-development-and-deployment-best-practices/
