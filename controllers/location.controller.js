const Location=require("../models/location.model")


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const location= new Location({
        location_id : req.body.location_id,
        street_address:req.body.street_address,
        postal_code:req.body.postal_code,
        city:req.body.city,
        state_province:req.body.state_province,
        country_id:req.body.country_id,
    })

    Location.create(location,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create Jobs."
        });
        else res.send(data);
    });
    
}

exports.getid=(req,res)=>{
    Location.findByID(req.params.id,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found location_id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving location_id."
                });
            }
        }else res.send(data);
    });
}

exports.getlocation=(req,res)=>{
    Location.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving locations"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Location.ReomveByID(req.params.id,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found location_id ${req.params.id}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete location_id" + req.params.id
              });
        }
        } else res.send({message:'location was deleted successfully!'});
    });
}

exports.UpdateByID=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    Location.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found location_id ${req.body.location_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating location_id ${req,body.location_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}