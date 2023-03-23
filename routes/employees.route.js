const passport = require("passport");

module.exports = app =>{
    const employees= require("../controllers/employees.controller");

    var router = require("express").Router();


    router.post('/',passport.authenticate('local'),employees.create);

    router.get('/',passport.authenticate('local'), employees.getEmployee);

    router.get('/:id',passport.authenticate('local'),employees.getEmpid);

    router.patch('/',passport.authenticate('local'),employees.UpdateByID);

    router.delete('/:id',passport.authenticate('local'),employees.ReomveByID);

    app.use('/employees' ,router);
};