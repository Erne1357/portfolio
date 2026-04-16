#!/bin/bash
# =============================================================
# SSL Certificate Renewal Script
# Add to crontab: 0 3 1 */2 * /opt/portfolio/renew-ssl.sh
# =============================================================

cd /opt/portfolio

docker compose -f docker-compose.prod.yml run --rm certbot renew --quiet
docker compose -f docker-compose.prod.yml restart nginx

echo "[$(date)] SSL renewal check completed." >> /var/log/ssl-renewal.log
