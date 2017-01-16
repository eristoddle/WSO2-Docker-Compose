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
    CREATE DATABASE esbcarbondb;
    GRANT ALL PRIVILEGES ON DATABASE esbcarbondb TO wso2user;
    CREATE DATABASE brscarbondb;
    GRANT ALL PRIVILEGES ON DATABASE brscarbondb TO wso2user;
    CREATE DATABASE dsscarbondb;
    GRANT ALL PRIVILEGES ON DATABASE dsscarbondb TO wso2user;
    CREATE DATABASE gregcarbondb;
    GRANT ALL PRIVILEGES ON DATABASE gregcarbondb TO wso2user;
    CREATE DATABASE gregmetricsdb;
    GRANT ALL PRIVILEGES ON DATABASE gregmetricsdb TO wso2user;
    CREATE DATABASE gregbpeldb;
    GRANT ALL PRIVILEGES ON DATABASE gregbpeldb TO wso2user;
    CREATE DATABASE gregsocialdb;
    GRANT ALL PRIVILEGES ON DATABASE gregsocialdb TO wso2user;
    CREATE DATABASE apimgtdb;
    GRANT ALL PRIVILEGES ON DATABASE apimgtdb TO wso2user;
    CREATE DATABASE amcarbondb;
    GRANT ALL PRIVILEGES ON DATABASE amcarbondb TO wso2user;
    CREATE DATABASE ammetricsdb;
    GRANT ALL PRIVILEGES ON DATABASE ammetricsdb TO wso2user;
    CREATE DATABASE ascarbondb;
    GRANT ALL PRIVILEGES ON DATABASE ascarbondb TO wso2user;
EOSQL

echo "Initializing database WSO2 databases"
psql --username="$POSTGRES_USER" -d mbstoredb -f /tmp/postgres-sql/mb-init.sql
psql --username="$POSTGRES_USER" -d identitydb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d registrydb -f /tmp/postgres-sql/carbon-init.sql

psql --username="$POSTGRES_USER" -d identitymetricsdb -f /tmp/postgres-sql/metrics-init.sql
# psql --username="$POSTGRES_USER" -d identitycarbondb -f /tmp/postgres-sql/carbon-is-init.sql
psql --username="$POSTGRES_USER" -d identitybpeldb -f /tmp/postgres-sql/bpel-init.sql

# psql --username="$POSTGRES_USER" -d gregcarbondb -f /tmp/postgres-sql/carbon-greg-init.sql
psql --username="$POSTGRES_USER" -d gregmetricsdb -f /tmp/postgres-sql/metrics-init.sql
psql --username="$POSTGRES_USER" -d gregbpeldb -f /tmp/postgres-sql/bpel-init.sql
psql --username="$POSTGRES_USER" -d gregsocialdb -f /tmp/postgres-sql/social-init.sql

psql --username="$POSTGRES_USER" -d apimgtdb -f /tmp/postgres-sql/apimgt-init.sql
psql --username="$POSTGRES_USER" -d amcarbondb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d ammetricsdb -f /tmp/postgres-sql/metrics-init.sql

psql --username="$POSTGRES_USER" -d esbcarbondb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d brscarbondb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d dsscarbondb -f /tmp/postgres-sql/carbon-init.sql
psql --username="$POSTGRES_USER" -d ascarbondb -f /tmp/postgres-sql/carbon-init.sql

# Add conf
cp /tmp/postgres-sql/postgresql.conf /var/lib/postgresql/data/postgresql.conf

pg_createcluster 9.6 main --start

service postgresql restart
