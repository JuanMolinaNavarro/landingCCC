# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG PUBLIC_API_ON_DEMAND_URL
ARG PUBLIC_API_SPORTS_URL
ENV PUBLIC_API_ON_DEMAND_URL=$PUBLIC_API_ON_DEMAND_URL
ENV PUBLIC_API_SPORTS_URL=$PUBLIC_API_SPORTS_URL

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
