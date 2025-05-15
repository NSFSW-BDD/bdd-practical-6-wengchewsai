// const model = require('../models/categoryModel');
const categoryModel = require('../models/categoryModel');


var categoryController={

    selectAllCategories: (req, res) => 
    {
       const callback = (error, results, fields) => {
           if (error) {
            console.log("Select all categories error");
               console.error("Error selectAllCategories:", error);
               res.status(500).json(error);
           }  
           else res.status(200).json(results);
       }

       categoryModel.selectAllCategories(callback);

    },
    selectCategoryById: (req, res) => {

      const data = {
        catid: req.params.catid
      }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectCategoryById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Category not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

      categoryModel.selectCategoryById(data, callback);
    },
    createNewCategory: (req, res) => {

        const data = {
        name: req.body.name,
        description: req.body.description,
        }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewCategory:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    categoryModel.createNewCategory(data, callback);

      },
      updateCategoryById : (req, res) =>
        {
           
        const data = {
          catid: req.params.catid,
          name: req.body.name,
          description: req.body.description
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateCategoryById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Category not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    categoryModel.updateCategoryById(data, callback);

    },
    deleteCategoryById : (req, res) => {
          const data = {
                catid: req.params.catid
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteCategoryById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Category not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    categoryModel.deleteCategoryById(data, callback);

    }
    }
      module.exports=categoryController;
