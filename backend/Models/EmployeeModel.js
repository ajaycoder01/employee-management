const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee", "user"], default: "employee" },
    profileImage: { type: String },
    salary: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('employees', EmployeeSchema);
