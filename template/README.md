# Docker WSO2 configuration containers build process

This project builds the docker images to hold the configuration for WSO2 applications.

## Grunt libraries

- copy
- clean
- https://www.npmjs.com/package/load-grunt-tasks to break up configuration files
- https://www.npmjs.com/package/grunt-xmlstoke to parse and modify xml files
- https://github.com/JoTrdl/grunt-dock to build docker images

## Xpath Tool

Xpath can be a pain, so this will help you not have to think. Just paste in the xml and highlight the element to get the xpath: http://xmltoolbox.appspot.com/xpath_generator.html
