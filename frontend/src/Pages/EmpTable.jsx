


import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function EmpTable({ employees, pagination, fetchEmployees, handleUpdateEmp, handleDeleteEmp }) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];
    const { currentPage, totalPages } = pagination;
    const role = localStorage.getItem("role");

    const TableRow = ({ employee }) => (
        <tr>
            <td><Link to={`/employee/${employee._id}`} className='text-decoration-none'>{employee.name}</Link></td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                {role === "admin" ? (
                    <>
                        <span className="text-warning me-2" style={{ cursor: "pointer" }} onClick={() => handleUpdateEmp(employee)}><FiEdit3/></span>
                        <span className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDeleteEmp(employee)}><MdDelete/></span>
                    </>
                ) : <span className="text-muted">View Only</span>}
            </td>
        </tr>
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="table-responsive">
            <table className="table table-striped align-middle">
                <thead><tr>{headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
                <tbody>
                    {employees.length ? employees.map(emp => <TableRow key={emp._id} employee={emp}/>) : <tr><td colSpan={5} className="text-center">No employees found</td></tr>}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    <button className="btn btn-outline-primary me-1" onClick={()=>fetchEmployees('', currentPage-1,5)} disabled={currentPage===1}>Previous</button>
                    {pageNumbers.map(p => <button key={p} onClick={()=>fetchEmployees('', p,5)} className={`btn btn-outline-primary me-1 ${currentPage===p?'active':''}`}>{p}</button>)}
                    <button className="btn btn-outline-primary" onClick={()=>fetchEmployees('', currentPage+1,5)} disabled={currentPage===totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default EmpTable;


