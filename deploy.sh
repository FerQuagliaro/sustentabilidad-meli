#!/usr/bin/env bash
set -e
set -x

print_usage() {
  echo "${0} [frontend | backend] VERSION"
}

check_docker() {
  if ! docker info > /dev/null 2>&1; then
  echo "This script uses docker, and it isn't running - please start docker and try again!"
  exit 1
  fi
}

deploy() {
  check_docker;
  case $1 in
      frontend | backend)
        SERVICE=$1
        ;;
      *)
        print_usage
        exit 1
        ;;
  esac

  if [ -z $2 ]
  then
    print_usage
    exit 2
  fi

  bash "./${SERVICE}/scripts/build-container-image.sh" $2
}

deploy $1 $2
