<div align="center">

# 💼 Bhata Management System

![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen?style=for-the-badge&logo=mongodb&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-Interface-teal?style=for-the-badge&logo=chakraui&logoColor=white)

<p align="center">
  <strong>🏪 A comprehensive business management solution for retail operations</strong>
</p>

<p align="center">
  <em>Streamline your business operations with employee management, inventory control, and billing systems</em>
</p>

</div>

## 📋 Overview

**Bhata Management System** is a full-stack MERN application designed to digitize and streamline retail business operations. The system provides comprehensive modules for employee management, inventory control, customer relations, and billing operations with an intuitive and modern interface.

## 🏗️ System Architecture

```
💼 Bhata Management System
├── 👥 Employee Management (Payroll, Loans, Status)
├── 📦 Product Management (Inventory, Categories, Pricing)
├── 🤝 Customer Management (Records, Status, History)
├── 💰 Bill Management (Invoicing, Payment, Reports)
├── 📊 Dashboard (Analytics, Overview, Reports)
└── 🔐 Authentication (Login, Access Control)
```

## ✨ Core Features

### 👥 **Employee Management**

| Feature | Description | Capabilities |
|---------|-------------|--------------|
| **👤 Employee Records** | Complete staff database | Name, CNIC, Address, Phone |
| **💰 Salary Management** | Payroll tracking system | Monthly payments, history |
| **💳 Loan System** | Employee loan tracking | Amount, date, repayment |
| **📊 Status Control** | Employment status | Active, Inactive, Terminated |

### 📦 **Product & Inventory Management**

<details>
<summary><strong>📋 Product Categories</strong></summary>

- **📱 Electronics**: Devices, gadgets, accessories
- **👔 Clothing**: Apparel and fashion items  
- **🪑 Furniture**: Home and office furniture
- **🍕 Food**: Food items and consumables
- **📦 Other**: Miscellaneous products

</details>

| Feature | Description | Management |
|---------|-------------|------------|
| **➕ Product Addition** | Add new inventory items | Name, price, quantity, category |
| **✏️ Stock Updates** | Modify existing inventory | Real-time quantity tracking |
| **🔍 Search & Filter** | Find products quickly | Category-wise filtering |
| **📊 Status Tracking** | Monitor product availability | Active/Inactive status |

### 🤝 **Customer Management**

- **📝 Customer Registration**: Complete profile management
- **📞 Contact Information**: Phone and address tracking
- **🆔 CNIC Verification**: Identity validation system
- **📊 Status Management**: Active/Terminated status control
- **📈 Purchase History**: Transaction tracking and analysis

### 💰 **Billing System**

| Step | Feature | Description |
|------|---------|-------------|
| **1** | 🛒 **Cart Management** | Add products with quantities |
| **2** | 💰 **Price Calculation** | Automatic total computation |
| **3** | 💸 **Tax & Discount** | Apply taxes and discounts |
| **4** | 💳 **Payment Processing** | Cash, Card, Online options |
| **5** | 📄 **Invoice Generation** | PDF bill creation |

## 🔧 Technical Stack

### **Frontend Technologies**
```javascript
// React with Modern UI
React 18.3.1
├── Chakra UI (Component Library)
├── Framer Motion (Animations)
├── React Router DOM (Navigation)
├── React Icons (Icon System)
├── Tailwind CSS (Utility Styling)
└── jsPDF (PDF Generation)
```

### **Backend Technologies**
```javascript
// Node.js Express Server
Express.js
├── MongoDB (Database)
├── Mongoose (ODM)
├── CORS (Cross-Origin)
├── dotenv (Environment)
└── RESTful APIs
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14.0.0 or higher)
- MongoDB (Local or Atlas)
- npm or yarn package manager

### **Installation & Setup**

#### **Backend Setup**
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# PORT=5000

# Start the server
npm start
```

#### **Frontend Setup**
```bash
# Navigate to frontend directory
cd myapp

# Install dependencies
npm install

# Start the development server
npm start
```

