const { createUser ,getUserByUserId,getUsers,EmailValidate,deleteUser,updateUser,login,verifyEmail} = require("./user.controller");
const router = require('express').Router();
const {checkToken} = require('../../auth/token_validation');
const { body } = require('express-validator');


router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUserByUserId);
router.post("/create",
//validation
body('user_login').notEmpty().isAlpha(),
body('email').isEmail().notEmpty(),
body('password').isLength({ min: 5 }).notEmpty(),
createUser);
router.post("/verify",checkToken,verifyEmail);
router.post("/validate",checkToken,EmailValidate);
router.patch("/update",checkToken,updateUser);
router.delete("/delete",checkToken,deleteUser);

router.post("/login",
body('email').isEmail(),
body('password').isLength({ min: 5 })
,login);

module.exports = router;