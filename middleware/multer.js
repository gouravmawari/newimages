const express = require("express");
const multer = require("multer")

const Storage = multer.diskStorage({
    destination:'space',
    filename(req,file,cb){
        cb(null,file.originalname)
    }
})

const middleware_multer = multer({
    storage:Storage
}).single("image")


module.exports = middleware_multer;