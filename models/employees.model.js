const sql = require("./database")
const localStrategy=require("passport-local");
const passport=require("passport");
//constructor
const Employees = function (employees) {
    this.employee_id = employees.employee_id;
    this.first_name=employees.first_name;
    this.last_name=employees.last_name;
    this.email=employees.email;
    this.phone_number = employees.phone_number;
    this.department_id=employees.department_id;
    this.manager_id=employees.manager_id;
    this.commission=employees.commission;
    this.salary = employees.salary;
    this.job_id=employees.job_id;
    this.hire_date=employees.hire_date;
};

// Employees.login=(login,result)=>{
   
//    sql.query('select * from Employees',(err,res)=>{
//     if (err){
//         console.log("error : " ,err);
//         result(err,null);
//         return;
//     }
//         console.log("Found Employees :" ,res);
//         result(null,res);
// })
  
// }

Employees.create = (newemps,result)=>{
    sql.query("insert into Employees set ?",newemps,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        //console.log("created Jobs : ",{...newJobs});
        result(null,{...newemps});
    });
   
};

Employees.findByID=(empid,result)=>{
    sql.query(`select * from Employees where employee_id = '${empid}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Employees :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Employees.findAll=(result)=>{
    sql.query('select * from Employees',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Employees :" ,res);
            result(null,res);
    })
};

Employees.ReomveByID=(empid,result)=>{
    sql.query(`Delete from Employees where employee_id = '${empid}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.affectedRows===0){
            result({kind:"not_found"},null);
            return;
        }
        result(null,res);
    })
};

Employees.UpdateById = (updateEmp,result)=>{
    sql.query("update Employees set first_name=?, last_name=?, email=?, phone_number=?,department_id=?,manager_id=?,commission=?,salary=?,job_id=?,hire_date=? where employee_id=?",
    [updateEmp.first_name,updateEmp.last_name,updateEmp.email,updateEmp.phone_number,updateEmp.department_id,updateEmp.manager_id,updateEmp.commission,updateEmp.salary,updateEmp.job_id,updateEmp.hire_date,updateEmp.employee_id],
    (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows===0){
            result({kind:"not_found"},null);
            return;
        }
        result(null,{...updateEmp});
    });
}

module.exports = Employees;