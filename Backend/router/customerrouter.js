const express = require("express");
const router = express.Router();
const CustomerController=require("../controller/customercontroller.js")

router.post("/add",CustomerController.AddCustomer);
router.get("/all",CustomerController.GetAllCustomers);
router.get("/active",CustomerController.GetAllActiveCustomer);
router.put("/:id",CustomerController.UpdateCustomer);
router.put("/terminate/:id",CustomerController.TerminateCustomer);

module.exports = router;
