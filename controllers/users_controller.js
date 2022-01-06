const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.signIn = async function(req, res){
    try{
        let user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if(!user){
            return res.status(200).json({
                message: "User Not Found"
            });
        }
        let token = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.PRIVATE_KEY, {
            expiresIn: "1h"
        });
        return res.status(200).json({
            message: "User Found",
            user: user,
            token: token
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({message: "Internal Server Error"});
    }
}

module.exports.signUp = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            console.log(user);
            return res.status(200).json({
                message: "User Already Exists"
            });
        }

        user = await User.create({
            email: req.body.email,
            password: req.body.password
        });

        return res.status(200).json({
            message: "User Created",
            user: user
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Internal Server Error"
        })
    }
}

