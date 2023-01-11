const router = require("express").Router();
const { checkToken } = require("../../../auth/dashboardToken_validation");
const { body } = require("express-validator");
const { getTags, createTag } = require("./tag.controller");

router.post(
  "/create",
  body("title").notEmpty().trim(),
  body("metaTitle").notEmpty().trim(),
  body("slug").notEmpty().trim(),
  body("content").optional({ nullable: true, checkFalsy: true }).trim(),
  checkToken,
  createTag
);
router.get("/", checkToken, getTags);
module.exports = router;
