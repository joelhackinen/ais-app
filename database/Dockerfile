FROM python:3.10.13-slim-bookworm AS data-validation

WORKDIR /usr/src/app

COPY validate_data.py .

COPY ais-data.csv .

RUN python3 validate_data.py ais-data.csv ais.csv


FROM postgres:14.1

COPY --from=data-validation /usr/src/app/ais.csv ais-data.csv

COPY db-init.sql docker-entrypoint-initdb.d/db-init.sql

EXPOSE 5432

CMD ["postgres"]