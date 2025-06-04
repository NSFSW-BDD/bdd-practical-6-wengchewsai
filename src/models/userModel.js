const pool = require('../services/db');

var userModel = {
    selectAllUsers: (callback) => {
     
        //select all users

        const SQLSTATMENT = `SELECT * FROM user;`;
        pool.query(SQLSTATMENT, callback);
    },

    selectUserById: (data, callback) => {
 
        //select user by user id
        const SQLSTATMENT = `
                            SELECT * FROM user
                            WHERE userid = ?;
                            `;
        const VALUES = [data.userid];

        pool.query(SQLSTATMENT, VALUES, callback);

    },

    createNewUser: (data, callback) => {

        //insert new user record
        const SQLSTATMENT = `
                            INSERT INTO user (username, email,role,password)
                            VALUES (?,?,?,?);
                            `;
        const VALUES = [data.username, data.email,data.role,data.password];

        pool.query(SQLSTATMENT, VALUES, callback);

    },
    updateUserById : (data, callback) => {
     
        //update user record
        const SQLSTATMENT = `
                            UPDATE user
                            SET email=?, username=?
                            WHERE userid=?;
                            `;
        const VALUES = [data.email, data.username, data.userid];

        pool.query(SQLSTATMENT, VALUES, callback);
    },

    deleteUserById : (data, callback) => {
        
        //delete user record
        const SQLSTATMENT = `
                            DELETE FROM user
                            WHERE userid = ?
                            `;
        const VALUES = [data.userid];

        pool.query(SQLSTATMENT, VALUES, callback);

    },
        //authetication
   loginUser: (data, callback) => {

        const SQLSTATMENT = `select * from user where email=?`;

        // const VALUES = [data.email, data.password];
        const VALUES = [data.email];

        pool.query(SQLSTATMENT, VALUES, callback);

    },
        registerUser: (data, callback) => {

        //insert new user record
        const SQLSTATMENT = `
                            INSERT INTO user (username, email,role,password)
                            VALUES (?,?,?,?);
                            `;
        const VALUES = [data.username, data.email, data.role,data.password];

        pool.query(SQLSTATMENT, VALUES, callback);

    },
       checkUsernameOrEmailExist: (data, callback) => {

        const SQLSTATMENT = `select * from user where username=? or email=?`;

        const VALUES = [data.username, data.email];

        pool.query(SQLSTATMENT, VALUES, callback);

    }
}

module.exports = userModel;
