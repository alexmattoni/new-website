FROM node:20 as build

WORKDIR /app

# Copy the current directory contents into the container at /app, then install/build
COPY . .
RUN npm ci
RUN npm run build --prod

# Use the latest version of the official Nginx image as the base image
FROM nginx:latest

# Copy the built application to the nginx directory
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/angular-app/browser . 
COPY ./src/assets .
RUN chown -R nginx:nginx /usr/share/nginx/*

# Start the nginx server
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
