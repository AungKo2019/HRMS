module.exports = app =>{
    const regions= require("../controllers/regions.controller");

    var router = require("express").Router();

    router.post('/',regions.create);

    router.get('/',regions.getJob);

    router.get('/:id',regions.getJobid);

    router.patch('/',regions.UpdateByID);

    router.delete('/:id',regions.ReomveByID);

    app.use('/regions' ,router);
};