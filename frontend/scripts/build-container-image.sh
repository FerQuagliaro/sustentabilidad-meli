#!/usr/bin/env bash
set -e
set -x

STRAPI_URL=https://api.sustentabilidadmercadolibre.com/api
PUBLIC_URL=https://sustentabilidadmercadolibre.com/
GA_ID=G-H3ZXZT7E8P

REPOSITORY=819651554268.dkr.ecr.us-east-1.amazonaws.com/meli-frontend
VERSION=$1

docker buildx build -t ${REPOSITORY}:${VERSION} \
  --build-arg PUBLIC_URL=${PUBLIC_URL} \
  --build-arg STRAPI_URL=${STRAPI_URL} \
  --build-arg GA_ID=${GA_ID} \
  . -f frontend/Dockerfile \
  --platform=linux/amd64 \
  --push
