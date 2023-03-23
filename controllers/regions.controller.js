const Regions=require("../models/regions.model")


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const regions= new Regions({
        region_id : req.body.region_id,
        region_name:req.body.region_name,
    })

    Regions.create(regions,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create Jobs."
        });
        else res.send(data);
    });
    
}

exports.getJobid=(req,res)=>{
    Regions.findByID(req.params.id,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found region_id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving region_id."
                });
            }
        }else res.send(data);
    });
}

exports.getJob=(req,res)=>{
    Regions.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving Regions"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Regions.ReomveByID(req.params.id,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found region_id ${req.params.id}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete region_id" + req.params.id
              });
        }
        } else res.send({message:'Regions was deleted successfully!'});
    });
}

exports.UpdateByID=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    Regions.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found region_id ${req.body.region_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating region_id ${req,body.region_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}