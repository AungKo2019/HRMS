const sql = require("./database")

//constructor
const Regions = function (regions) {
    this.region_id = regions.region_id;
    this.region_name=regions.region_name;
    
};

Regions.create = (newRegions,result)=>{
    sql.query("insert into Regions set ?",newRegions,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        //console.log("created Jobs : ",{...newRegions});
        result(null,{...newRegions});
    });
   
};

Regions.findByID=(regid,result)=>{
    sql.query(`select * from Regions where region_id = '${regid}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Regions :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Regions.findAll=(result)=>{
    sql.query('select * from Regions ',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Regions :" ,res);
            result(null,res);
    })
};

Regions.ReomveByID=(regid,result)=>{
    sql.query(`Delete from Regions where region_id = '${regid}'`,(err,res)=>{
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

Regions.UpdateById = (updateRegions,result)=>{
    sql.query("update Regions set region_name=? where region_id=?",
    [updateRegions.region_name,updateRegions.region_id],
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
        result(null,{...updateRegions});
    });
}

module.exports = Regions;