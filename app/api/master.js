const Master = require('../models/master')
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname.replace('\\api', '\\'), "/public/uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
}).single('myImage'); 

module.exports = {
    createMasterUI: (req, res) =>{
        res.render('masterForm');
    },

    MasterUI: (req,res) =>{
        res.render('masterList');
    },

    createItem: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                return res.json({
                    code: 500,
                    data: null,
                    error: err,
                    message: "Some Error Occurred while uploading photo"
                });
            }
            if (req.body.name && req.body.description && req.body.price && req.file) {
                let { filename } = req.file;
                new Master({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    itemImage: `uploads/${filename}`,
                    createdOn: new Date(),
                    updatedOn: new Date()
                }).save((err, master) => {
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
                });
            } else {
                res.json({
                    code: 400,
                    data: null,
                    error: null,
                    message: "something is missing"
                })
            }
        });
    },

    getItem: (req, res) => {
        Master.find({}, (err, masters) => {
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
                    data: masters,
                    error: null,
                    message: "Data Fetched Successfully."
                })
            }
        })
    },

    deleteItem:(req,res) => {
        if (req.body.masterId) {
            Master.deleteOne({_id: req.body.masterId },(err,info) => {
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
    editItem: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                return res.json({
                    code: 500,
                    data: null,
                    error: err,
                    message: "Some Error Occurred while uploading photo"
                });
            } else {
                let { masterId, name, description, price} = req.body;
                if (masterId && name && description && price) {
                    let condition = {}
                    if(req.file) {
                        condition = {
                            itemImage: `uploads/${req.file.filename}`,
                            name: name,
                            description: description,
                            price: price,
                            updatedOn: new Date()
                        }
                    } else {
                        condition = {
                            name: name,
                            description: description,
                            price: price,
                            updatedOn: new Date()
                        }
                    }
                    Master.updateOne(
                        { _id: masterId },
                        {
                            $set: condition
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
        })
    }
}