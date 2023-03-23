const Employees=require("../models/employees.model")


// exports.Login =(req,res)=>{
//     Employees.login(req.body,(err,data)=>{
//         if(err){
//           res.status(500).send({
//             message:err.message || "Unautherize"
//         });      
//         }else res.send(data);
//     });
// }

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }
    
    const employees= new Employees({

        employee_id : req.body.employee_id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone_number : req.body.phone_number,
        department_id:req.body.department_id,
        manager_id:req.body.manager_id,
        commission:req.body.commission,
        salary : req.body.salary,
        job_id:req.body.job_id,
        hire_date:req.body.hire_date,
    })



    Employees.create(employees,(err,data)=>{
        if(err)
        res.status(500).send({
            message: err.message || "Some error occure while create Employees."
        });
        else res.send(data);
    });
    
}

exports.getEmpid=(req,res)=>{
    Employees.findByID(req.params.id,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found employee_id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:"Error retrieving employee_id."
                });
            }
        }else res.send(data);
    });
}

exports.getEmployee=(req,res)=>{
    Employees.findAll((err,data)=>{
        if(err){
          res.status(500).send({
            message:err.message || "Some error occured while retrieving Employee"
        });      
        }else res.send(data);
    });
}

exports.ReomveByID=(req,res)=>{
    Employees.ReomveByID(req.params.id,(err,data)=>{
        if(err){
          if(err.kind==="not_found"){
            res.status(404).send({
                message:`Not found employee_id ${req.params.id}.`
            });      
          }else {
            res.status(500).send({
                message: "Could not delete employee_id" + req.params.id
              });
        }
        } else res.send({message:'Employee was deleted successfully!'});
    });
}

exports.UpdateByID=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    Employees.UpdateById(req.body,(err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message:`Not found employee_id ${req.body.employee_id}.`
                })
            } else {
                res.status(500).send({
                    message:`Error updating employee_id ${req,body.employee_id}`
                })
            }
        } else {
            res.send(data);
        }
    })
}