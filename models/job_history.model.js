const sql = require("./database")

//constructor
const Job_History = function (job_history) {
    this.employee_id = job_history.employee_id;
    this.start_date=job_history.start_date;
    this.end_date=job_history.end_date;
    this.job_id=job_history.job_id;
    this.department_id=job_history.department_id;
};

Job_History.create = (newJobHistory,result)=>{
    sql.query("insert into Job_History set ?",newJobHistory,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        result(null,{...newJobHistory});
    });
   
};

Job_History.findByID=(empid,result)=>{
    sql.query(`select * from Job_History where employee_id = '${empid}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Job_History :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Job_History.findAll=(result)=>{
    sql.query('select * from Job_History ',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Job_History :" ,res);
            result(null,res);
    })
};

Job_History.ReomveByID=(empid,result)=>{
    sql.query(`Delete from Job_History where employee_id = '${empid}'`,(err,res)=>{
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

Job_History.UpdateById = (updateJobsHistory,result)=>{
    sql.query("update Job_History set start_date=?, end_date=?,job_id=?, department_id=? where employee_id=?",
    [updateJobsHistory.start_date,updateJobsHistory.end_date,updateJobsHistory.job_id,updateJobsHistory.department_id,updateJobsHistory.employee_id],
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
        result(null,{...updateJobsHistory});
    });
}

module.exports = Job_History;