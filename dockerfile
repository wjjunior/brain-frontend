# Container Image
FROM node:14-alpine as builder

# Set working directory. Paths will be relative this WORKDIR.
RUN mkdir /src
WORKDIR /src

# Adicionando '/app/node_modules/.bin' para o $PATH
ENV PATH /src/node_modules/.bin:$PATH

# Install dependencies
COPY package.json /src
COPY package-lock.json /src
RUN npm install

# Copy source files from host computer to the container
COPY . /src

# Build the app
RUN BRAIN_ENV=dev npm run build
EXPOSE 8000

FROM nginx:1.19.3-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /src/build /usr/share/nginx/html