### **Environment Configuration**
```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/bhata-system
PORT=5000
NODE_ENV=development

# Frontend (automatically uses http://localhost:3000)
REACT_APP_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
Bhata-System/
├── Backend/                    # Node.js Express Server
│   ├── controller/            # Business logic controllers
│   ├── models/               # MongoDB schemas
│   │   ├── employee.js       # Employee data model
│   │   ├── customer.js       # Customer data model
│   │   ├── product.js        # Product data model
│   │   └── bills.js          # Billing data model
│   ├── router/               # API route definitions
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
└── myapp/                     # React Frontend
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # Reusable UI components
    │   │   ├── footer.jsx    # Footer component
    │   │   └── sidebar.jsx   # Navigation sidebar
    │   ├── pages/            # Application pages
    │   │   ├── login.jsx     # Authentication page
    │   │   ├── EmployeeDetails.jsx
    │   │   ├── ProductManagement.jsx
    │   │   ├── CustomerManagement.jsx
    │   │   ├── BillManagement.jsx
    │   │   └── PendingBills.jsx
    │   ├── App.js            # Main application component
    │   └── index.jsx         # Application entry point
    ├── tailwind.config.js    # Tailwind CSS configuration
    └── package.json          # Frontend dependencies
```

## 🎯 Business Features

### **Employee Operations**
- **Payroll Management**: Track monthly salaries with history
- **Loan System**: Employee loan issuance and tracking
- **Status Control**: Active, Inactive, Terminated states
- **Personal Records**: Complete employee database with CNIC verification

### **Inventory Control**
- **Multi-Category Products**: Electronics, Clothing, Furniture, Food, Others
- **Real-Time Stock**: Live inventory quantity tracking
- **Price Management**: Dynamic pricing with updates
- **Product Status**: Active/Inactive product control

### **Customer Relations**
- **Profile Management**: Complete customer database
- **Transaction History**: Purchase tracking and analysis
- **Status Management**: Active/Terminated customer states
- **Contact Management**: Phone and address records

### **Financial Management**
- **Invoice Generation**: Professional PDF bills
- **Payment Methods**: Cash, Card, Online payments
- **Tax Calculations**: Automatic tax computation
- **Discount System**: Flexible discount application

## 🛡️ Security Features

- **Input Validation**: Comprehensive data validation
- **CNIC Verification**: Pakistani identity verification
- **Secure Authentication**: Login system with session management
- **Data Integrity**: MongoDB schema validation
- **CORS Protection**: Secure cross-origin requests

## 📊 Dashboard Analytics

- **Sales Overview**: Revenue tracking and analysis
- **Inventory Insights**: Stock levels and alerts
- **Employee Metrics**: Payroll and loan summaries
- **Customer Analytics**: Purchase patterns and history
- **Financial Reports**: Comprehensive business reports

## 🎨 UI/UX Features

- **Modern Interface**: Clean, professional design
- **Responsive Layout**: Mobile and desktop optimized
- **Interactive Elements**: Smooth animations with Framer Motion
- **Component Library**: Consistent Chakra UI components
- **Utility Styling**: Efficient Tailwind CSS styling

## 📈 Scalability Features

- **Modular Architecture**: Easily extensible codebase
- **RESTful APIs**: Standard API design patterns
- **Database Optimization**: Efficient MongoDB queries
- **Component Reusability**: Modular React components
- **Environment Flexibility**: Development/Production configs

## 🤝 Contributing

We welcome contributions to enhance the Bhata Management System:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 📞 Contact

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Abdul-SubhanCheema)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/abdulsubhan303)

<img src="https://user-images.githubusercontent.com/74038190/213910845-af37a709-8995-40d6-be59-724526e3c3d7.gif" width="100">

### 💼 *"Bringing business management into the digital era, one feature at a time!"* ✨

**⭐ Enjoyed the project? Give it a star!**

</div>
