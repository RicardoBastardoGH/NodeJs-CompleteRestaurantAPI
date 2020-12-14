const moongoose = require('mongoose');
const Schema = moongoose.Schema;


const favoriteSchema = new Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },
    dishes: [{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
},{
    timestamps: true
})

var Favorites = moongoose.model('Favorite',favoriteSchema);

module.exports = Favorites;