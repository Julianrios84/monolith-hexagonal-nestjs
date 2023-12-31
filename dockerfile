# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
# RUN npm install --frozen-lockfile
RUN yarn install --frozen-lockfile

# Build the app with cache dependencies
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# RUN npm run build
RUN yarn run build

# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner
ARG EXPOSE
# Set working directory
WORKDIR /usr/src/app
COPY package.json ./
# RUN npm install --omit=dev
RUN yarn install --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE $EXPOSE
# Runner
CMD [ "node","dist/main.js" ]