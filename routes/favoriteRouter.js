const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('../authenticate')
const Dishes = require('../models/dishes');
var Favorites = require('../models/favorite');
const cors = require('./cors');
const Users = require('../models/user');

const favoriteRouter = express.Router();

favoriteRouter.use(express.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req,res) => {res.sendStatus(200)})
.get(cors.cors, authenticate.verifyUser, (req,res,next) =>{
    
    Favorites.findOne({ user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then ((favorite) => {
        if (favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorite);    
        }
        else {
            // user doesnt have favorites yet
            err = new Error('User doesnt have favorites yet');
            err.status = 404;
            return next(err)
        }
    }, (err) => next(err));

} )
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    
    
    // check if all dishes exist
    req.body.forEach(id => {
        Dishes.findById(id._id)
        .then((dish) => {
            if (!dish) {
                // dish not found respond with error 
                err = new Error('the Dish with id ' + id._id + ', was not found');
                err.status = 404;
                return next(err)
            }
        })
    });

    // ckeck if user already has favorites

    Favorites.findOne({ user: req.user._id})
    .then ((favorite) => {
        if (favorite) {
            // ya existe el usuario
            console.log("usuario ya tiene favoritos", favorite);
            var dishList = []
            req.body.forEach( id => {
                
                // checking for repeat favorite dishes
                if (favorite.dishes.indexOf(id._id) === -1){
                    dishList.push(id._id)
                }
            })
            // all dishes are already inserted
            if (dishList.length === 0){
                err = new Error('All dishes are already inserted');
                err.status = 500;
                return next(err)
            }
            // inserting non repeated favorite dishes
            favorite.update({$push: {dishes: {$each: dishList}}})
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(fav);
            }, (err) => next(err));
            
        }
        else {
            // usser doesnt exit in favorites   
            var dishList = []       
            req.body.forEach(id => {
                dishList.push(id._id);
            })
            console.log('dishList: ', dishList);
            Favorites.create({user: req.user._id ,dishes: dishList})
            .then((favorite) => {
                console.log('Favorite', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favorite);
            }, (err) => next(err));
        }
    });
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    
    Favorites.deleteMany({ user: req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Conten-Type','application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
})

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req,res) => {res.sendStatus(200)})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {

    // check if dish exist
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (!dish) {
            // dish not found respond with error 
            err = new Error('the Dish with id ' + id._id + ', was not found');
            err.status = 404;
            return next(err)
        }
    });

    Favorites.findOne({ user: req.user._id})
    .then((favorite) => {
        if (favorite) {
            //user already has favorites
            favorite.update({$push: {dishes: req.params.dishId }})
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(fav);
            }, (err) => next(err))
            .catch ((err) => next(err));
            
        }
        else {
            // creating the document
            Favorites.create({user: req.user._id ,dishes: req.params.dishId})
            .then((favorite) => {
                console.log('Favorite', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favorite);
            }, (err) => next(err));

        }
    })
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id})
    .then((favorite) => {
        favorite.update({$pull: {dishes: req.params.dishId }})
        .then((fav) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(fav);
        }, (err) => next(err))
        .catch ((err) => next(err));

    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = favoriteRouter;