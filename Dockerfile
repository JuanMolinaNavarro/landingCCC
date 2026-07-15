# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# OJO: nada de LEADS_API_KEY acá. Un ARG/ENV con prefijo PUBLIC_ se hornea en
# el bundle del cliente. La clave ahora vive solo en runtime (nginx), no en build.
ARG PUBLIC_API_ON_DEMAND_URL
ARG PUBLIC_API_SPORTS_URL
ENV PUBLIC_API_ON_DEMAND_URL=$PUBLIC_API_ON_DEMAND_URL
ENV PUBLIC_API_SPORTS_URL=$PUBLIC_API_SPORTS_URL

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
# Como template para que la imagen de nginx corra envsubst en runtime
# (sustituye ${LEADS_API_KEY} y ${LEADS_UPSTREAM}) -> /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80
