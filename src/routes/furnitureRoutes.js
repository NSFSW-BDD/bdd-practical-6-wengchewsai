const express = require('express');
const router = express.Router();

// const express = require("express");
const furnitureController = require("../controllers/furnitureController");

// const router = express.Router();

router.get('/', furnitureController.selectAllFurnitures);
router.post('/', furnitureController.createNewFurniture);

router.get('/:fid', furnitureController.selectFurnitureById);
router.put('/:fid', furnitureController.updateFurnitureById);
router.delete('/:fid', furnitureController.deleteFurnitureById);

// module.exports = router;

module.exports = router;