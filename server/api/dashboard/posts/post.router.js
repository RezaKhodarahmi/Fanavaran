const router = require("express").Router();
const { checkToken } = require("../../../auth/dashboardToken_validation");
const { body } = require("express-validator");
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getWithId,
} = require("./post.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/create",
  body("title").notEmpty().trim(),
  body("metaTitle").notEmpty().trim(),
  body("slug").notEmpty().trim(),
  body("keywords").optional({ nullable: true, checkFalsy: true }).trim(),
  body("summary").optional({ nullable: true, checkFalsy: true }).trim(),
  body("published").notEmpty().isBoolean(),
  body("content").optional({ nullable: true, checkFalsy: true }).trim(),
  upload.single("image"),
  checkToken,
  createPost
);
router.get("/", checkToken, getAllPosts);
router.patch(
  "/update",
  body("title").notEmpty().trim(),
  body("metaTitle").notEmpty().trim(),
  body("keywords").optional({ nullable: true, checkFalsy: true }).trim(),
  body("summary").optional({ nullable: true, checkFalsy: true }).trim(),
  body("published").notEmpty().isBoolean(),
  body("content").optional({ nullable: true, checkFalsy: true }).trim(),
  upload.single("image"),
  checkToken,
  updatePost
);
router.delete("/delete", checkToken, deletePost);
router.get("/single/:id", checkToken, getWithId);
module.exports = router;
