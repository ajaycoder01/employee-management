
import React, { useEffect, useState } from 'react';
import { CreateEmp, UpdateEmpById } from '../api';
import { notify } from '../utils';

function AddEmp({ showModal, setShowModal, fetchEmployees, updateEmpObj }) {

    const [employee, setEmployee] = useState({
        name: '', email: '', phone: '', department: '', salary: '', profileImage: null
    });

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (updateEmpObj) {
            setUpdateMode(true);
            setEmployee(updateEmpObj);
        } else {
            setUpdateMode(false);
            setEmployee({ name:'', email:'', phone:'', department:'', salary:'', profileImage:null });
        }
    }, [updateEmpObj]);

    const handleChange = e => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = e => {
        setEmployee(prev => ({ ...prev, profileImage: e.target.files[0] }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { success, message } = updateMode
                ? await UpdateEmpById(employee, employee._id)
                : await CreateEmp(employee);

            notify(message, success ? 'success' : 'error');
            handleClose();
            fetchEmployees();
        } catch (err) {
            notify('Operation failed', 'error');
            console.log(err);
        }
    };

    const handleClose = () => setShowModal(false);

    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{updateMode ? 'Update Employee' : 'Add Employee'}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {['name','email','phone','department','salary'].map(field => (
                                <div className="mb-3" key={field}>
                                    <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field === 'salary' ? 'number' : 'text'}
                                        name={field}
                                        className="form-control"
                                        value={employee[field]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}
                            <div className="mb-3">
                                <label className="form-label">Profile Image</label>
                                <input type="file" name="profileImage" className="form-control" accept="image/*" onChange={handleFileChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{updateMode ? 'Update' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmp;
