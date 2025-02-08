const Customer = require("../models/customer.js");

const CustomerController = {
  AddCustomer: async (req, res) => {
    try {
      const { name, cnic, phone, address } = req.body;

      if (!name || !cnic || !phone || !address) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newCustomer = new Customer({
        name,
        cnic,
        phone,
        address,
      });

      await newCustomer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error("Error adding customer:", error);
      res
        .status(500)
        .json({ message: "Failed to add customer. Please try again." });
    }
  },
  GetAllCustomers: async (req, res) => {
    try {
      const customer = await Customer.find();
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetAllActiveCustomer: async (req, res) => {
    try {
      const customer = await Customer.find({status:"Active"});
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  UpdateCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ message: "Error updating customer", error });
    }
  },
  TerminateCustomer: async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;
  
        const updatedCustomer = await Customer.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
  
        if (!updatedCustomer) {
          return res.status(404).json({ message: "Customer not found" });
        }
  
        res.status(200).json({
          message: "Customer status updated",
        });
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: "Error updating status", error });
      }
    },
};
module.exports = CustomerController;
