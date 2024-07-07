FROM node:12.2.0-alpine
ENV TZ="Asia/Ho_Chi_Minh"

ARG PORT=8081

RUN apk add --update nodejs nodejs-npm
RUN apk add --no-cache bash
RUN apk add --no-cache git
# RUN npm config rm proxy
# RUN npm config rm https-prox
RUN node -v
RUN npm config set unsafe-perm true
RUN npm install forever -g

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/App
COPY ./. /usr/src/app/App
WORKDIR /usr/src/app/App
RUN npm install

EXPOSE ${PORT}

CMD ["forever", "./src/index.js"]
