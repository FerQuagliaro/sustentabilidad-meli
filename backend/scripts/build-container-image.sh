#!/usr/bin/env bash
set -e
set -x

REPOSITORY=819651554268.dkr.ecr.us-east-1.amazonaws.com/meli-backend
VERSION=$1

docker buildx build -t ${REPOSITORY}:${VERSION} \
  . -f backend/Dockerfile \
  --platform=linux/amd64 \
  --push
