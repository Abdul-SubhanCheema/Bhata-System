const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const EmployeeRoutes=require("./router/employeerouter");
const ProductRoutes=require("./router/productrouter");
const CustomerRoutes=require("./router/customerrouter");
const BillRoutes=require("./router/billrouter");
const { applyTimestamps } = require("./models/employee");

//Express app intialization
const app = express();

//Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://abdulsubhancheema97:ASC123@cluster0.ntpi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};


app.use("/Bhata/Employee", EmployeeRoutes);
app.use("/Bhata/Product",ProductRoutes);
app.use("/Bhata/Customer",CustomerRoutes);
app.use("/Bhata/Bill",BillRoutes);

//Listen to port
const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});