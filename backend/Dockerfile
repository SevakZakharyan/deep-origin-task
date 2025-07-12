FROM node:24.0.2-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm install

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .

EXPOSE ${BACKEND_PORT:-3005}

CMD ["sh", "-c", "npx prisma db push --accept-data-loss --schema=./prisma/schema.prisma && npm run start:dev"]
