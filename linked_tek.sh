#!/bin/sh
# Small scripts to run the linked tek project

trap "kill 0" EXIT
echo "running docker compose"
# Run the containers
docker-compose up &
# Run the api-gateway which is not containerised yet.
cd services/gateway && npm start &
wait