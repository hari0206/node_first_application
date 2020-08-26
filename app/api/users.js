const Users = require('../models/user');

module.exports = {
    getUsers: (req, res) => {
        Users.find({ }, (err, users) => {
            if(err) {
                res.json({
                    code: 500,
                    error: err,
                    data: null,
                    message: 'Some Error Occurred.'
                });
            } else {
                res.json({
                    code: 200,
                    error: null,
                    data: users,
                    message: 'Successful.'
                });
            }
        });
    },
    deleteUser: (req, res) => {
        if(req.body.userId) {
            Users.deleteOne({_id: req.body.userId}, (err, info) => {
                if(err) {
                    res.json({
                        code: 500,
                        error: err,
                        data: null,
                        message: 'Some Error Occurred.'
                    });
                } else {
                    res.json({
                        code: 200,
                        error: null,
                        data: null,
                        message: 'Successfully Deleted.'
                    });
                }
            });
        } else {
            res.json({
                code: 400,
                error: null,
                data: null,
                message: 'Something is missing.'
            });
        }
    },
    editUser: (req, res) => {
        if (req.body.userId && req.body.name && req.body.email) {
            Users.updateOne(
                {_id: req.body.userId},
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email
                    }
                },
                (err, info) => {
                    if (err) {
                        res.json({
                            code: 500,
                            error: err,
                            data: null,
                            message: 'Some Error Occurred.'
                        });
                    } else {
                        res.json({
                            code: 200,
                            error: null,
                            data: null,
                            message: 'Successfully Updated.'
                        });
                    }
                }
            )
        } else {
            res.json({
                code: 400,
                error: null,
                data: null,
                message: 'Something is missing.'
            });
        }
    }
}
