# Image for volume when not on a local dev environment
# Wraps up conf folder into a data packed volume
# This could be used to create different configs for different environments
# While the base images remain the same everywhere
# SEE: https://medium.com/on-docker/data-packed-volume-containers-distribute-configuration-c23ff80987cd
# AND: https://blog.codeship.com/orchestrate-containers-for-development-with-docker-compose/
# AND: https://howchoo.com/g/y2y1mtkznda/getting-started-with-docker-compose-and-django

FROM busybox:latest
VOLUME ["/mnt"]
COPY ./conf /tmp-conf
# CMD cp -R /tmp-conf/* /conf/
CMD mv -R /tmp-conf/wso2am/* /mnt/wso2am/
CMD mv -R /tmp-conf/wso2as/* /mnt/wso2as/
CMD mv -R /tmp-conf/wso2brs/* /mnt/wso2brs/
CMD mv -R /tmp-conf/wso2dss/* /mnt/wso2dss/
CMD mv -R /tmp-conf/wso2esb/* /mnt/wso2esb/
CMD mv -R /tmp-conf/wso2greg/* /mnt/wso2greg/
CMD mv -R /tmp-conf/wso2is/* /mnt/wso2is/

CMD mkdir /var/lib/postgresql/data
CMD mv -R /tmp-conf/wso2scripts/postgres-sql/* /tmp/postgres-sql/
CMD mv -R /tmp-conf/wso2scripts/postgres-init/* /docker-entrypoint-initdb.d/

# Key to creating container for data
CMD ["true"]
