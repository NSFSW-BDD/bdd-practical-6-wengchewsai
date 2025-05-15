const express = require('express');
const router = express.Router();

// const express = require("express");
const categoryController = require("../controllers/categoryController");

// const router = express.Router();

router.get('/', categoryController.selectAllCategories);
router.post('/', categoryController.createNewCategory);

router.get('/:catid', categoryController.selectCategoryById);
router.put('/:catid', categoryController.updateCategoryById);
router.delete('/:catid', categoryController.deleteCategoryById);

// module.exports = router;

module.exports = router;