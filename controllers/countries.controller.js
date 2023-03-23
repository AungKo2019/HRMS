const Countries=require("../models/countries.model")


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const country= new Countries({
        country_id : req.body.country_id,
        country_name:req.body.country_name,
        region_id:req.body.region_id,
    })

    Countries.create(country,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create Country."
        });
        else res.send(data);
    });
    
}

exports.getJobid=(req,res)=>{
    Countries.findByID(req.params.id,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found country_id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving country_id."
                });
            }
        }else res.send(data);
    });
}

exports.getJob=(req,res)=>{
    Countries.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving Country"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Countries.ReomveByID(req.params.id,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found country_id ${req.params.id}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete country_id" + req.params.id
              });
        }
        } else res.send({message:'Country was deleted successfully!'});
    });
}

exports.UpdateByID=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    Countries.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found country_id ${req.body.country_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating country_id ${req,body.country_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}