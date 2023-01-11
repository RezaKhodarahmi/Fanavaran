const {
  create,
  getCategories,
  getCategoryByCategoryId,
  updateCategory,
  deleteCategory,
} = require("./category.service");
const { validationResult } = require("express-validator");
module.exports = {
  creteCategory: (req, res) => {
    const data = req.body;

    create(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          error: "bad request",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });
    });
  },
  getAllCategories: (req, res) => {
    getCategories((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          error: "bad request",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getCategoryById: (req, res) => {
    const id = req.params.id;
    getCategoryByCategoryId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          error: "bad request",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  //Update category
  updateCategory: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;


    //Update
    updateCategory(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to update category",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfuly",
      });
    });
  },
  //Delete user with ID
  deleteCategoryWithId: (req, res) => {
    //Check if validation error
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const data = req.body;
    //Delete
    deleteCategory(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "category not deleted",
        });
      }

      return res.status(200).json({
        success: 1,
        message: "category deleted successfully",
      });
    });
  },
};
