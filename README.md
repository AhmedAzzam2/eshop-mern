# eshop-mern

![](public/uploads/login.gif)
## Installation

Clone the repo:

```bash
git clone https://github.com/AhmedAzzam2/eshop-mern <YOUR_PROJECT_NAME> && cd <YOUR_PROJECT_NAME>
```


This will remove the existing git history, and allow you to link it to a new repository.

## .env

Lets create a `.env` file in the root of the project:

```bash
touch .env
```

Then put the following code in that `.env` except you should add your details.

```bash
MONGODB_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
JWT_SEC = <your_SEC_key>
```

## run the project

```bash
npm run install -f
npm run server
localhost:5000
```
## config client

```bash
cd client/config
```
then change the url in the appUrl.js file to your server url



## Scripts

```json
"scripts": {
    "test:watch": "jest --watch",
    "coverage": "jest --coverage",
    "start": "npm run build --prefix client && node server.js",
    "server": "npm run build --prefix client && nodemon server.js",
    "install": "npm install -f && npm install --prefix client -f",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install -f --prefix client && npm run build --prefix client"

  },
```

## Running the tests

```json
"scripts": {
    "test:watch": "jest --watch",
    "coverage": "jest --coverage"
  },
```

## Deployment

## - [https://shop-mern-forjob.herokuapp.com/](https://shop-mern-forjob.herokuapp.com/)

## Built With

- [react](https://reactjs.org/) - A JavaScript library for building user interfaces
- [formik](https://formik.org/) - Formik is the world's most popular open source form library for React and React Native.
- [yup]
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) - DOM bindings for React Router
- [axios]( https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [react-google-login](https://www.npmjs.com/package/react-google-login) - React Google Login
- [node](https://nodejs.org/en/about/) - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- [express](https://expressjs.com) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [mongoDB](https://www.mongodb.com) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [mongoose](https://mongoosejs.com) - Mongoose provides a straight-forward, schema-based solution to model your application data.
- [dotenv](https://github.com/motdotla/dotenv#readme) - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env.`
- [cryptojs](https://www.npmjs.com/package/crypto-js)- CryptoJS is a growing collection of standard and secure cryptographic algorithms implemented in JavaScript using best practices and patterns. They are fast, and they have a consistent and simple interface.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - JsonWebToken implementation for node.js.
- [cookie-parser](https://github.com/expressjs/cookie-parser#readme) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - bcrypt is a password hashing function.
- [passport](http://www.passportjs.org) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.
- [multer](https://www.npmjs.com/package/multer) - Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
-[jest](https://jestjs.io/)-  testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly
-[supertest](https://www.npmjs.com/package/supertest) - Supertest module will make api request in jest tests, query our endpoints and return reponses to test conducted


## Author(s)

- **Ahmed Azaam**  [Ahmed Azzam](https://github.com/ahmedazzam2)
