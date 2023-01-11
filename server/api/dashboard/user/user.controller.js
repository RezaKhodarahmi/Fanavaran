//Use service
const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
  getUserByUserEmail,
} = require("../../dashboard/user/user.service");


//User Meta service
const { deleteUserMeta } = require("../../dashboard/usermeta/userMeta.service");
//Use bcrypt for hash password
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { json, response } = require("express");
//Use JWT token
const { sign } = require("jsonwebtoken");
//Use express validation for show error message
const { validationResult } = require("express-validator");

module.exports = {
  //Create new user
  createUser: (req, res) => {

    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    //Hash password
    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    //Create user
    create(data, (err, results) => {

      if (err) {
        
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage,
          errNumber:err.errno
        });
       
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad request",
        });
      }
      return res.status(200).json({
        success: 1,
        status: 200,
        user: data,
      });
    });
  },
  //Get single user by email
  getUserByEmail: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.params.email;
    //Get single user
    getUserByUserEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "User not found",
        });
      }
      results.password = undefined;
      return res.status(200).json({
        status: 1,
        user: results,
      });
    });
  },
  //Get single user by ID
  getUserByUserId: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    //Get single user
    getUserByUserId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found!",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  //Get all users
  getUsers: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Get users
    getUsers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to get users",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  //Update user
  updateUser: (req, res) => {
    
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
   if(body.password){
     //Hash Password
     const salt = genSaltSync(10);
     body.password = hashSync(body.password, salt);
   }
    //Update
    updateUser(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to update user",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfuly",
      });
    });
  },
    //Update user avatar
    updateUserAvatar: (req, res) => {
    
      //Check if validation error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const body = req.body;
    
      //Update
      updateUserProfile(body, (err, results) => {
        if (err) {
          return res.status(500).json({
            success: 0,
            message: err.message,
          });
        }
        if (!results) {
          return res.status(400).json({
            success: 0,
            message: "Failed to update avatar",
          });
        }
        return res.status(200).json({
          success: 1,
          message: "Updated successfuly",
        });
      });
    },
  
  //Delete user with ID
  deleteUser: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    //Delete
    deleteUser(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "User not deleted",
        });
      }
      //Delete user meta with user
      deleteUserMeta(data.ID, (err, results) => {
        if (err) {
          return res.status(500).json({
            success: 0,
            message: err.message,
          });
        }
        if (!results) {
          return res.status(400).json({
            success: 0,
            message: "User not deleted",
          });
        }
      });
      return res.status(200).json({
        success: 1,
        message: "User delete successfully",
      });
    });
  },
  //login controller
  login: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    //get users
    getUserByUserEmail(body.email, (err, results) => {
      // If any errors
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Server err!",
          error: err,
        });
      }
      //If uder not found
      if (!results) {
        return res.status(401).json({
          success: 0,
          message: "Unauthorized",
        });
      }
      //Check if user role is admin
      if (results.role === 1) {
        //Compare user password with recorded data
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jasontoken = sign(
            { result: results },
            process.env.DASHBOARD_JWT_KEY,
            {
              expiresIn: process.env.DASHBOARD_TOKEN_EXPIRES,
            }
          );

          return res.status(200).json({
            success: 1,
            message: "Login is successfully",
            token: jasontoken,
            data: results,
          });
        } else {
          return res.status(400).json({
            success: 0,
            message: "Wrong Password",
          });
        }
      } else {
        return res.status(403).json({
          success: 0,
          message: "Forbidden!",
        });
      }
    });
  },
  checkTokenExpired: (req, res) => {
    return res.status(200).json({
      success: 1
    });
    
  }
};
