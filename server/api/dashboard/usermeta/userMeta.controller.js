//Use service
const {
  create,
  getUserMeta,
  updateUserMeta,
} = require("../../dashboard/usermeta/userMeta.service");
//Use express validation for show error message
const { validationResult } = require("express-validator");

module.exports = {
  createMeta: (req, res) => {
    // Create new user meta
    const data = req.body;
    const userid = req.params.id;
    let newmeta = [];
    // Push data in array
    var result = Object.keys(data).map((key) => [String(key), data[key]]);
    for (var key in result) {
      newmeta.push([
        (newmeta["user_id"] = userid),
        (newmeta["meta_key"] = result[key][0]),
        (newmeta["meta_value"] = result[key][1]),
      ]);
    }
    try {
      // Create new meta
      create(newmeta, userid, (err, results) => {
        if (err) {
          return res.status(500).json({
            status: 0,
            message: err.message,
          });
        }
        if (results === 0) {
          return res.status(400).json({
            status: 0,
            errno: 1062,
          });
        }
        if (!results) {
          return res.status(400).json({
            status: 0,
            message: "error",
          });
        }

        return res.status(200).json({
          status: 1,
          data: newmeta,
        });
      });
    } catch (err) {
      return res.status(500).json({
        status: 0,
        message: err.message,
      });
    }
  },
  // Get user meta
  UserMeta: (req, res) => {
    const ID = req.params.id;
    getUserMeta(ID, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  // Update user meta
  UpdateMeta: (req, res) => {
    const data = req.body;
    const userid = req.params.id;
    const oldData = Object.keys(data).map((key) => [String(key), data[key]]);
    const updated = [];
    for (var key in oldData) {
      updated.push({
        user_id: userid,
        meta_key: oldData[key][0],
        meta_value: oldData[key][1],
      });
    }

    try {
      for (var key in updated) {
        updateUserMeta(updated[key], (err, results) => {
          if (err) {
            return res.status(500).json({
              status: 0,
              message: err.message,
            });
          }
          if (!results) {
            return res.status(400).json({
              status: 0,
              message: "error",
            });
          }
        });
      }
      return res.status(200).json({
        status: 1,
      });
    } catch (err) {
      return res.status(500).json({
        status: 0,
        message: err.message,
      });
    }
  },
};
