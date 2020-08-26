const bcrypt = require('bcryptjs');

const Users = require('../models/user');

module.exports = {
    signupUI: function (req, res) {
        res.render('signup', { message: null })
    },
    loginUI: function (req, res) {
        res.render('login', { message: '' })
    },
    signup: function (req, res) {
        if (req.body.email && req.body.name && req.body.password) {
            Users.findOne({ email: req.body.email }, function (err, userData) {
                if (err) {
                    console.log(err);
                } else if (userData) {
                    res.render('signup', { message: 'User Already Exist.' })
                } else {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if(err) {
                            console.log(err);
                        } else {
                            new Users({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                age: req.body.age,
                                phoneNumber: req.body.phoneNumber
                            }).save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    req.session.user = {
                                        name: req.body.name,
                                        email: req.body.email,
                                        age: req.body.age,
                                        phoneNumber: req.body.phoneNumber
                                    };
                                    res.render('dashboard', {
                                        name: req.body.name,
                                        email: req.body.email,
                                        password: hash,
                                        age: req.body.age,
                                        phoneNumber: req.body.phoneNumber
                                        // name: user.name,
                                        // email: user.email,
                                        // age: user.age,
                                        // phoneNumber: user.phoneNumber
                                    })
                                    
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.render('signup', { message: 'Something is missing.' })
        }
    },
    login: function (req, res) {
        if (req.body.email && req.body.password) {
            Users.findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) {
                    res.render('login', { message: 'Some Error Occurred.' })
                } else if (user) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (!err && result == true) {
                            req.session.user = {
                                name: user.name,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                age: user.age
                            };
                            res.redirect("/dashboard");
                        } else {
                            res.render('login', { message: 'Password Did Not Match.' });
                        }
                    });
                } else {
                    res.render('login', { message: 'User Not Found.' });
                }
            })
        } else {
            res.render('login', { message: 'Something is missing.' })
        }
    },
    logout: function (req, res) {
        req.session.user = null;
        res.redirect('/');
        // res.session.user.destroy(function(err){
        //     res.redirect('/');
        // })
    }
}