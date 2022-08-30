const express=require('express');
const app=express();
const excel = require('exceljs');
const con=require('./config/database');
app.use(express.json())
const schedule=require('node-schedule')
const exportEmployeeRouter=require('./routes/exportEmployeeRouter');
const { get_employee_of_day, get_employee_of_week, get_employee_of_month } = require('./controllers/employeeController');
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});



// middleware to export employee worksheet
app.use('/export_emp',exportEmployeeRouter);


// automaticallyexecuted script
schedule.scheduleJob('0 0 * * *', async() => { 
  let dt=new Date().toISOString().slice(0, 10);
  console.log(dt);
  let query=await con.awaitQuery(`select emp_id,COUNT(emp_id) as completed_task,employee.name,employee.designation from assignment_history,employee where date='${dt}'
  and status="done" and employee.id=assignment_history.emp_id GROUP BY emp_id order by completed_task desc limit 1`); 
  console.log(JSON.parse(JSON.stringify(query)));
  let insert_query=await con.awaitQuery(`INSERT into emp_of_the_day values('','${dt}','${query[0].name}','${query[0].designation}','${query[0].completed_task}')`)
})
 


// query to find employee of the week
app.listen(5000,()=>{

    // to find employee of day month and week
    readline.question('Want to check employee of day,month and week enter 1' ,val=>{
      if(val==1){
        readline.question(
          'Enter Date in yyyy-mm-dd format to find employee of day,week,month', date => {
          get_employee_of_day(date);
          get_employee_of_week(date);
          get_employee_of_month(date);
          readline.close();
        });
      }
    } )
   
})
