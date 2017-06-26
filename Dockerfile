FROM mhart/alpine-node:7.6.0

WORKDIR /src

COPY app/src/package.json /src/package.json

#install node modules
RUN npm install

# Add all app source files
ADD app/src /src

CMD ["node", "server.js"]
