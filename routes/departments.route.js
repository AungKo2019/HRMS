module.exports = app =>{
    const department= require("../controllers/departments.controller");
    const {checkToken}= require("../strategies/token_validation");

    var router = require("express").Router();

    router.post('/',checkToken,department.create);

    router.get('/',checkToken,department.getDepartment);

    router.get('/:depid',checkToken,department.getDepid);

    router.patch('/',checkToken,department.UpdateByID);

    router.delete('/:depid',checkToken,department.ReomveByID);

    router.post('/login',department.login);

    app.use('/department' ,router);
};