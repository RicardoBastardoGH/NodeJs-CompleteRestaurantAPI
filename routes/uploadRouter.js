const express = require('express');
const authenticate = require('../authenticate')
const multer = require ('multer')

//var User = require('../models/user');

// multer configuration
var storage = multer.diskStorage({
    destionation: (req, file, cb) => {
        cb(null, 'public/images')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// wich kind of file will be accepted to upload
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files'))
    }
    cb(null,true);
};

// Initialize
const upload = multer({storage: storage, fileFilter: imageFileFilter})

const uploadRouter = express.Router();

uploadRouter.use(express.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403; //
    res.end('GET operation not supported on /image/upload');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403; //
    res.end('PUT operation not supported on /image/upload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403; //
    res.end('DELETE operation not supported on /image/upload');
})

module.exports = uploadRouter;