const LocalStrategy = require('passport-local');
const passport=require('passport');
const db=require('../models/database');

passport.serializeUser((user,done)=>{
    //console.log(user.employee_id,user.email);
    done(null,user.employee_id);
});

passport.deserializeUser(async(username,done)=>{
    try {
        const result=await db.promise().query(`select * from Employees where employee_id='${username}'`);
         if(result[0][0]){
            //console.log(result[0][0])
            done(null,result[0][0]);
         }
    } catch (error) {
        done(err,null);
    }
   
});

passport.use(new LocalStrategy(
    async(username,password,done)=>{
        try {
            console.log(username,password);
            const result=await db.promise().query(`select * from Employees where employee_id='${username}'`);
            //console.log(result)
             //console.log(result[0]);
             //console.log(result[0][0].email)
            if(result[0].length===0){
             done(null,false);
            }else {
             if(result[0][0].email=== password){
                 done(null,result[0][0]);
             }else {
                 done(null,false);
             }
            }
        } catch (error) {
            done(err,false);
        }
    }
));

 module.exports =passport;