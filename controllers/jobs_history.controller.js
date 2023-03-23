const Job_History=require("../models/job_history.model")


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const jobhistory= new Job_History({
        employee_id : req.body.employee_id,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        job_id:req.body.job_id,
        department_id:req.body.department_id,
    })

    Job_History.create (jobhistory,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create JobHistory."
        });
        else res.send(data);
    });
    
}

exports.getempid=(req,res)=>{
    Job_History.findByID  ( req.params.empid,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found Emplyoee_id ${req.params.empid}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving Emplyoee_id."
                });
            }
        }else {
            res.send(data);
        }
    });
}

exports.getJobHistory=(req,res)=>{
    Job_History.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving jobs"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Job_History.ReomveByID(req.params.empid,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found Job_id ${req.params.empid}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete Job_id" + req.params.empid
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
    Job_History.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found jobid ${req.body.employee_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating jobid ${req,body.employee_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}