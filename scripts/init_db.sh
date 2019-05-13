#!/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`

usage() { echo "Usage $0 -i" 1>&2; exit 1; }

[[ $# -eq 0 ]] && usage

while getopts i opt; do
  case $opt in
  i)
    cd $SCRIPTPATH/linked_admin
    echo $SCRIPTPATH
    echo $PWD
    if [[ ! -e node_modules ]]; then
      npm install
    fi
    echo "Initialising database"
    npm run init-db
    ;;
  \?)
    usage
    ;;
  *)
    usage
    ;;
  esac
  shift
done

exit 0