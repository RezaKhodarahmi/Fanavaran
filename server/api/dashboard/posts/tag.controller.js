const { create,get } = require("../posts/tag.service");

module.exports = {
  getTags: (req, res) => {
    get((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad request!",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  createTag: (req, res) => {
    const body = req.body;
    create(body,(err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad request!",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
