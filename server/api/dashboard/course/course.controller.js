const {
  create,
  getCourses,
  getCourseByCourseId,
  updateCourse,
  deleteCoure,
} = require("./course.service");
const { validationResult } = require("express-validator");
module.exports = {
  creteCourse: (req, res) => {
    const data = req.body;
    var image ="";

    if (req.file) {
      image = process.env.BASE_URL + req.file.path;
    }
    create(data,image, (err, results) => {
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
  getAllCourses: (req, res) => {
    getCourses((err, results) => {
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
  getCourseById: (req, res) => {
    const id = req.params.id;
    getCourseByCourseId(id, (err, results) => {
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
  //Update course
  updateCourse: (req, res) => {
    //Check if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    var image = req.body.image;

    if (req.file) {
      image = process.env.BASE_URL + req.file.path;
    }
    //Update
    updateCourse(body, image, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to update course",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfuly",
      });
    });
  },
  //Delete user with ID
  deleteCoureWithId: (req, res) => {
    //Check if validation error
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const data = req.body;
    //Delete
    deleteCoure(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Course not deleted",
        });
      }

      return res.status(200).json({
        success: 1,
        message: "Course deleted successfully",
      });
    });
  },
};
