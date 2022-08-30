const excel=require('exceljs');
const con = require("../config/database");

module.exports.exportEmployee=async(req,res)=>{
    try {
      let query=await con.awaitQuery(`Select employee.*,
      assignment_history.date,assignment_history.status,task.task from employee,assignment_history,task where assignment_history.emp_id=
      employee.id and task.id=assignment_history.task_id`);
      
        let workbook = new excel.Workbook(); //creating workbook
            const jsonemployee = JSON.parse(JSON.stringify(query));
		let worksheet = workbook.addWorksheet('Employees'); //creating worksheet
        worksheet.columns = [
			{ header: 'Task', key: 'task', width: 30},
            {header:'Employee',key:'name',width:30},
			{ header: 'Status', key: 'status', width: 30},
			{ header: 'Date', key: 'date', width: 10, outlineLevel: 1}
		];
		// Add Array Rows
		worksheet.addRows(jsonemployee);
	 
		// Write to File
	let f=await workbook.xlsx.writeFile("employee2.xlsx");	
      res.json(query)
    } catch (error) {
        res.json({
            message:error.message,
            stack:error.stack
        })
    }
}