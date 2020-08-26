const Department = require('../models/department');

module.exports = {
    createDepartmentUI: (req, res) => {
        res.render('departmentForm', { user: req.session.user });
    },
    createDepartment: (req, res) => {
        if(req.body.name && req.body.description) {
            new Department({
                name: req.body.name,
                description: req.body.description,
                createdOn: new Date(),
                updatedOn: new Date()
            }).save((err, department) => {
                if(err) {
                    res.json({
                        code: 500,
                        data: null,
                        error: err,
                        message: "Some Error Occurred"
                    })
                } else {
                    res.json({
                        code: 200,
                        data: null,
                        error: null,
                        message: "Successfully Created."
                    })
                }
            });
        } else {
            res.json({
                code: 400,
                data: null,
                error: null,
                message: "something is missing"
            })
        }
    },
    departmentUI: (req, res) => {
        res.render('department')
    },
    getDepartments: (req, res) => {
        Department.find({}, (err, departments) => {
            if (err) {
                res.json({
                    code: 500,
                    data: null,
                    error: err,
                    message: "Some Error Occurred"
                })
            } else {
                res.json({
                    code: 200,
                    data: departments,
                    error: null,
                    message: "Data Fetched Successfully."
                })
            }
        })
    },
    
    deleteDepartment: (req, res) => {
        if (req.body.departmentId) {
            Department.deleteOne({ _id: req.body.departmentId }, (err, info) => {
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
    editDepartment:(req,res) => {
        if (req.body.departmentId && req.body.name && req.body.description) {
            Department.updateOne(
                { _id: req.body.departmentId },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        updatedOn: new Date()
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