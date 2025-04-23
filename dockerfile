FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=q1w2e3r4
ENV MYSQL_DATABASE=petfood

COPY create_database.sql /docker-entrypoint-initdb.d/
