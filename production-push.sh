vue-cli-service build
cp -rv ./dist/* /Users/abdulsamet/Projects/cetelem-backend/nginx/cetelem-web-dist/
cd /Users/abdulsamet/Projects/cetelem-backend/nginx/cetelem-web-dist/
git pull
git add *
git commit -m "Dashboard demo has been completed."
git push
