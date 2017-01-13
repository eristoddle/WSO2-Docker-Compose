#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE mbstoredb;
    GRANT ALL PRIVILEGES ON DATABASE mbstoredb TO wso2user;
    CREATE DATABASE registrydb;
    GRANT ALL PRIVILEGES ON DATABASE registrydb TO wso2user;
    CREATE DATABASE identitydb;
    GRANT ALL PRIVILEGES ON DATABASE identitydb TO wso2user;
    CREATE DATABASE identitymetricsdb;
    GRANT ALL PRIVILEGES ON DATABASE identitymetricsdb TO wso2user;
    CREATE DATABASE identitycarbondb;
    GRANT ALL PRIVILEGES ON DATABASE identitycarbondb TO wso2user;
    CREATE DATABASE identitybpeldb;
    GRANT ALL PRIVILEGES ON DATABASE identitybpeldb TO wso2user;
EOSQL

echo "Initializing database WSO2 databases mbstoredb, registrydb and identitydb"
psql --username="$POSTGRES_USER" -d mbstoredb -f /tmp/postgres-sql/apim-init.sql
psql --username="$POSTGRES_USER" -d identitydb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d registrydb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d identitymetricsdb -f /tmp/postgres-sql/metrics-init.sql
psql --username="$POSTGRES_USER" -d identitycarbondb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d identitybpeldb -f /tmp/postgres-sql/bpel-init.sql

# Add conf
cp /tmp/postgres-sql/postgresql.conf /var/lib/postgresql/data/postgresql.conf

pg_createcluster 9.6 main --start

service postgresql restart
