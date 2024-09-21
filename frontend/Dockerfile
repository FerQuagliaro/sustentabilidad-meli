FROM node:16.13-alpine as builder

RUN npm i -g npm@^8

# Set working directory
WORKDIR /build

COPY frontend/package*.json ./
COPY frontend/tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy files
COPY frontend/ ./

# Add curl and install node-prune https://github.com/tj/node-prune
#RUN apk --no-cache add curl && curl -sf https://gobinaries.com/tj/node-prune | sh

ARG STRAPI_URL
ARG PUBLIC_URL
ARG GA_ID
ARG GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
ARG GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

ENV NEXT_PUBLIC_API_URL ${STRAPI_URL}
ENV NEXT_PUBLIC_URL ${PUBLIC_URL}
ENV NEXT_PUBLIC_GA_ID ${GA_ID}

ENV GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL ${GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL}
ENV GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ${GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY}

# Build and purge node_modules from unnecessary files
RUN npm run build

# second stage: expose app
FROM node:16.13-alpine

# Set working directory
WORKDIR /app

# Copy node dependences
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/tsconfig*.json ./
COPY --from=builder /build/node_modules node_modules

# Copy files from builder
COPY --from=builder /build/.next .next
COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/public public

ENV PORT 3000
# Building app
EXPOSE 3000

# Running the app
CMD [ "npm", "run", "start" ]
