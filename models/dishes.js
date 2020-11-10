const moongoose = require('mongoose');
const Schema = moongoose.Schema;
require('mongoose-currency').loadType(moongoose);
const Currency = moongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type:Number,
        min:1,
        max:5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
},{
    timestamps: true
})
const dishSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
},{
    timestamps: true
});

var Dishes = moongoose.model('Dish', dishSchema);

module.exports = Dishes;