const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware=require("../middlewares/jwtMiddleware");
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

router.post("/login", userController.loginUser,jwtMiddleware.generateToken,jwtMiddleware.sendToken);


module.exports = router;