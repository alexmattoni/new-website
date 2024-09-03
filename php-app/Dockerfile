FROM php:8.0-apache

# Copy the Angular build output and PHP files
COPY src/ /var/www/html/

# Enable Apache modules if necessary
RUN a2enmod rewrite
