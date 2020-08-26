const Sales = require('../models/sales');
const path = require('path');


module.exports = {
    salesUI: (req, res) => {
        res.render('sales')
    },

    createSales: (req, res) => {
        // console.log('before......',req.body.cart);
        // console.log('after.........',JSON.parse(req.body.cart));
        let {cart, grandTotal, employeeId} = req.body;
        let cartArray = JSON.parse(cart);
        if(cartArray.length > 0 && grandTotal && employeeId) {
            new Sales({
                employeeId: employeeId,
                cart: cartArray,
                grandTotal: grandTotal,
                createdOn: new Date(),
                updatedOn: new Date()
            }).save((err, data) => {
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
                        data: null,
                        error: null,
                        message: "Successfully Created."
                    })
                }
            })
        } else {
            res.json({
                code: 400,
                data: null,
                error: null,
                message: "something is missing"
            })
        }
    },

    salesItemUI: (req,res) =>
    {
        res.render("salesView")
    },

    salesItem:(req,res) => {
        Sales.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employeeId',
                    foreignField: '_id',
                    as: 'employees'
                }
            },
            {
                $unwind: {
                    path: '$employees',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    cart: 1,
                    grandTotal: 1,
                    quantity: 1,
                    employees: {
                        _id: '$employees._id',
                        name: '$employees.name',
                    }
                }
            },
        ], (err, data) => {
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
                    data: data,
                    error: null,
                    message: "Successfully Fetched."
                })
            }
        })
    },

    deleteSales:(req,res) => {
            if (req.body.salesId) {
                Sales.deleteOne({ _id: req.body.salesId }, (err, info) => {
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

    editSales: (req,res) =>{
        let { salesId } = req.body;
        if (salesId) {
            Sales.updateOne(
                { _id: salesId },
                {
                    $set: {
                        name: name,
                        email: email,
                        dob: dob,
                        departmentId: departmentId,
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