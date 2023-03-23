module.exports = app =>{
    const country= require("../controllers/countries.controller");

    var router = require("express").Router();

    router.post('/',country.create);

    router.get('/',country.getJob);

    router.get('/:id',country.getJobid);

    router.patch('/',country.UpdateByID);

    router.delete('/:id',country.ReomveByID);

    app.use('/country' ,router);
};