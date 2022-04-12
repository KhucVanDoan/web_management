# build stage
FROM node:14-alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install 

COPY ./ /app/

RUN npm run build

RUN rm -rf /etc/nginx/conf.d

# production stage
FROM nginx:1.17-alpine as production-stage

COPY conf /etc/nginx

COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]