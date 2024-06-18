const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    photo_url: {
        type:String
    },
    fav_recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
    password: {
        type:String,
        required:true
    }
},{timestamps: true});

UserSchema.index({ fav_recipes: 1 });

UserSchema.statics.register = async function (name,email,password,photo_url) {
    let emailExits = await this.findOne({email});
    if(emailExits) {
        throw new Error('Email is alredy exists!');
    }
    
    let salt = await bcrypt.genSalt();
    let hashPassword = await bcrypt.hash(password,salt);

    let user = await this.create({name,email,password:hashPassword,photo_url});
    return user;   
}

UserSchema.statics.login = async function (email,password) {
    let user = await this.findOne({email});
    if(!user){
        throw new Error("Email isn't exists");
    }
    let isPsCompare = await bcrypt.compare(password,user.password);
    if(!isPsCompare){
        throw new Error("Password is incorrect");
    }    
    return user;   
}

module.exports = mongoose.model('User',UserSchema);