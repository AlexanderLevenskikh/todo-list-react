FROM node:alpine as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn run build:prod:fake

FROM nginx:stable

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /etc/nginx/html
