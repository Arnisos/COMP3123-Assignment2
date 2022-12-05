const { Validator } = require("node-input-validator")

const User = require("../models/Users")

/*
{
    "user_name": "Arnur",
    "email": "arnur@mail.ru",
    "password": 12345
}
*/

exports.signup = async (req, res) => {
    const v = new Validator(req.body, {
        user_name: 'required|minLength:2|maxLength:100',
        password: 'required'
    });

    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
    try{
        const newUser = new User({
        user_name: req.body.user_name,
        password: req.body.password
    })
    let userData = await newUser.save();
    return res.status(200).send({
        message: 'User successfully registered',
        data: userData
    })}
    catch(err){
        return res.status(400).send({
        message: err.message,
        data: err
    })}

    
}

exports.login = async (req, res) => {
    const v = new Validator(req.body, {
        user_name:'required',
        password: 'required'
    });

    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
    try{
        const userData =  await User.find({
            "user_name":req.body.user_name,
            "password":req.body.password
            })
            if(!userData.length == 0){
                res.status(200).send({
                    message: 'User successfully logged in',
                    })
            }
            else{
                res.status(400).send({
                    status: false,
                    message: 'Login or password incorrect',
                     
                })
            }
        }

    catch(err){
        return res.status(400).send({
                    message: err.message,
                    data: err
                })
    }
}
