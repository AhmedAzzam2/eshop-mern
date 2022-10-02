require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// morgan
const morgan = require("morgan");
// helmet
//acquiring routes
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

const app = express();
app.use(cors());
app.options("*", cors());

const api = process.env.API_URL
//http://localhost:5000/api/v1/products

//middlewares
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended:false}));

app.use(express.json());

// app.use(express.static('./public'));

// Accessing the path module

app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoriesRoute);


app.use(express.static(path.join(__dirname, "client/build")));
app.use("", express.static(path.join(__dirname, "/public/")));



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


module.exports = app;

