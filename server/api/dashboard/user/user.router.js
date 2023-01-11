const router = require("express").Router();
const { checkToken } = require("../../../auth/dashboardToken_validation");
const { body, param } = require("express-validator");
const {
  createUser,
  login,
  getUsers,
  getUserByEmail,
  getUserByUserId,
  updateUser,
  updateUserAvatar,
  deleteUser,
  checkTokenExpired,
} = require("../../dashboard/user/user.controller");

// Create new user
router.post(
  "/create",
  //Validation
  body("user_login").notEmpty().isAlpha().trim(),
  body("email").isEmail().notEmpty().trim(),
  body("email_verification").isAlpha().trim(),
  body("user_nicename")
    .optional({ nullable: true, checkFalsy: true })
    .isString(),
  body("user_status").isNumeric().notEmpty().trim(),
  body("user_url")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .trim(),
  body("role").isNumeric().notEmpty(),
  body("display_name").isAlpha().notEmpty().trim(),
  body("password").isLength({ min: 8 }).notEmpty(),
  checkToken,
  createUser
);
//Login user
router.post(
  "/login",
  //validation
  body("email").isEmail().notEmpty(),
  body("password").notEmpty(),
  login
);
//Check token
router.get(
  "/token",
  //validation
  checkToken,
  checkTokenExpired
);
//Get all recorded user
router.get("/", checkToken, getUsers);
//get user with email
router.get(
  "/email/:email",
  [param("email").exists().isEmail()],
  checkToken,
  getUserByEmail
);
//Get user by ID
router.get(
  "/:id",
  [param("id").exists().isNumeric()],
  checkToken,
  getUserByUserId
);

//Update user email
router.patch(
  "/update",
  body("ID").notEmpty().isNumeric().trim(),
  body("user_login").notEmpty().isAlpha().trim(),
  body("email").notEmpty().isEmail().trim(),
  body("email_verification")
    .isAlpha()
    .trim()
    .optional({ nullable: true, checkFalsy: true }),
  body("user_nicename")
    .isString()
    .trim()
    .optional({ nullable: true, checkFalsy: true }),
  body("user_status").isNumeric().notEmpty(),
  body("user_url")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .trim(),
  body("role").isNumeric().notEmpty(),
  body("display_name").isString().notEmpty(),
  body("password")
    .isLength({ min: 8 })
    .optional({ nullable: true, checkFalsy: true }),
  checkToken,
  updateUser
);

//Update user Avatar
router.patch(
  "/update/profile",
  body("image").notEmpty().isString().trim(),
  body("ID").notEmpty().isNumeric().trim(),
  checkToken,
  updateUserAvatar
);
//Delete user
router.delete(
  "/delete",
  body("ID").notEmpty().isNumeric().trim(),
  checkToken,
  deleteUser
);
module.exports = router;
