# Stage 1: Build the Angular application
FROM node:18 as build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Ensure the Angular CLI is installed
RUN npm install -g @angular/cli

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the Angular application with nginx
FROM nginx:alpine

# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular files to the nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]