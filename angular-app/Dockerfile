FROM node:latest

# Set WORKDIR and copy over all the package info
WORKDIR /usr/src/app
COPY . .

# Install angular and the node modules
RUN npm install -g @angular/cli
RUN npm install

# Copy over the rest and start the !!development!! environment (don't use ng serve in prod)
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]