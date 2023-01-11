const router = require("express").Router();
const { checkToken } = require("../../../auth/dashboardToken_validation");
const { body } = require("express-validator");
const {
  creteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCoureWithId,
} = require("./course.controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/courses");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/create",
  upload.single("image"),
  body("title").isString().notEmpty().trim(),
  body("description").optional({ nullable: true, checkFalsy: true }).isString(),
  body("regular_price").isNumeric().notEmpty(),
  body("member_price").isNumeric().notEmpty(),
  body("status").notEmpty().isNumeric(),
  body("type").notEmpty().isNumeric(),
  body("img").optional({ nullable: true, checkFalsy: true }).isString(),
  body("retake").notEmpty().isNumeric(),
  body("rate").notEmpty().isNumeric(),
  body("accessable_lifetime")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric(),
  body("start_date").optional({ nullable: true, checkFalsy: true }).isDate(),
  body("end_date").optional({ nullable: true, checkFalsy: true }).isDate(),
  body("members_access").notEmpty().isNumeric(),
  body("duration_info")
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .trim(),
  body("created_at").optional({ nullable: true, checkFalsy: true }).isString(),
  checkToken,
  creteCourse
);
router.get("/", checkToken, getAllCourses);
router.get("/:id", checkToken, getCourseById);
router.patch(
  "/update",
  upload.single("images"),
  body("id").isString().notEmpty().trim(),
  body("title").isString().notEmpty().trim(),
  body("description").optional({ nullable: true, checkFalsy: true }).isString(),
  body("regular_price").isNumeric().notEmpty(),
  body("member_price").isNumeric().notEmpty(),
  body("status").notEmpty().isNumeric(),
  body("type").notEmpty().isNumeric(),
  body("img").optional({ nullable: true, checkFalsy: true }).isString(),
  body("retake").notEmpty().isNumeric(),
  body("rate").notEmpty().isNumeric(),
  body("accessable_lifetime")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric(),
  body("start_date").optional({ nullable: true, checkFalsy: true }).isDate(),
  body("end_date").optional({ nullable: true, checkFalsy: true }).isDate(),
  body("members_access").notEmpty().isNumeric(),
  body("duration_info")
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .trim(),
  body("updated_at").optional({ nullable: true, checkFalsy: true }).isString(),
  checkToken,
  updateCourse
);
router.delete(
  "/delete",
  body("id").isString().notEmpty().trim(),
  checkToken,
  deleteCoureWithId
);
module.exports = router;
