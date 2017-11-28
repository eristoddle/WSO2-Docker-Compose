# Docker WSO2 Project

## Docker base images

I have a repo of the dockerfiles at https://github.com/eristoddle/dockerfiles.  That repo can be used to create generic docker images of wso2 applications using a Centos 7 base image. The base image Dockerfile is also included in that repo. The base image should only have to be updated to update Centos. The wso2 images should only have to be updated to install a new version of WSO2.

I used that repo to build the base image and wso2 images and push the images to my Docker Hub account: https://hub.docker.com/u/eristoddle/

## Custom Images

- The ESB image with the features postfix had the HL7 feature built in and the axis2.xml file in this project is configured for that image to activate HL7 functionality. This currently has to be done manually. It is possible to do this with maven but the most current HL7 feature in not yet in the wso2 feature repo.

## Getting Started with Docker-compose

Run this command in the main directory of the project

```sh
docker-compose up
```

**NOTE: On a local environment, the postgres container must build the databases for wso2. This will take about a minute or less. While this is happening, the wso2 apps will crash if they can't connect. So run the command once and then kill the process with ctrl-c (not `docker-compose down`) after the postgres image says it has restarted and is ready for connections and the run the up command again. You will have to do this also after running `docker-compose down`**

### Running with docker-compose

- Make sure you have docker installed.
- Run `docker-compose up` in main directory
- To manage the boxes through a UI on your dev machine, I added a Portainer image that will be accessible at http://localhost:9000. It will ask you to set a password and then login to the dashboard.
- This brings up 6 containers running wso2 applications. For Docker on Mac, you will have to set the memory up a little from the default 2gb or one of the containers will crash because it ran out of memory. I set mine up to 4gb and it seems to run fine.
- The ports for each box can be found in the `docker-compose.yml` file.
- For SSO, you will have to edit the /etc/hosts file on your laptop and add the host `wso2identity` to `127.0.0.1`.

### Local Urls with Docker Compose

Default user: admin
Default password: admin

- ESB: https://localhost:9447/carbon/admin/login.jsp
- BRS: https://localhost:9444/carbon/admin/login.jsp
- GREG: https://localhost:9445/carbon/admin/login.jsp
- DSS: https://localhost:9446/carbon/admin/login.jsp
- IS: https://localhost:9443/carbon/admin/login.jsp
- AM: https://localhost:9448/carbon/admin/login.jsp

### When You Don't Need to Run the Whole Stack

Just comment out the images you don't want to run in the docker-compose.yml file. The following you will need to have running due to configuration files looking for them:

- wso2postgres
- is
- greg

## Building the Configuration Data Volumes

In the template folder, I have all the files to build the the docker images that will act as volumes holding the configuration files in the `repository\conf` folder of each wso2 application. This process uses grunt with the following grunt plugins:

- copy
- clean
- shell to run docker commands
- https://www.npmjs.com/package/load-grunt-tasks to break up configuration files
- https://www.npmjs.com/package/grunt-xmlstoke to parse and modify xml files

### Setting Up

 So to get started, have node and npm installed. Then install grunt with following command:

```shell
npm install -g grunt-cli
```

Then run this to install all the npm modules you need:

```
npm install
```

### Commands

To create the files for the data volume (currently local, dev, qa, stage, prod):

```shell
grunt buildAll:local
```

To wrap up the files in a docker image and push it (dockerLocal, dockerDev, dockerQa, dockerStage, dockerProd):

```
grunt shell:dockerLocal
```

### The Grunt Process

The template/conf folder I created manually by copy the conf folder of each application we are using there. These should only have to change when we upgrade a WSO2 application version. To start building final files, I grunt creates an environment folder (local, dev, etc.) in the build folder and copy files there.

I am using json files in the /template/replacements folder to hold the variables that will be replaced in the xml files.

Grunt load the correct json file to populate variables and then uses xmlstoke and xpath to replace the variables in the xml files.

There are a few files in template/customXml that I inject into the process because they were more complex in xpath:

- hl7-axis2.xml - This is the axis2 file for the esb that activates it's connector. This can eventually be scripted.
- master-datasources.xml - This contains the database connection details for the application. The carbon connection details get modified for each application, but the governance registry connection is in each one. This can eventually be scripted.
- sso-idp-config.xml - This contains the service provider details of all the other WSO2 applications to the Identity Server. This was the most complicated. It currently holds the local environment variables and does not get modified in the process. I hope to get this scripted eventually. See next section.

### TO DO i.e. still manual steps

I have seperated the configuration file creation from the docker image creation in grunt because of this. So that you can create the configuration files, then modify build/{env}/wso2is/repository/conf/identity/sso-idp-config.xml file to your needs and then run the command to create the docker image.

**You will have to modify the Issuer, AssertionConsumerServiceURL and DefaultAssertionConsumerServiceURL to the same values in the generated build/{env}/{app}/repository/conf/security/authenticators.xml of each application. If you didn't change any port offsets, this should only involve changing the host name in each url since I programmatically create the service provider names (Issuer).**

