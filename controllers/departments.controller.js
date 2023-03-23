const Departments=require("../models/departments.model")
const {sign} =require("jsonwebtoken");


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const deps= new Departments({
        department_id : req.body.department_id,
        department_name:req.body.department_name,
        manager_id:req.body.manager_id,
        location_id:req.body.location_id,
    })

    Departments.create(deps,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create Departments."
        });
        else res.send(data);
    });
    
}

exports.getDepid=(req,res)=>{
    Departments.findByID(req.params.depid,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found job_id ${req.params.depid}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving department_id."
                });
            }
        }else res.send(data);
    });
}

exports.getDepartment=(req,res)=>{
    Departments.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving Department"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Departments.ReomveByID(req.params.depid,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found Job_id ${req.params.depid}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete department_id" + req.params.depid
              });
        }
        } else res.send({message:'Department was deleted successfully!'});
    });
}

exports.UpdateByID=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    Departments.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found jobid ${req.body.department_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating department ${req,body.department_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}

exports.login=(req,res)=>{
    const body=req.body;
    Departments.findByID(body.department_id,(err,results)=>{
        if(err){
            console.log(err)
        }
        if(!results){
            return res.json({
                success:0,
                message:"Invalid Department ID"
            });
        }
        if(results.department_name===body.department_name){
            const jsontoken=sign(results,"qwe1234",{expiresIn:"1hr"});
            return res.json({
                success:1,
                message:"Login Successfully",
                token:jsontoken
            })
        } else {
            return res.json({
                success:0,
                message:"Invalid Department Name"
            })
        }
    })
}