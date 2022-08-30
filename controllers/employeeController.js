const con = require("../config/database");

// function to get employee of day
module.exports.get_employee_of_day=async (date)=>{
    let dt=new Date(date).toISOString().slice(0, 10);
    let query=await con.awaitQuery(`select emp_id,COUNT(emp_id) as completed_task,employee.name,employee.designation from assignment_history,employee where date='${dt}'
    and status="done" and employee.id=assignment_history.emp_id GROUP BY emp_id order by completed_task desc limit 1`); 
    if(query.length>0){
    console.log(`Employee of the day is ${query[0].name} Task Compeleted:${query[0].completed_task}`)
    }
    else{
     console.log(`No task assigned or compeleted on this day`);
    }
}



// function to get employee of week

module.exports.get_employee_of_week=async(date)=>{
        let ndt=new Date(date).getDay();
        let sun=new Date(date);
        let sat=new Date(date);

        // If weeekday is not sunday
        if(ndt!=0){
         // to find date of sunday
        sun.setDate(sun.getDate()-(ndt));
        }

        // if week day is not saturday
        if(ndt!=6){
            // to find date of saturday
            sat.setDate(sat.getDate()+ndt);
        }
        sun=sun.toISOString().slice(0, 10);
        sat=sat.toISOString().slice(0, 10);
        
        //    query to find week of employee

        let query=await con.awaitQuery(`SELECT emp_id,COUNT(emp_id) as completed_task,employee.name,employee.designation from assignment_history,employee 
        WHERE date BETWEEN '${sun}' AND '${sat}' and status="done" and employee.id=assignment_history.emp_id GROUP BY emp_id order by completed_task desc limit 1`);
        if(query.length>0){
             console.log(`Employee of the week is ${query[0].name} Task Compeleted:${query[0].completed_task}`)
    }
    else{
     console.log(`No task assigned or compeleted in this week`);
            }
}




// function to get employee of month
module.exports.get_employee_of_month=async(dt)=>{
    var date = new Date(dt);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 1);
    firstDay=firstDay.toISOString().slice(0, 10);
    lastDay=lastDay.toISOString().slice(0, 10);
    let query=await con.awaitQuery(`SELECT emp_id,COUNT(emp_id) as completed_task,employee.name,employee.designation from assignment_history,employee 
        WHERE date BETWEEN '${firstDay}' AND '${lastDay}' and status="done" and employee.id=assignment_history.emp_id GROUP BY emp_id order by completed_task desc limit 1`);
        if(query.length>0){
            console.log(`Employee of the month is ${query[0].name} Task Compeleted:${query[0].completed_task}`)
        }
        else{
         console.log(`No task assigned or compeleted in this month`);
        }
}