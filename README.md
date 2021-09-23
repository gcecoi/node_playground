It is a small app that purpose is to learn how work prisma and use JWToken.



run "npm install" to install all dependencies

run "docker-compose up" to start postgres 

init postgres DB

in root folder create .env file with DATABASE_URL="postgresql://postgres:postgres@localhost:5438/postgres?schema=bank"
                                     ACCESS_TOKEN_SECRET=ajlkqowieuqowueoi

run "npx prisma generate" to generate prisma client

run "prisma db push" to  push the prisma schema state to the database

run "npm start" to start application in nodemon mode