module.exports = app =>{
    const jobhistory= require("../controllers/jobs_history.controller");

    var router = require("express").Router();

    router.post('/',jobhistory.create);

    router.get('/',jobhistory.getJobHistory);

     router.get('/:empid',jobhistory.getempid);

    router.patch('/',jobhistory.UpdateByID);

    router.delete('/:empid',jobhistory.ReomveByID);

    app.use('/jobhistory' ,router);
};