const Bill = require("../models/bills.js");
const Customer = require("../models/customer.js");
const Product = require("../models/product.js");

const BillController = {
  GettAllBills: async (req, res) => {
    try {
      const bills = await Bill.find()
        .populate("customer")
        .populate("items.product");
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bills", error });
    }
  },
  AddBill: async (req, res) => {
    const {
      customer,
      items,
      tax,
      discount,
      totalAmount,
      finalAmount,
      paymentMethod,
      amountPaid,
    } = req.body;

    try {
      // Find the customer
      const foundCustomer = await Customer.findById(customer);
      if (!foundCustomer) {
        return res.status(400).json({ message: "Customer not found" });
      }

      // Check product stock availability and reduce the quantity
      for (let item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res
            .status(400)
            .json({ message: `Product ${item.product} not found` });
        }

        // Check if the quantity ordered is more than available stock
        if (item.quantity > product.stock) {
          return res.status(400).json({
            message: `Not enough stock for product ${product.name}. Only ${product.quantity} available.`,
          });
        }

        // Reduce the product stock
        product.quantity -= item.quantity;
        await product.save();
      }

      // Create the new bill
      const newBill = new Bill({
        customer: foundCustomer._id,
        items,
        tax,
        discount,
        totalAmount,
        finalAmount,
        paymentMethod,
        amountPaid,
      });

      await newBill.save();

      // Respond with the created bill
      res.status(201).json({
        message: "Bill created successfully",
        bill: newBill,
      });
    } catch (error) {
      console.error("Error creating bill:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  DeleteBill: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBill = await Bill.findByIdAndDelete(id);
      if (!deletedBill) {
        return res.status(404).json({ message: "Bill not found" });
      }
      res
        .status(200)
        .json({ message: "Bill deleted successfully", deletedBill });
    } catch (error) {
      res.status(500).json({ message: "Error deleting bill", error });
    }
  },
  PendingBills: async (req, res) => {
    try {
      const bills = await Bill.find({ pendingAmount: { $gt: 0 } }).populate(
        "customer",
        "name cnic"
      );
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pending bills", error });
    }
  },
  UpdatePendingBill: async (req, res) => {
    try {
      const { amountPaid } = req.body;

      const bill = await Bill.findById(req.params.id);
      if (!bill) return res.status(404).json({ message: "Bill not found" });

      bill.amountPaid = amountPaid;

      await bill.save();

      res.status(200).json({ message: "Bill updated successfully", bill });
    } catch (error) {
      res.status(500).json({ message: "Error updating bill", error });
    }
  },
  BillPrinting: async (req, res) => {
    try {
      const { day, month, year } = req.query;
      
      if (!day || !month || !year) {
        return res
          .status(400)
          .json({ message: "Day, month, and year are required" });
      }

      // Convert to a Date object range
      const startDate = new Date(year, month - 1, day, 0, 0, 0);
      const endDate = new Date(year, month - 1, day, 23, 59, 59);

      // Find bills created within this date range
      const bills = await Bill.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
        .populate("customer")
        .populate("items.product");
      

      res.status(200).json(bills);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
module.exports = BillController;
