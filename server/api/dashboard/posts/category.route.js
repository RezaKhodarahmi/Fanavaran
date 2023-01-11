const router = require("express").Router();
const {
  getCategory,
  createCategory,
  updateCategory,
  getWithId,
  deleteCategory,
} = require("./category.controller");
const { body } = require("express-validator");

const { checkToken } = require("../../../auth/dashboardToken_validation");

router.get("/", checkToken, getCategory);
router.post(
  "/create",
  body("title").notEmpty().trim(),
  body("metaTitle").notEmpty().trim(),
  body("content").optional({ nullable: true, checkFalsy: true }).trim(),
  checkToken,
  createCategory
);
router.patch("/update", checkToken, updateCategory);
router.get("/single", checkToken, getWithId);
router.delete("/delete", checkToken, deleteCategory);

module.exports = router;
