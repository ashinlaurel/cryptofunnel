cd ~/cryptofunnel/
sudo git fetch --all
sudo git reset --hard origin/main
cd /var/www/
sudo rm -r build/
cd ~/cryptofunnel/Frontend/
sudo mv build/ /var/www/
sudo systemctl restart nginx
sudo pm2 restart all

