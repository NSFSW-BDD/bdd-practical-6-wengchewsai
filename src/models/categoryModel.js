const pool = require('../services/db');

var categoryModel = {
    selectAllCategories : (callback) => {
     
        //select all categories

        const SQLSTATMENT = `SELECT * FROM category;`;
        pool.query(SQLSTATMENT, callback);
    },

    selectCategoryById: (data, callback) => {
 
        //select category by category id
        const SQLSTATMENT = `
                            SELECT * FROM category
                            WHERE catid = ?;
                            `;
        const VALUES = [data.catid];

        pool.query(SQLSTATMENT, VALUES, callback);

    },

    createNewCategory: (data, callback) => {

        //insert new category
        const SQLSTATMENT = `
                            INSERT INTO category (name, description)
                            VALUES (?,?);
                            `;
        const VALUES = [data.name, data.description];

        pool.query(SQLSTATMENT, VALUES, callback);

    },
updateCategoryById : (data, callback) => {
     
        //update category record
        const SQLSTATMENT = `
                            UPDATE category
                            SET name=?, description=?
                            WHERE catid=?;
                            `;
        const VALUES = [data.name, data.description, data.catid];

        pool.query(SQLSTATMENT, VALUES, callback);
    },
deleteCategoryById : (data, callback) => {
        
        //delete category record
        const SQLSTATMENT = `
                            DELETE FROM category
                            WHERE catid = ?
                            `;
        const VALUES = [data.catid];

        pool.query(SQLSTATMENT, VALUES, callback);

    }

}

module.exports = categoryModel;
