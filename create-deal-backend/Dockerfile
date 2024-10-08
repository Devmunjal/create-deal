FROM node:18 as build
RUN apt-get update && apt-get install -y openjdk-17-jdk
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk
ENV PATH $PATH:$JAVA_HOME/bin
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4000
EXPOSE 8000
RUN chmod +x start.sh
CMD ["./start.sh"]