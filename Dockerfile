FROM openjdk:8-jre-alpine
MAINTAINER smark
ENV DP_HOME /dockerpad
EXPOSE 80
COPY ./app ${DP_HOME}
COPY ./ress ${DP_HOME}
COPY ./index.html ${DP_HOME}
COPY ./dockerpad ${DP_HOME}
