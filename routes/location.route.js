module.exports = app =>{
    const location= require("../controllers/location.controller");

    var router = require("express").Router();

    router.post('/',location.create);

    router.get('/',location.getlocation);

    router.get('/:id',location.getid);

    router.patch('/',location.UpdateByID);

    router.delete('/:id',location.ReomveByID);

    app.use('/location' ,router);
};