const userModel = require("../models/userModel");


var userController={
   selectAllUsers: (req, res, next) =>
   {
       const callback = (error, results, fields) => {
           if (error) {
            console.log("Read all user error");
               console.error("Error readAllUser:", error);
               res.status(500).json(error);
           }  
           else res.status(200).json(results);
       }

       userModel.selectAllUsers(callback);
   },
   selectUserById : (req, res, next) =>
{
    const data = {
        userid: req.params.userid
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    userModel.selectUserById(data, callback);
},
createNewUser : (req, res, next) =>
{
 

    const data = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    userModel.createNewUser(data, callback);
},
updateUserById : (req, res, next) =>
{

    const data = {
        userid: req.params.userid,
        username: req.body.username,
        email: req.body.email,
        role : req.body.role,
        password : req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    userModel.updateUserById(data, callback);
},
    deleteUserById : (req, res, next) =>
{
    const data = {
        userid: req.params.userid
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    userModel.deleteUserById(data, callback);
},
loginUser: (req, res, next) => {

    const data = {

      email: req.body.email,

      password: req.body.password

    };

    const callback = (error, results, fields) => {

      if (error) {

        console.error("Error Login:", error);

        res.status(500).json(error);

      } else {

        if (results.length == 0) {//no match 

          res.status(404).json({

            message: "user not found",

          });

        } else { //match email

          res.locals.userid = results[0].userid;//saves userid from database in res.locals for use in jwt payload

          res.locals.role = results[0].role;  //saves role from database in res.locals for use in jwt payload

          res.locals.hash = results[0].password // save hash password from DB

          next(); //call next middleware to issue token

        }

      }

    };

    userModel.loginUser(data, callback);

  },
  register : (req, res, next) =>
{
 

    const data = {
        username: req.body.username,
        email: req.body.email,
        role: "member",
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register user:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    userModel.registerUser(data, callback);
},
checkUsernameOrEmailExist : (req, res, next) => {

    const data = {

      username: req.body.username,

      email: req.body.email

    };

    const callback = (error, results, fields) => {

      if (error) {

        console.error("Error no email ", error);

        res.status(500).json(error);

      } else {

        if (results.length == 0) {//no match 

            res.locals.username = data.username;//saves username in res.locals for use in jwt payload

            res.locals.email =  data.email;  //saves email in res.locals for use in jwt payload
          
            next(); //call next middleware to hash password
          ;

        } else { //match email and user name found

            res.status(400).json({

            message: "email/username exist",

          });
        //   next(); //call next middleware to issue token

        }

      }

    };

    userModel.checkUsernameOrEmailExist(data, callback);

  }

}

module.exports=userController;

