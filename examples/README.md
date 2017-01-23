# Example WSO2 Maven Project

I build this project based on the following two articles. Each is doing the same thing, but each had missing instructions. One shows using Eclipse for development. The other shows using the ESB web interface. I did most of the development in Developer Studio since it makes things simpler in the graphical interface and then I fine tuned things with direct editing of the xml files.

- http://wso2.com/library/articles/2014/06/develop-and-deploy-esb-artifacts-using-wso2-developer-studio/
- http://dakshithar.blogspot.com/2012/06/routing-and-service-chaining-with-wso2.html

## Build and deploy with Maven

```
mvn clean deploy
```

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

The api port for the ESB is normally 8280 but the ESB in this project is running with a port offset of 1, so it is at 8281.

You can find the WSDL at http://localhost:8281/services/HCCProxyService?wsdl2

Here is a soap call:

```Xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:heal="http://healthcare.wso2">
   <soapenv:Header />
   <soapenv:Body>
      <heal:getHealthcareCenterInfo>
         <!--Optional:-->
         <heal:longitude>-94</heal:longitude>
         <!--Optional:-->
         <heal:latitude>39</heal:latitude>
      </heal:getHealthcareCenterInfo>
   </soapenv:Body>
</soapenv:Envelope>
```

## WSO2 project structure, deployment and continuous integration

### Projects

- Start by creating a Multi Maven Project to hold the subprojects. The one in this project consists only of the pom.xml file in the Wso2Examples folder. This will be the parent of the projects it contains. Make no other projects parents. (i.e I made the Capp project a parent of the config project. Messed me up for about an hour while the project wouldn't compile.)
- Each MM project will have at least one Capp project to wrap up everything in a deployable Carbon app. This project is in the EsbConfigCappExample folder. Again, this is not a parent project.
- Each MM project will have one or multiple other artifact projects that will be included in a Capp. This project is the EsbConfigExample folder.
- Each Capp and artifact project will target a specific WSO2 server type (i.e. ESB, BRS), so a Multi Module Project could have more than one Capp when functionality touches more than one WSO2 application.

SEE link 1 in further reading.

### Further Reading

- http://wso2.com/library/articles/2015/10/article-wso2-developer-studio-development-and-deployment-best-practices/
- http://muthulee.blogspot.com/2016/06/continuous-integration-for-wso2.html
- https://docs.wso2.com/display/Governance460/Governing+External+References+Across+Environments
