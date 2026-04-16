#!/bin/bash
# =============================================================
# SSL Certificate Setup Script for Portfolio
# Run this ONCE on the server to obtain Let's Encrypt certificates
# Usage: ./init-ssl.sh tudominio.me tu@email.com
# =============================================================

set -e

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Usage: ./init-ssl.sh <domain> <email>"
    echo "Example: ./init-ssl.sh ernedev.me l21111182@itcj.edu.mx"
    exit 1
fi

echo "==> Setting up SSL for $DOMAIN..."

# Step 1: Create a temporary nginx config (HTTP only) for the ACME challenge
echo "==> Creating temporary HTTP-only nginx config..."
cat > nginx/nginx.conf <<NGINX_CONF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'Setting up SSL...';
        add_header Content-Type text/plain;
    }
}
NGINX_CONF

# Step 2: Start nginx (HTTP only) + backend + frontend
echo "==> Starting services in HTTP-only mode..."
docker compose -f docker-compose.prod.yml up -d --build nginx frontend backend

echo "==> Waiting for nginx to be ready..."
sleep 5

# Step 3: Run certbot to obtain the certificate
echo "==> Requesting SSL certificate from Let's Encrypt..."
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN"

# Step 4: Replace nginx config with the full SSL version
echo "==> Switching to HTTPS nginx config..."
sed "s/\${DOMAIN}/$DOMAIN/g" nginx/nginx.conf.template > nginx/nginx.conf

# Step 5: Restart nginx with SSL config
echo "==> Restarting nginx with SSL..."
docker compose -f docker-compose.prod.yml restart nginx

echo ""
echo "======================================"
echo "  SSL setup complete!"
echo "  Your site is live at: https://$DOMAIN"
echo "======================================"
