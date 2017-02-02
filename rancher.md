# Running with Rancher

NOTE: Not necessary for local development, but for playing with a production level environment locally.

Rancher will currently only run on a Linux host. So installation on Linux is simple. For Mac (and possibly Windows), you will have to use a different process.

- You will still need Docker for Mac installed.
- You will also need Virtualbox.
- You will be using docker-machine commands instead of docker from your actual physical machine.
- You will be using docker commands inside the vm you built for Rancher.

## Creating a Rancher Instance

Most of the steps I learned from this post: https://www.webuildinternet.com/2016/09/06/how-to-install-rancheros-and-rancher/.

- Run `docker-machine create -d virtualbox --virtualbox-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso rancheros` to create the docker host for rancheros
- Log in to the machine with `docker-machine ssh rancheros`
- Then run `sudo docker run -d --restart=always -p 8080:8080 rancher/server` inside this new host to start rancher.

## Managing the Rancher Instance

- The first thing you need to do after following the steps in that post, is create a host after you browse to the Rancher web address.
- I used the 192.168.99.100 address that was already in first form for adding hosts.
- On the second form, I did nothing other than run the command listed at the bottom in the newly created vm. If you followed the instructions in the post above and you're Rancher vm is named `rancheros`, then you would run `docker-machine ssh rancheros` to get shell access to the box and then run the command from the Rancher UI there.
- Click the Close button at the bottom and your new host should show up in a few seconds.
- I found that starting the vm with 6gb of ram instead of the default 1gb makes things come up quickly. I tried 4gb and it came up but you had to wait longer. To change the vm's settings, first run `docker-machine stop rancheros`. Then run Virtualbox and find the vm and change it's setting to have more memory. I also added 2 cores from the processor instead of 1. Then you can restart Rancher again with `docker-machine start rancheros`.

## Other Rancher/Docker commands & quirks

Because stuff happens.

- To restart docker running in RancherOS: `sudo ros service restart`
- Stop all containers: `docker stop $(docker ps -a -q)`
- Remove all containers: `docker rm $(docker ps -a -q)`
