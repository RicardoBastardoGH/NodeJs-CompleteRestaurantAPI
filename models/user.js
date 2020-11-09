var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// no se añade username ni password porque estos son agregados
// automaticamente por el passport-local-mongoose

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});
// da soporte a username y password con hash y salt y otro metodos de autenticacion
User.plugin(passportLocalMongoose);

var Users = mongoose.model( 'User', User);
module.exports = Users;