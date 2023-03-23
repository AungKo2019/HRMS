const sql = require("./database")

//constructor
const Location = function (location) {
    this.location_id = location.location_id;
    this.street_address=location.street_address;
    this.postal_code=location.postal_code;
    this.city=location.city;
    this.state_province=location.state_province;
    this.country_id=location.country_id;
};

Location.create = (location,result)=>{
    sql.query("insert into Location set ?",location,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        //console.log("created Jobs : ",{...location});
        result(null,{...location});
    });
   
};

Location.findByID=(id,result)=>{
    sql.query(`select * from Location where location_id = '${id}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Location :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Location.findAll=(result)=>{
    sql.query('select * from Location ',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Location :" ,res);
            result(null,res);
    })
};

Location.ReomveByID=(id,result)=>{
    sql.query(`Delete from Location where location_id = '${id}'`,(err,res)=>{
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

Location.UpdateById = (updatelocation,result)=>{
    sql.query("update Location set street_address=?, postal_code=?, city=?, state_province=?,country_id=? where location_id=?",
    [updatelocation.street_address,updatelocation.postal_code,updatelocation.city,updatelocation.state_province,updatelocation.country_id,updatelocation.location_id],
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
        result(null,{...updatelocation});
    });
}

module.exports = Location;