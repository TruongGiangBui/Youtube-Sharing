FROM node:12.2.0-alpine
ENV TZ="Asia/Ho_Chi_Minh"

ARG PORT=443

RUN node -v
RUN npm config set unsafe-perm true

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/Web
COPY ./. /usr/src/app/Web
WORKDIR /usr/src/app/Web
RUN npm install
RUN npm run build

EXPOSE ${PORT}
CMD ["npm","run",'prod']
