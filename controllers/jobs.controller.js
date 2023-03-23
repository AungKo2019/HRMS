const Jobs=require("../models/jobs.model")


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const jobs= new Jobs({
        job_id : req.body.job_id,
        job_title:req.body.job_title,
        min_salary:req.body.min_salary,
        max_salary:req.body.max_salary,
    })

    Jobs.create(jobs,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create Jobs."
        });
        else res.send(data);
    });
    
}

exports.getJobid=(req,res)=>{
    Jobs.findByID(req.params.id,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found job_id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving Job_id."
                });
            }
        }else res.send(data);
    });
}

exports.getJob=(req,res)=>{
    Jobs.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving jobs"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Jobs.ReomveByID(req.params.jobid,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found Job_id ${req.params.jobid}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete Job_id" + req.params.jobid
              });
        }
        } else res.send({message:'Job was deleted successfully!'});
    });
}

exports.UpdateByID=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    Jobs.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found jobid ${req.body.job_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating jobid ${req,body.job_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}