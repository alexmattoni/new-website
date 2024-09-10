# This is RPI Ambulance's new website.

The main goal is to port the [old website](https://github.com/rpiambulance/website) to Angular.

Once we have achieved a similar style, we will then work on modernizing features and migrating the database to something a little more extensible.

# Development Environment Setup

This is probably not right or fully complete.

1. Download latest Node.js
2. Clone repository.
3. Run 'npm install'
4. Run 'docker compose up --build'
5. Hopefully it is working.

# Deployment

Very simple using docker compose. Before you do that, run:

```
echo "PG_PASS=$(openssl rand -base64 36 | tr -d '\n')" >> .env
echo "AUTHENTIK_SECRET_KEY=$(openssl rand -base64 60 | tr -d '\n')" >> .env
```

To configure email reporting for Authentik, add the following to the .env file:

```
# SMTP Host Emails are sent to
AUTHENTIK_EMAIL__HOST=localhost
AUTHENTIK_EMAIL__PORT=25
# Optionally authenticate (don't add quotation marks to your password)
AUTHENTIK_EMAIL__USERNAME=
AUTHENTIK_EMAIL__PASSWORD=
# Use StartTLS
AUTHENTIK_EMAIL__USE_TLS=false
# Use SSL
AUTHENTIK_EMAIL__USE_SSL=false
AUTHENTIK_EMAIL__TIMEOUT=10
# Email address authentik will send from, should have a correct @domain
AUTHENTIK_EMAIL__FROM=authentik@localhost
```