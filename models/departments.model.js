const sql = require("./database")

//constructor
const Departments = function (dep) {
    this.department_id = dep.department_id;
    this.department_name=dep.department_name;
    this.manager_id=dep.manager_id;
    this.location_id=dep.location_id;
};

Departments.create = (newdeps,result)=>{
    sql.query("insert into Departments set ?",newdeps,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        //console.log("created Jobs : ",{...newJobs});
        result(null,{...newdeps});
    });
   
};

Departments.findByID=(depid,result)=>{
    sql.query(`select * from Departments where department_id = '${depid}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Departments :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Departments.findAll=(result)=>{
    sql.query('select * from Departments ',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Departments :" ,res);
            result(null,res);
    })
};

Departments.ReomveByID=(depid,result)=>{
    sql.query(`Delete from Departments where department_id = '${depid}'`,(err,res)=>{
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

Departments.UpdateById = (updatedeps,result)=>{
    sql.query("update Departments set department_name=?, manager_id=?, location_id=? where department_id=?",
    [updatedeps.department_name,updatedeps.manager_id,updatedeps.location_id,updatedeps.department_id],
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
        result(null,{...updatedeps});
    });
}

module.exports = Departments;