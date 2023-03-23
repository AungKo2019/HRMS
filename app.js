const express=require("express");
const app=express();
const cookieParser = require('cookie-parser');
const session=require("express-session");
const cors = require("cors");
const bodyParser=require("body-parser");

const passport=require("passport");
const local=require("./strategies/local");
const auth=require("./routes/authentication");

const store=new session.MemoryStore();


// var corsOptions={
//     origin:"http://localhost:3001"
// };

// app.use(cors(corsOptions));
app.use(session({
    secret:'some secret',
    cookie:{maxAge :60000},
    saveUninitialized:false,
    store
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    //console.log(`${req.method} - ${req.url}`);
    //console.log(store)
    next();
});

app.get('/',(req,res)=>{
    res.json({message:"Welcome to Human Resource Management System"});
})

app.use(passport.initialize());
app.use(passport.session());
require("./routes/jobs.route")(app);
require("./routes/job_history.route")(app);
require("./routes/departments.route")(app);
require("./routes/regions.route")(app);
require("./routes/countries.route")(app);
require("./routes/location.route")(app);
require("./routes/employees.route")(app);
//require("./routes/authentication")(app);
app.use('/employees',auth);




app.listen(3001,()=>{
    console.log('Server is running on port : 3001');
})