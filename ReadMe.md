- Download and Install Node JS and Mongo DB

- Start Mongo DB server by running the following command in "bin" folder where Mongo DB is installed:
    > ./mongod
    or
    > mongod

- Then open command prompt in "server" folder and run the following command:
    > npm update
    > npm install -g nodemon
    > nodemon server.js

- Then open another command prompt in "client" folder and run the following command:
    > npm update
    > npm run serve

- Then open another command prompt in "admin" folder and run the following command:
    > npm update
    > npm run serve -- --port=8081

- Then open your browser and enter the following address for client side:
    > http://localhost:8080/

- And for admin side:
    > http://localhost:8081/

- To setup SMTP emails:
    Open server > modules > globals.js
    Then set the username and password in "nodemailerObject" variable.

