const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { json, response } = require("express");
const { sign, verify } = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const sendEmail = require("../../mail/emailConfig");

module.exports = {
  createUser: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const CodeVerify = getRandomInt(999999);
    const data = req.body;
    data.email_verification = CodeVerify;

    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    const registertoken = sign({ email: data.email }, process.env.JWT_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES,
    });
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    const message = `<h1>${CodeVerify}</h1>`;
    create(data, (err, results) => {
      if (err) {
        if (err.errno === 1062) {
          return res.status(500).json({
            success: 0,
            errno: 1062,
            message: "Duplicate entry",
          });
        }

        return res.status(500).json({
          success: 0,
          message: "Database connection error!",
        });
      }
      (async () => await sendEmail(data.email, "test", message))();
      return res.status(200).json({
        success: 1,
        data: {
          status: 200,
          user: data,
          token: registertoken,
        },
      });
    });
  },
  EmailValidate: (req, res) => {
    async function update(updatedResult) {
      updateUser(updatedResult, (err, results) => {
        if (err) {
          return res.status(400).send("err");
        }
        if (!results) {
          return res.status(400).send("err");
        }
        return res.status(200).send({
          success: 1,
          message: "Email verified",
        });
      });
    }
    try {
      const email = req.body.email;
      getUserByUserEmail(email, (err, results) => {
        
        if (!results) {
          return res.status(400).send("Invalid Email");
        }
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        const CodeVerify = getRandomInt(999999);
        const updatedResult = results;
        updatedResult.email_verification = CodeVerify;
        update(updatedResult);
        const message = `<h1>${CodeVerify}</h1>`;
        (async () => await sendEmail(email, "Verify your email", message))();
         // const registertoken = sign({ email: email }, process.env.JWT_KEY, {
      //   expiresIn: process.env.TOKEN_EXPIRES,
      // });
      });
    } catch (err) {
      return res.status(400).json({
        success: 0,
        message: err,
      });
    }
  },
  verifyEmail: (req, res) => {
     async function update(updatedResult) {
      updateUser(updatedResult, (err, results) => {
        if (err) {
          return res.status(400).send("err");
        }
        if (!results) {
          return res.status(400).send("err");
        }
        return res.status(200).send({
          success: 1,
          message: "Email verified",
        });
      });
    }
    getUserByUserEmail(req.body.email, (err, results) => {
      if (!results) {
        return res.status(400).send("Invalid link");
      }
      if( req.body.email_verification === results.email_verification){
        results.email_verification = "active";
        const updatedResult = results;
        update(updatedResult);
      }else{
        return res.status(401).send({
          success:0,
        });
      }
      });
   
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found!",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to update user",
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfuly",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        message: "User delete successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Server err!",
          error: err,
        });
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          message: "Unauthorized",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jasontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: process.env.TOKEN_EXPIRES,
        });

        return res.status(200).json({
          success: 1,
          message: "Login is successfully",
          token: jasontoken,
          data: results,
        });
      } else {
        return res.status(403).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
};
