# Image for volume when not on a local dev environment
# Wraps up conf folder into a data packed volume
# This could be used to create different configs for different environments
# While the base images remain the same everywhere
# SEE: https://medium.com/on-docker/data-packed-volume-containers-distribute-configuration-c23ff80987cd
# AND: https://blog.codeship.com/orchestrate-containers-for-development-with-docker-compose/
# AND: https://howchoo.com/g/y2y1mtkznda/getting-started-with-docker-compose-and-django

FROM alpine:latest

VOLUME ["/mnt/wso2am/repository/conf"]
VOLUME ["/mnt/wso2as/repository/conf"]
VOLUME ["/mnt/wso2brs/repository/conf"]
VOLUME ["/mnt/wso2dss/repository/conf"]
VOLUME ["/mnt/wso2esb/repository/conf"]
VOLUME ["/mnt/wso2greg/repository/conf"]
VOLUME ["/mnt/wso2is/repository/conf"]

VOLUME ["/tmp/postgres-sql"]
VOLUME ["/docker-entrypoint-initdb.d"]

COPY build/local/conf /mnt

COPY template/conf/wso2scripts/postgres-init /docker-entrypoint-initdb.d
COPY template/conf/wso2scripts/postgres-sql /tmp/postgres-sql
CMD mkdir /var/lib/postgresql/data

# Key to creating container for data
CMD ["true"]
