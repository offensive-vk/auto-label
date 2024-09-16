FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npx pnpm i --lockfile-only

COPY . .

RUN npm run build

ENTRYPOINT ["node", "./dist/index.js"]
