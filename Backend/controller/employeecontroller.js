const Employee = require("../models/employee.js");

const EmployeeController = {
  AddEmployee: async (req, res) => {
    try {
      const { name, cnic, phone, address, salary } = req.body;

      if (!name || !cnic || !phone || !address || !salary) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newEmployee = new Employee({
        name,
        cnic,
        phone,
        address,
        salary,
        status: "Active",
      });

      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      console.error("Error adding user:", error);
      res
        .status(500)
        .json({ message: "Failed to add user. Please try again." });
    }
  },
  GetAllEmployee: async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  UpdateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Error updating employee", error });
    }
  },
  InactiveEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({
        message: "Employee status updated",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Error updating status", error });
    }
  },
  TerminateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({
        message: "Employee status updated",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Error updating status", error });
    }
  },
  UpdateSalary: async (req, res) => {
    try {
      const { month, Year } = req.body;

      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      // Check if salary for the same month and year already exists in the salaryHistory
      const salaryExists = employee.salaryHistory.some(
        (history) =>
          history.month === month && history.Year === Year
      );

      if (salaryExists) {
        // If salary already exists for the same month and year
        throw new Error(
          `Salary for ${salaryMonth} ${salaryYear} has already been added.`
        );
      }
      amount = employee.salary;
      // Add salary record
      employee.salaryHistory.push({
        month,
        Year,
        amount,
        datePaid: new Date(),
      });

      await employee.save();
      res.json({ message: "Salary updated successfully", employee });
    } catch (error) {
      res.status(500).json({ message: "Error updating salary", error });
    }
  },
  GrantLoan: async (req, res) => {
    try {
      const { month, amount } = req.body;

      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      employee.loanHistory.push({ month, amount, dateIssued: new Date() });

      await employee.save();
      res.json({ message: "Loan granted successfully", employee });
    } catch (error) {
      res.status(500).json({ message: "Error granting loan", error });
    }
  },
  SpecificEmployee: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({
        name: employee.name,
        cnic: employee.cnic,
        address: employee.address,
        phone: employee.phone,
        salary: employee.salary,
        status: employee.status,
        salaryHistory: employee.salaryHistory,
        loanHistory: employee.loanHistory,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching employee details", error });
    }
  },
  UpdateSpecificSalary: async (req, res) => {
    const { id, salaryId } = req.params;
    const { amount } = req.body;

    try {
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const salary = employee.salaryHistory.id(salaryId);

      if (!salary) {
        return res.status(404).json({ message: "Salary record not found" });
      }

      // Update the salary amount
      salary.amount = amount;
      await employee.save();

      res
        .status(200)
        .json({ message: "Salary updated successfully", employee });
    } catch (error) {
      console.error("Error updating salary:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  DeleteSpecificSalary: async (req, res) => {
    const { id, salaryId } = req.params;

    try {
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Use pull to remove the salary with the given salaryId
      const salaryToRemove = employee.salaryHistory.id(salaryId);
      if (!salaryToRemove) {
        return res.status(404).json({ message: "Salary record not found" });
      }

      // Remove the salary record from the salaryHistory array
      employee.salaryHistory.pull(salaryId);
      await employee.save();

      res
        .status(200)
        .json({ message: "Salary record deleted successfully", employee });
    } catch (error) {
      console.error("Error deleting salary:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  UpdateSpecificLoan: async (req, res) => {
    const { id, loanId } = req.params;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    try {
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the specific loan record
      const loan = employee.loanHistory.id(loanId);
      if (!loan) {
        return res.status(404).json({ message: "Loan record not found" });
      }

      loan.amount = amount;

      await employee.save();

      res.status(200).json({ message: "Loan updated successfully", employee });
    } catch (error) {
      console.error("Error updating loan:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  DeleteSpecificLoan: async (req, res) => {
    const { id, loanId } = req.params;

    try {
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Use pull to remove the loan with the given loanId
      const loanToRemove = employee.loanHistory.id(loanId);
      if (!loanToRemove) {
        return res.status(404).json({ message: "Loan record not found" });
      }

      // Remove the loan record from the loanHistory array
      employee.loanHistory.pull(loanId);
      await employee.save();

      res
        .status(200)
        .json({ message: "Loan record deleted successfully", employee });
    } catch (error) {
      console.error("Error deleting loan:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
module.exports = EmployeeController;
