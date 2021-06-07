FROM node:14.17-buster
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN chmod -R 777 /home/node
WORKDIR /home/node/app
COPY package*.json ./
RUN apt-get update -y
RUN apt-get install -y ffmpeg
RUN apt-get install -y gpac
RUN pwd
RUN ls -a
RUN npm install
ADD ./ /home/node/app
COPY --chown=node:node . .
RUN ./node_modules/typescript/bin/tsc  --project $(pwd)/tsconfig.json
CMD [ "node", "dist/index.js" ]