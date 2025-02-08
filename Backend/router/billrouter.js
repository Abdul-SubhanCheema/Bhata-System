const express = require("express");
const router = express.Router();
const BillController=require("../controller/billcontroller");

router.get("/all", BillController.GettAllBills);
router.post("/add", BillController.AddBill);
router.delete("/:id", BillController.DeleteBill);
router.get("/pending",BillController.PendingBills);
router.put("/update/:id",BillController.UpdatePendingBill);
router.get("/bills",BillController.BillPrinting);

module.exports = router;