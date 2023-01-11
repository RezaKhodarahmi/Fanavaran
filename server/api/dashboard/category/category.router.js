const router = require("express").Router();
const { checkToken } = require("../../../auth/dashboardToken_validation");
const { body } = require("express-validator");
const {
  creteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryWithId,
} = require("./category.controller");

router.post(
  "/create",
  body("title").isString().notEmpty().trim(),
  body("content").optional({ nullable: true, checkFalsy: true }).isString(),
  body("parentId").optional({ nullable: true, checkFalsy: true }).isString(),
  body("slug").isString().notEmpty(),
  checkToken,
  creteCategory
);
router.get("/", checkToken, getAllCategories);
router.get("/:id", checkToken, getCategoryById);
router.patch(
  "/update",
  body("id").isString().notEmpty().trim(),
  body("title").isString().notEmpty().trim(),
  body("content").optional({ nullable: true, checkFalsy: true }).isString(),
  body("parentId").optional({ nullable: true, checkFalsy: true }).isString(),
  body("slug").isString().notEmpty(),
  checkToken,
  updateCategory
);
router.delete(
  "/delete",
  body("id").isString().notEmpty().trim(),
  checkToken,
  deleteCategoryWithId
);
module.exports = router;
