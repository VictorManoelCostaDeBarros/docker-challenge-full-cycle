FROM node:15

WORKDIR /usr/src/app

# Da erro quando tento fazer o docker-compose up -d --build no apt-get update 
# RUN apt-get update
# RUN apt-get install -y wget 
# RUN wget -O - https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar xzf - -C /usr/local/bin 
# RUN apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install 

EXPOSE 3000

CMD [ "node", "index.js" ]