It may be good for now just to create one of these files for each environment instance once we get that locked down and then copy the right one into the final configuration files. Then all would be automated.

## WSO2 Development

### Examples Folder

I created some examples of WSO2 projects in this folder. All of these projects use a Maven Multi Module project structure with child Capp projects that wrap the child artifact projects into a Carbon App.

#### WsoSamples

For this project I used some of the WSO2 samples to build and deploy various types of artifacts in the applications.

##### Working examples

- ESB: [Inbound HL7 with Automatic Acknowledgement](https://docs.wso2.com/display/ESB500/Sample+905%3A+Inbound+HL7+with+Automatic+Acknowledgement) - Port 55971
- ​

##### Samples Links

- [ESB Samples](https://docs.wso2.com/display/ESB500/Samples)
- [GREG Samples](https://docs.wso2.com/display/Governance530/Samples)
- [BRS Samples](https://docs.wso2.com/display/BRS220/Samples)
- [DSS Samples](https://docs.wso2.com/display/DSS351/Samples)

#### WSOMavenMultiModuleExample

NOTE: This project will build and deploy and log things but the zip code service is not working. But along with the articles below, it explains the process of building a Capp, so I left it here.

I build this project based on the following two articles. Each is doing the same thing, but each had missing instructions. One shows using Eclipse for development. The other shows using the ESB web interface. I did most of the development in Developer Studio since it makes things simpler in the graphical interface and then I fine tuned things with direct editing of the xml files.

##### Articles on this example

- http://wso2.com/library/articles/2014/06/develop-and-deploy-esb-artifacts-using-wso2-developer-studio/
- http://dakshithar.blogspot.com/2012/06/routing-and-service-chaining-with-wso2.html

Also: http://wso2.com/library/articles/2012/11/enterprise-service-integration-wso2-esb/

##### Testing this example

The api port for the ESB is normally 8280 but the ESB in this project is running with a port offset of 1, so it is at 8281.

You can find the WSDL at http://localhost:8281/services/HCCProxyService?wsdl2

If you use Postman:

- Use POST
- Set the url to the WSDL file location
- Set the body type to text/xml

Here is a soap call:

```Xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:heal="http://healthcare.wso2">
   <soapenv:Header />
   <soapenv:Body>
      <heal:getHealthcareCenterInfo>
         <heal:longitude>-94</heal:longitude>
         <heal:latitude>39</heal:latitude>
      </heal:getHealthcareCenterInfo>
   </soapenv:Body>
</soapenv:Envelope>
```

#### General

##### Build and deploy with Maven

Run this in a parent multi module app directory:
```
mvn clean deploy
```

##### TrustStore

You will notice at the bottom of the pom.xml file in the Capp projects, the carbonServers section. Here is where you put the servers to deploy the artifact to. It can accept multiple servers. Here is a server config:

```xml
<CarbonServer>
  <trustStorePath>${basedir}/src/main/resources/security/wso2-local-docker.jks</trustStorePath>
  <trustStorePassword>wso2carbon</trustStorePassword>
  <trustStoreType>JKS</trustStoreType>
  <serverUrl>https://localhost:9444</serverUrl>
  <userName>admin</userName>
  <password>admin</password>
  <operation>deploy</operation>
</CarbonServer>
```

Without the trustStore file, this will not work. There are two ways of getting this file explained in the following article:

- https://pragmaticintegrator.wordpress.com/2013/04/09/deploying-the-wso2-car-file-with-maven/

I used method 1 and copied the jks file from the docker image and added it to the correct location. Which does bring up the need to research this truststore more in a deployment scenario (i.e regenerating it on public facing servers).

SEE: https://docs.wso2.com/display/IS500/Creating+New+Keystores

#### WSO2 project structure, deployment and continuous integration

##### Projects

- Start by creating a Multi Maven Project to hold the subprojects. The one in this project consists only of the pom.xml file in the Wso2Examples folder. This will be the parent of the projects it contains. Make no other projects parents. (i.e I made the Capp project a parent of the config project. Messed me up for about an hour while the project wouldn't compile.)
- Each MM project will have at least one Capp project to wrap up everything in a deployable Carbon app. This project is in the EsbConfigCappExample folder. Again, this is not a parent project.
- Each MM project will have one or multiple other artifact projects that will be included in a Capp. This project is the EsbConfigExample folder.
- Each Capp and artifact project will target a specific WSO2 server type (i.e. ESB, BRS), so a Multi Module Project could have more than one Capp when functionality touches more than one WSO2 application.

SEE link 1 in further reading.

##### Further Reading

- http://wso2.com/library/articles/2015/10/article-wso2-developer-studio-development-and-deployment-best-practices/
- http://muthulee.blogspot.com/2016/06/continuous-integration-for-wso2.html
- https://docs.wso2.com/display/Governance460/Governing+External+References+Across+Environments

### Governance Registry Persistance

The [Governance Registry](http://wso2.com/products/governance-registry/) is used to provide a shared governance partition backed by a Postgres database, as documented [here](https://docs.wso2.com/display/ESB490/Governance+Partition+in+a+Remote+Registry). The database `registrydb` is created by the `wso2scripts/postgres-sql/carbon-init.sql` script on-start.

To test the shared governance partition set-up, navigate to the `/_system/governance` registry from any of the web consoles. Add or modify some resources, and expect the changes to be seen in the web consoles of other components.

### Single Sign-On

The [Identity Server](http://wso2.com/products/identity-server/) is configured to support web browser-based SSO across all the components based on the steps described [here](https://docs.wso2.com/display/IS510/Configuring+SAML2+Single-Sign-On+Across+Different+WSO2+Products). A Postgres database is used as the [backing data source to store registry and user manager data](https://docs.wso2.com/display/IS510/Setting+up+MySQL).

Instead of defining the service provider for each component via the administrator console, I specified them in the `sso-idp-config.xml` file in accordance to this [example](https://docs.wso2.com/display/IS510/Configuring+a+SP+and+IdP+Using+Configuration+Files).

Since I am using Docker machine, I have to add the Identity Server hostname (`wso2identity`) to my `/etc/hosts` file. Refer to [Usage](https://github.com/ihcsim/compose-wso2#usage) section on the updates necessary for the `/etc/hosts` file. Otherwise, by default, all the Identity Server SSO web applications will redirect SAML requests back to `localhost`.

##### Service Providers for SSO

| Application | Service Provider Name | Assertion Consumer Service Url |
| ----------- | --------------------- | ------------------------------ |
| ESB         | service-provider-esb  | https://localhost:9444/acs     |
| GREG        | service-provider-greg | https://localhost:9445/acs     |
| BRS         | service-provider-brs  | https://localhost:9446/acs     |
| DSS         | service-provider-dss  | https://localhost:9447/acs     |
| AM          | service-provider-apim | https://localhost:9448/acs     |
| AS          | service-provider-as   | https://localhost:9449/acs     |

### Port Offsets

I am using port offsets in the carbon.xml files to prevent ports from colliding internally when doing SSO. You will also notice this in the docker-compose.yml file.

| Application | Port Offset (Standard Ports: 9443, 9763) |
| ----------- | ---------------------------------------- |
| IS          | 0                                        |
| ESB         | 1                                        |
| GREG        | 2                                        |
| BRS         | 3                                        |
| DSS         | 4                                        |
| AM          | 5                                        |
| AS          | 6                                        |

### Connecting the ESB and DSS

The DSS image has drivers preinstalled for Mysql, Sql Server and Postgres.

SEE:
- http://kalpads.blogspot.com/2012/07/implement-mdm-pattern-using-wso2-esb.html
- http://chathurikaerandi.blogspot.com/2016/05/how-do-i-integrate-wso2-esb-and-wso2.html

### Creating an API in the ESB

SEE:
- https://docs.wso2.com/display/ESB490/Creating+APIs
- http://wso2.com/library/articles/2012/09/get-cup-coffee-wso2-way/

### Using the Governance Registry

SEE:
- http://wso2.com/library/articles/2015/07/article-multi-environment-artifact-management-for-wso2-products-using-wso2-governance-registry/

### Using the Business Rules Server

SEE:
- http://wso2.com/library/articles/2011/04/integrate-rules-soa/
- http://wso2.com/library/articles/2013/05/eclipse-plugin-wso2-business-rules-server/

## Amazon Deployment

### Using ecs-cli

For this use the `docker-compose-aws-dev.yml` file.

SEE: https://github.com/aws/amazon-ecs-cli

#### Running

Running an instance with `ecs-cli compose` has its limitations. Since you are using a docker-compose file, you can't set the `confdata` container's `essential` key to false or set the memory limit on the containers even though there is a `memory_limit` key you can add to the compose file. So the containers come up and then go back down since the default memory limit is 512 and essential is set true by default.

I got around this by launching the instance with `ecs-cli compose` and then going to the aws website and modifying the task definition to up the memory and set the confdata container to non-essential and relaunching, so going forward it will be better to use `aws cli` and the task definition json file so these settings can be used. Giving the wso2 containers 1gb memory each allowed them to run.

You will also have to set up a security group for all the ports you need open to the outside world or modify the one that gets created when launched.

1. Configure the cli:

```
ecs-cli configure --region us-west-2 --access-key $AWS_ACCESS_KEY_ID --secret-key $AWS_SECRET_ACCESS_KEY --cluster bardavon-wso2-cluster
```

2. Create a cluster:

```
ecs-cli up --keypair id_rsa --capability-iam --size 1 --instance-type t2.medium
```

3. Bring up the containers:

```
ecs-cli compose --file docker-compose-aws-dev.yml up
```

#### Stopping

I kept killing my instance and it would only respawn. I even delete the cluster and task definitions from the web interface and the instance would not die. This command seemed to finally do the job.

```
ecs-cli down --force
```

### Using the aws cli

WIP

I added a task definition, `ecs-task-definition-dev.json` for use with the aws cli based off of my experiences and settings used with the ecs-cli.
