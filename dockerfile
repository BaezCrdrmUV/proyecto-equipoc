FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
ADD . /home/node/app
COPY --chown=node:node . .
RUN ./node_modules/typescript/bin/tsc  --project $(pwd)/tsconfig.json
CMD [ "node", "dist/index.js" ]