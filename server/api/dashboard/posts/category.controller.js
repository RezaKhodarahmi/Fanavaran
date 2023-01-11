const {
  get,
  create,
  update,
  single,
  deleteItem,
} = require("../posts/category.service");

module.exports = {
  getCategory: (req, res) => {
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
  createCategory: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
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
  updateCategory: (req, res) => {
    const body = req.body;
    update(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to update post",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfuly",
      });
    });
  },
  getWithId: (req, res) => {
    const body = req.body;
    single(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Bad req",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deleteCategory: (req, res) => {
    const body = req.body;
    deleteItem(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Category not deleted",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Category deleted successfully",
      });
    });
  },
};
