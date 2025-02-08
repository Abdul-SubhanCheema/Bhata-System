const express = require("express");
const router = express.Router();
const EmployeeController=require("../controller/employeecontroller.js")

router.post("/add",EmployeeController.AddEmployee);
router.get("/all",EmployeeController.GetAllEmployee);
router.put("/:id",EmployeeController.UpdateEmployee);
router.put("/status/:id",EmployeeController.InactiveEmployee);
router.put("/terminate/:id",EmployeeController.TerminateEmployee);
router.get("/:id/history",EmployeeController.SpecificEmployee);
router.post("/:id/update-salary",EmployeeController.UpdateSalary);
router.post("/:id/grant-loan",EmployeeController.GrantLoan);
router.put("/:id/update-salary/:salaryId",EmployeeController.UpdateSpecificSalary);
router.delete("/:id/delete-salary/:salaryId",EmployeeController.DeleteSpecificSalary);
router.put("/:id/update-loan/:loanId",EmployeeController.UpdateSpecificLoan);
router.delete("/:id/delete-loan/:loanId",EmployeeController.DeleteSpecificLoan);


module.exports = router;
