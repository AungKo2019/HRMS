module.exports = app =>{
    const jobs= require("../controllers/jobs.controller");

    var router = require("express").Router();

    router.post('/',jobs.create);

    router.get('/',jobs.getJob);

    router.get('/:id',jobs.getJobid);

    router.patch('/',jobs.UpdateByID);

    router.delete('/:jobid',jobs.ReomveByID);

    app.use('/jobs' ,router);
};