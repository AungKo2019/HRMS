const sql = require("./database")

//constructor
const Jobs = function (jobs) {
    this.job_id = jobs.job_id;
    this.job_title=jobs.job_title;
    this.min_salary=jobs.min_salary;
    this.max_salary=jobs.max_salary;
};

Jobs.create = (newJobs,result)=>{
    sql.query("insert into Jobs set ?",newJobs,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        //console.log("created Jobs : ",{...newJobs});
        result(null,{...newJobs});
    });
   
};

Jobs.findByID=(jobid,result)=>{
    sql.query(`select * from Jobs where job_id = '${jobid}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Jobs :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Jobs.findAll=(result)=>{
    sql.query('select * from Jobs ',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Jobs :" ,res);
            result(null,res);
    })
};

Jobs.ReomveByID=(jobid,result)=>{
    sql.query(`Delete from Jobs where job_id = '${jobid}'`,(err,res)=>{
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

Jobs.UpdateById = (updateJobs,result)=>{
    sql.query("update Jobs set job_title=?, min_salary=?, max_salary=? where job_id=?",
    [updateJobs.job_title,updateJobs.min_salary,updateJobs.max_salary,updateJobs.job_id],
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
        result(null,{...updateJobs});
    });
}

module.exports = Jobs;