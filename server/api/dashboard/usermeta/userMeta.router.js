const router = require("express").Router();
const { checkToken } = require("../../../auth/dashboardToken_validation");

const {
  createMeta,
  UserMeta,
  UpdateMeta,
} = require("../../dashboard/usermeta/userMeta.controller");

router.post("/create-meta/:id", checkToken,createMeta);
router.get("/user-meta/:id", checkToken,UserMeta);
router.patch("/update-meta/:id", checkToken,UpdateMeta);
module.exports = router;
