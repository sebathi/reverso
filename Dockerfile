# build environment
# FROM node:alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY ./public .
# COPY ./package.json .
# RUN yarn install
# RUN mkdir /app/build
# RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
