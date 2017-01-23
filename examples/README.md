# Example WSO2 Maven Project

I build this project based on the following two articles. Each is doing the same thing, but each had missing instructions. One shows using Eclipse for development. The other shows using the ESB web interface.

- http://wso2.com/library/articles/2014/06/develop-and-deploy-esb-artifacts-using-wso2-developer-studio/
- http://dakshithar.blogspot.com/2012/06/routing-and-service-chaining-with-wso2.html

## Development notes

I developed the Capp in WSO2 Developer Studio. When I went to run the deploy command, maven couldn't find the dependencies in the other project. It tried to check the online Maven repo.

So I added the maven plugin to Atom and started developing there. Magically, that plugin created the effective.pom files, .classpath files and the target folders and found the artifacts when I opened the project. Not asking questions. I was able to deploy after adding the TrustStore as explained below.

But I did research the issue with the pom.xml created by Developer Studio. I just had to signify that the dependencies were local and their path. Or create a local repo to store them once built. Haven't tested yet.

## TrustStore

You will notice at the bottom of the pom.xml file in the ESBCappExample project, the carbonServers section. Here is where you put the servers to deploy the artifact to. It can accept multiple servers. Here is a server config:

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

## Testing

Here is a soap call:

```Xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:heal="http://healthcare.wso2">
   <soapenv:Header />
   <soapenv:Body>
      <heal:getHealthcareCenterInfo>
         <!--Optional:-->
         <heal:longitude>3</heal:longitude>
         <!--Optional:-->
         <heal:latitude>4</heal:latitude>
      </heal:getHealthcareCenterInfo>
   </soapenv:Body>
</soapenv:Envelope>
```

## WSO2 project structure, deployment and continuous integration

### Projects

- Start by creating a Multi Maven Project to hold the subprojects
- Each MM project will have a Capp project to wrap up everything in a deployable Carbon app
- Each MM project will have one or multiple other artifact projects that will be included in the Capp

- http://wso2.com/library/articles/2015/10/article-wso2-developer-studio-development-and-deployment-best-practices/
- http://muthulee.blogspot.com/2016/06/continuous-integration-for-wso2.html
- https://docs.wso2.com/display/Governance460/Governing+External+References+Across+Environments
