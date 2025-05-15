const pool = require('../services/db');

var furnitureModel = {
    selectAllFurnitures : (callback) => {
     
        //select all furnitures

        const SQLSTATMENT = `SELECT * FROM furniture;`;
        pool.query(SQLSTATMENT, callback);
    },

    selectFurnitureById: (data, callback) => {
 
        //select furniture by furniture id
        const SQLSTATMENT = `
                            SELECT furniture.fid, furniture.name, furniture.description, furniture.price, 
                            furniture.quantity, furniture.catid, category.name as catname
                            FROM furniture INNER JOIN category ON furniture.catid = category.catid where fid = ?
                            `;
        const VALUES = [data.fid];

        pool.query(SQLSTATMENT, VALUES, callback);

    },

    createNewFurniture: (data, callback) => {

        //insert new furniture
        const SQLSTATMENT = `
                            INSERT INTO furniture (name, description, price, quantity, catid)
                            VALUES (?,?,?,?,?);
                            `;
        const VALUES = [data.name, data.description, data.price, data.quantity, data.catid];

        pool.query(SQLSTATMENT, VALUES, callback);

    },
        updateFurnitureById : (data, callback) => {
     
        //update furniture record
        const SQLSTATMENT = `
                            UPDATE furniture
                            SET name=?, description=?, price=?, quantity=?, catid=?
                            WHERE fid=?;
                            `;
        const VALUES = [data.name, data.description, data.price, data.quantity, data.catid, data.fid];

        pool.query(SQLSTATMENT, VALUES, callback);
    },
    deleteFurnitureById : (data, callback) => {
        
        //delete furniture record
        const SQLSTATMENT = `
                            DELETE FROM furniture
                            WHERE fid = ?
                            `;
        const VALUES = [data.fid];

        pool.query(SQLSTATMENT, VALUES, callback);

    }

}

module.exports = furnitureModel;
