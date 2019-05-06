#!/bin/sh
# Small scripts to run the linked tek project

trap "kill 0" EXIT
echo "running docker compose"
# Run the containers
docker-compose up &
wait