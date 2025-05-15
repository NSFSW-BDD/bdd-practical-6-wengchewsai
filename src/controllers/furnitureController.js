// const model = require('../models/furnitureModel');

const furnitureModel = require('../models/furnitureModel');


var furnitureController={

    selectAllFurnitures: (req, res) => 
    {
       const callback = (error, results, fields) => {
           if (error) {
            console.log("Select all furnitures error");
               console.error("Error selectAllFurnitures:", error);
               res.status(500).json(error);
           }  
           else res.status(200).json(results);
       }

       furnitureModel.selectAllFurnitures(callback);

    },
    selectFurnitureById: (req, res) => {

      const data = {
        fid: req.params.fid
      }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectFurnitureById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Furniture not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

      furnitureModel.selectFurnitureById(data, callback);
    },
    createNewFurniture: (req, res) => {

        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            catid: req.body.catid
            }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewFurniture:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    furnitureModel.createNewFurniture(data, callback);

      },
      updateFurnitureById : (req, res) =>
        {
           
        const data = {
            fid: req.params.fid,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            catid: req.body.catid
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateFurnitureById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Furniture not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    furnitureModel.updateFurnitureById(data, callback);

    },
    deleteFurnitureById : (req, res) => {
          const data = {
                fid: req.params.fid
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteFurnitureById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Furniture not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    furnitureModel.deleteFurnitureById(data, callback);

    }
    }
    
    module.exports=furnitureController;
