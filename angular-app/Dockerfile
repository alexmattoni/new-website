FROM node:20 as build

WORKDIR /app

# Copy the current directory contents into the container at /app, then install/build
COPY . .
RUN npm ci
RUN npm run build --prod

# Use the latest version of the official Nginx image as the base image
FROM nginx:latest

# Copy nginx config over
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application to the nginx directory
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/angular-app/browser /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/*

# Start the nginx server
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
