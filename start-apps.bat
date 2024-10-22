@echo off
echo Starting React and Strapi apps...

:: Start React app in a new terminal
start cmd /k "cd /d react\react-app && npm start"

:: Start Strapi app in a different terminal
start cmd /k "cd /d strapi\strapi-app && npm run develop"

:: Exit the original terminal
exit
