const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose")
const User = require("./model.js");
const { log } = require("console");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const product_routes = require("./routes/product.js")
app.use("/api",product_routes)


const dbURI = "mongodb+srv://guddu:guddu@cluster1.ved7bni.mongodb.net/yes?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        const PORT = process.env.PORT || 7777;
        app.listen(PORT, () => {
            console.log("server is created")
        })
    })
    .catch((err) => console.log(err))
