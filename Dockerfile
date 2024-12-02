FROM node:20 as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma/migrations ./prisma
COPY prisma/schema.prisma ./prisma
COPY src ./src
COPY public ./public
COPY astro.config.mjs ./
COPY svelte.config.js ./
COPY tailwind.config.js ./

RUN npm install

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=build /app ./

EXPOSE 4321

CMD ["npm", "run", "preview"]
