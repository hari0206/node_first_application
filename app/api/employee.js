const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const Employee = require("../models/employee");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname.replace("\\api", "\\"), "/public/uploads"));
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({
  storage: storage
}).single("myImage");

module.exports = {
  createEmployeeUI: (req, res) => {
    res.render("employeeForm");
  },
  createEmployee: (req, res) => {
    upload(req, res, err => {
      if (err) {
        return res.json({
          code: 500,
          data: null,
          error: err,
          message: "Some Error Occurred while uploading photo"
        });
      }
      let { name, email, password, departmentId, dob } = req.body;
      if (name && email && password && departmentId && dob && req.file) {
        let { filename } = req.file;
        bcrypt.hash(password, 10, function(err, hash) {
          if (err) {
            res.json({
              code: 500,
              data: null,
              error: err,
              message: "Some Error Occurred"
            });
          } else {
            new Employee({
              name: name,
              email: email,
              password: hash,
              dob: dob,
              profilePic: `uploads/${filename}`,
              departmentId: departmentId,
              createdOn: new Date(),
              updatedOn: new Date()
            }).save((err, employee) => {
              if (err) {
                res.json({
                  code: 500,
                  data: null,
                  error: err,
                  message: "Some Error Occurred"
                });
              } else {
                res.json({
                  code: 200,
                  data: null,
                  error: null,
                  message: "Successfully Created."
                });
              }
            });
          }
        });
      } else {
        res.json({
          code: 400,
          data: null,
          error: null,
          message: "something is missing"
        });
      }
    });
  },
  EmployeeUI: (req, res) => {
    res.render("employee");
  },
  getEmployee: (req, res) => {
    console.log(req.params)
    Employee.findOne({ _id: req.params._id }, (err, data) => {
      if (err) {
      } else if (data) {
        res.render("employeedata", { data: data });
      } else {
      }
    });
  },
  getEmployeeDetails: (req, res) => 
//   {
//   Employee.find({}, (err, data) => {
    
//     if (err) {
//         res.json({
//             code: 500,
//             data: null,
//             error: err,
//             message: "Some Error Occurred"
//         })
//     } else {
//         res.json({
//             code: 200,
//             data: data,
//             error: null,
//             message: "Data Fetched Successfully."
//         })
//     }
// }).limit(20)
// },
  {
    Employee.aggregate(
      [
        // { $skip: parseInt(req.query.skip) },
        // { $limit: parseInt(req.query.limit) },
        {
          $project: {
            name: 1,
            designation: 1,
            contact: 1,
          }
        }
      ],
      (err, data) => {
        if (err) {
          res.json({
            code: 500,
            data: null,
            error: err,
            message: "Some Error Occurred"
          });
        } else {
          res.json({
            code: 200,
            data: data,
            error: null,
            message: "Successfully Fetched."
          });
        }
      }
    ).limit(50);
  },

  deleteEmployee: (req, res) => {
    if (req.body.employeeId) {
      Employee.deleteOne({ _id: req.body.employeeId }, (err, info) => {
        if (err) {
          res.json({
            code: 500,
            error: err,
            data: null,
            message: "Some Error Occurred."
          });
        } else {
          res.json({
            code: 200,
            error: null,
            data: null,
            message: "Successfully Deleted."
          });
        }
      });
    } else {
      res.json({
        code: 400,
        error: null,
        data: null,
        message: "Something is missing."
      });
    }
  },
  editEmployee: (req, res) => {
    upload(req, res, err => {
      if (err) {
        return res.json({
          code: 500,
          data: null,
          error: err,
          message: "Some Error Occurred while uploading photo"
        });
      } else {
        let { employeeId, name, email, dob, departmentId } = req.body;
        if (employeeId && name && email && dob && departmentId && req.file) {
          Employee.updateOne(
            { _id: employeeId },
            {
              $set: {
                profilePic: `uploads/${req.file.filename}`,
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
                  message: "Some Error Occurred."
                });
              } else {
                res.json({
                  code: 200,
                  error: null,
                  data: null,
                  message: "Successfully Updated."
                });
              }
            }
          );
        } else {
          res.json({
            code: 400,
            error: null,
            data: null,
            message: "Something is missing."
          });
        }
      }
    });
  },
  searchEmployee: (req, res) => {
    // console.log(typeof req.body.text)
    if (req.body.text) {
      Employee.find({
        $or:[
          {
            name: {
              $regex: `^${req.body.text}.*`,
              $options: "i"
            }
          },
          {
            designation: {
              $regex: `^${req.body.hari}.*`,
              $options: "i"
            }
          },
          {
          "$where": `/^${parseInt(req.body.text)}.*/.test(this.contact)`
          }
          // {
          //   contact: {
          //     "$where": `/^${parseInt(req.body.text)}.*/.test(this.contact)`
          //   }
          // }
          // {
          //   contact: {
          //     $regex: `^${req.body.text}.*`,
          //   }
          // }
        ]
      },
        {
          name: 1,
          designation: 1,
          contact: 1,
          dob:1
        },
        (err, data) => {
          if (err) {
            res.json({
              code: 500,
              error: err,
              data: null,
              message: "Some Error Occurred."
            });
          } else {
            res.json({
              code: 200,
              error: null,
              data: data,
              message: "Successfully Fetched."
            });
          }
        }
      ).limit(15);
    } else {
      res.json({
        code: 400,
        error: null,
        data: null,
        message: "Something is missing."
      });
    }
  },


  searchEmployee1: (req, res) => {
    if (req.body.text){
      // return console.log(req.body.text)
      Employee.aggregate([
        {
          $match: {
            name: {
              $regex: `^${req.body.text}.*`,
              $options: "i"
            }
          }
        },
        {
          $group: {
            _id: "$name"
          }
        },
        {
          $project: {
            name: 1
          }
        }
      ],
      )
    }
  }
};

// const contact = 7064.0;
// Employee.find({
//   "$where" : `/^${contact}.*/.test(this.contact)`
// })
// .exec((err, data) => console.log(err, data))

// const req = {
//   body: {
//     text: 'hi',
//     filterDob: {
      
//     }
//   }
// }

// Employee.find({
//   $or: [
//     {
//       name: {
//         $regex: `^${req.body.text}.*`,
//         $options: "i"
//       }
//     },
//     {
//       designation: {
//         $regex: `^${req.body.hari}.*`,
//         $options: "i"
//       }
//     },
//     {
//       "$where": `/^${parseInt(req.body.text)}.*/.test(this.contact)`
//     }
//   ],
//   dob: {
//     $gte: '2019-09-11'
//   }
// },
//   {
//     name: 1,
//     designation: 1,
//     contact: 1,
//     dob: 1
//   },
//   (err, data) => {
//     console.log(err)
//     console.log(data)
//   }
// )