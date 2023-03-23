const sql = require("./database")

//constructor
const Countries = function (countries) {
    this.country_id = countries.country_id;
    this.country_name=countries.country_name;
    this.region_id=countries.region_id;
};

Countries.create = (newcountry,result)=>{
    sql.query("insert into Countries set ?",newcountry,(err,res)=>{
        if(err){
            console.log("error: " ,err);
            result(err,null);
            return;
        }
        //console.log("created Jobs : ",{...newJobs});
        result(null,{...newcountry});
    });
   
};

Countries.findByID=(couID,result)=>{
    sql.query(`select * from Countries where country_id = '${couID}'`,(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Countries :" ,res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
    })
};

Countries.findAll=(result)=>{
    sql.query('select * from Countries ',(err,res)=>{
        if (err){
            console.log("error : " ,err);
            result(err,null);
            return;
        }
            console.log("Found Countries :" ,res);
            result(null,res);
    })
};

Countries.ReomveByID=(id,result)=>{
    sql.query(`Delete from Countries where country_id = '${id}'`,(err,res)=>{
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

Countries.UpdateById = (updateCountry,result)=>{
    sql.query("update Countries set country_name=?, region_id=? where country_id=?",
    [updateCountry.country_name,updateCountry.region_id,updateCountry.country_id],
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
        result(null,{...updateCountry});
    });
}

module.exports = Countries;