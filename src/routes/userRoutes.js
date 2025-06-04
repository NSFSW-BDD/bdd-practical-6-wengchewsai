const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware=require("../middlewares/jwtMiddleware");
const bcryptMiddleware=require("../middlewares/bcryptMiddleware");
const router = express.Router();


// module.exports = router;
// const express = require("express");
// const userController = require("../controllers/userController");

// const router = express.Router();

router.get("/",jwtMiddleware.verifyToken,jwtMiddleware.verifyAdmin, userController.selectAllUsers);
router.get('/', userController.selectAllUsers);
router.post('/', userController.createNewUser);

router.get('/:userid', userController.selectUserById);
router.put('/:userid', userController.updateUserById);
router.delete('/:userid', userController.deleteUserById);

// router.post("/login", userController.loginUser,jwtMiddleware.generateToken,jwtMiddleware.sendToken);
router.post("/login", userController.loginUser, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;