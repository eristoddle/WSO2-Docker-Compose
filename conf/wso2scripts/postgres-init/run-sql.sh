#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE mbstoredb;
    GRANT ALL PRIVILEGES ON DATABASE mbstoredb TO wso2user;
    CREATE DATABASE registrydb;
    GRANT ALL PRIVILEGES ON DATABASE registrydb TO wso2user;
    CREATE DATABASE identitydb;
    GRANT ALL PRIVILEGES ON DATABASE identitydb TO wso2user;
EOSQL

echo "Initializing database WSO2 databases mbstoredb, registrydb and identitydb"
psql --username="$POSTGRES_USER" -d mbstoredb -f /tmp/postgres-sql/apim-init.sql
psql --username="$POSTGRES_USER" -d identitydb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d registrydb -f /tmp/postgres-sql/carbon-init.sql

# Add conf
cp /tmp/postgres-sql/postgresql.conf /var/lib/postgresql/data/postgresql.conf

pg_createcluster 9.6 main --start

service postgresql restart
