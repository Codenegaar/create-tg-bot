
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY tsconfig.json ./

COPY . .

RUN npm run build

# ---- Production image ----
FROM node:18-alpine AS production

WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]
