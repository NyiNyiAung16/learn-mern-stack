const jwt = require('jsonwebtoken');
const User = require('../model/User');

const AuthMiddleware = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET_KEY,(err,decodedValue) => {
            if(err) {
                return res.status(401).json({msg: 'unauthenticated'}) 
            }else{
                User.findById(decodedValue._id).then((user) => {
                    req.user = user;
                    req.user.password = null;
                    next();
                });
            }
        });
    }else {
        return res.status(400).json({msg: 'Token need to be provided'});
    }
};

module.exports = AuthMiddleware;