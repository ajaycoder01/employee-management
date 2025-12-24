
const EmployeeModel = require('../Models/EmployeeModel');

const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, department, salary } = req.body;
        const profileImage = req.file?.filename || null;

        const employee = new EmployeeModel({ name, email, phone, department, salary, profileImage });
        await employee.save();

        res.status(201).json({ message: "Employee created successfully", success: true, data: employee });
    } catch (error) {
        res.status(500).json({ message: "Error creating employee", success: false, error });
    }
};

const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        if (req.file) updateData.profileImage = req.file.filename;
        updateData.updatedAt = new Date();

        const updated = await EmployeeModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return res.status(404).json({ message: "Employee not found", success: false });

        res.status(200).json({ message: "Employee updated", success: true, data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", success: false, error });
    }
};
const getAllEmployee = async (req, res) => {
    try {
        let { page = 1, limit = 5, search } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        let query = {};

        // Agar search query hai to name me filter lagao
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const totalEmployees = await EmployeeModel.countDocuments(query);
        const employees = await EmployeeModel.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        res.status(200).json({
            message: "Employees fetched",
            success: true,
            data: {
                employees,
                pagination: {
                    totalEmployees,
                    currentPage: page,
                    totalPages: Math.ceil(totalEmployees / limit),
                    pageSize: limit
                }
            }
        });
    } catch (error) {
        console.error("Error in getAllEmployee:", error);
        res.status(500).json({ message: "Error fetching employees", success: false, error: error.message });
    }
};



const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeModel.findById(id);
        if (!employee) return res.status(404).json({ message: "Employee not found", success: false });

        res.status(200).json({ message: "Employee details", success: true, data: employee });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", success: false, error });
    }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await EmployeeModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Employee not found", success: false });

        res.status(200).json({ message: "Employee deleted", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", success: false, error });
    }
};

module.exports = { createEmployee, updateEmployeeById, getAllEmployee, getEmployeeById, deleteEmployeeById };
