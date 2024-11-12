# This is RPI Ambulance's new website.

The main goal is to port the [old website](https://github.com/rpiambulance/website) to Angular.

Once we have achieved a similar style, we will then work on modernizing features and migrating the database to something a little more extensible.

# Development Setup - Frontend

This is probably not right or fully complete.

1. Download latest Node.js
2. Clone repository.
3. Run 'npm install' within the angular-app directory.
4. Run 'ng serve' within the angular-app directory. It will auto-refresh on changes!
5. Hopefully it is working.

# Development Setup - Backend

Reference - https://nikiforovall.github.io/keycloak-authorization-services-dotnet/getting-started.html

Everything is a C# project (Alex uses JetBrains Rider as IDE of choice but anything will work). This can be run 
to interface with the database and takes authorization requests from Keycloak.

# Deployment

The angular app can be be deployed using Docker. We have yet to write the Dockerfile for this.


# Important Notes

There are two environment files within ```new-website/angular-app/src/environments```. You need to configure them to your Keycloak instance; for now they are both setup for the development instance, until we have time to fix that and deploy.

# TODO

- fix email links on the static pages; right now just plaintext or surrounded with quotes
