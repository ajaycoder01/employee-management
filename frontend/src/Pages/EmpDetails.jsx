import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notify } from '../utils';
import { GetEmpById } from '../api';
import { MdCurrencyRupee, MdEmail } from 'react-icons/md';
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsTelephoneForwardFill } from "react-icons/bs";

function EmpDetails() {
  const { id } = useParams();

  const [empDetails, setEmpDetails] = useState({});
  const navigate = useNavigate();

  // console.log(id);

  const fetchEmpById = async () => {
    try {
      const { data } = await GetEmpById(id);
      console.log(data);
      setEmpDetails(data);

    } catch (error) {
      notify('Failed to fetch employee, try again later', 'error');
    }
  }

  useEffect(() => {
    fetchEmpById();
  }, [id])

  const { name, email, phone, salary, department, createdAt, profileImage } = empDetails;
  console.log('Profile Image:', profileImage);

  return (
    <>
      <div className="emp-wrapper">
        <div className="emp-card">
          <div className="emp-header">
            {profileImage ? (
              <img
                src={`https://employee-management-backend-e17j.onrender.com/uploads/${profileImage}`}
                alt={name}
              />
            ) : (
              <div className="emp-avatar">
                {name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="emp-body">
            <h2>{name}</h2>
            <p className="role">{department}</p>

            <div className="emp-info">
              <p><MdEmail /> {email}</p>
              <p><BsTelephoneForwardFill /> {phone}</p>
              <p><MdCurrencyRupee /> ₹{salary}</p>
              <p><FaRegCalendarAlt /> {new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <button onClick={() => navigate("/employee")}>
              Back
            </button>
          </div>
        </div>
      </div>


    </>
  )
}

export default EmpDetails
