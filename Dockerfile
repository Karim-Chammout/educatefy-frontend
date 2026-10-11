FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_BASE_URL
ARG VITE_S3_BUCKET_NAME
ARG VITE_S3_PATH_PREFIX
ENV VITE_BASE_URL=$VITE_BASE_URL \
    VITE_S3_BUCKET_NAME=$VITE_S3_BUCKET_NAME \
    VITE_S3_PATH_PREFIX=$VITE_S3_PATH_PREFIX

RUN NODE_OPTIONS=--max-old-space-size=3072 npm run build

FROM caddy:2-alpine
COPY --from=build /app/dist /usr/share/caddy/dist
