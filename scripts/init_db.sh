#!/bin/bash

ORIG=$PWD

usage() { echo "Usage $0 -i" 1>&2; exit 1; }
 

while getopts i opt; do
  case $opt in
  i)
    cd linked_admin
    if [[ ! -e node_modules ]]; then
      npm install
    fi
    echo "Initialising database"
    npm run init-db
    ;;
  \?)
    usage
    ;;
  esac
  shift
done

exit 0