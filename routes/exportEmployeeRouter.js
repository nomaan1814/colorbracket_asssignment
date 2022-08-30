const express=require('express');
const { exportEmployee } = require('../controllers/excelController');
const router=express.Router();

router.get('/',exportEmployee)
module.exports=router;