const mysql=require('mysql-await');
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"color_bracket",
    // timezone:'utc',
    dateStrings: true
});
con.connect(function(err){
    if(err){
        process.exit(1);
        
    }
   
})
module.exports=con;