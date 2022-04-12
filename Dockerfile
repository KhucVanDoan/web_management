# build stage
FROM node:14-alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install 

COPY ./ /app/

ARG REACT_APP_HOST
ARG REACT_APP_SOCKET_HOST
ARG REACT_APP_WMS_URL
ARG REACT_APP_MMSX_URL
ARG REACT_APP_QMSX_URL
ARG REACT_APP_VTI_DOMAIN

ENV REACT_APP_HOST $REACT_APP_HOST
ENV REACT_APP_SOCKET_HOST $REACT_APP_HOST
ENV REACT_APP_WMS_URL $REACT_APP_WMS_URL
ENV REACT_APP_MMSX_URL $REACT_APP_MMSX_URL
ENV REACT_APP_QMSX_URL $REACT_APP_QMSX_URL
ENV REACT_APP_VTI_DOMAIN $REACT_APP_VTI_DOMAIN

RUN npm run build

RUN rm -rf /etc/nginx/conf.d

# production stage
FROM nginx:1.17-alpine as production-stage

COPY conf /etc/nginx

COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]