# Image for volume when not on a local dev environment
# Wraps up conf folder into a data packed volume
# This could be used to create different configs for different environments
# While the base images remain the same everywhere
# SEE: https://medium.com/on-docker/data-packed-volume-containers-distribute-configuration-c23ff80987cd
# AND: https://blog.codeship.com/orchestrate-containers-for-development-with-docker-compose/

FROM busybox:latest
VOLUME ["/conf"]
COPY ./conf /tmp-conf
CMD cp -R /tmp-conf/* /conf/
