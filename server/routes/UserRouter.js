const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const { authMiddleWare,authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.post("/add",authMiddleWare, userController.add);
router.put("/update/:id",authMiddleWare, userController.update);
router.delete("/delete/:id", authMiddleWare, userController.deleteUser);
router.get("/getAll", authMiddleWare, userController.getAll);
router.get("/getUser/:id", authAdminMiddleWare, userController.getDetailUser);
router.post("/refresh-token", userController.refreshToken)

module.exports = router;    
