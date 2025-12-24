

const BASE_URL = 'https://employee-management-backend-e17j.onrender.com';

// 🔹 Get token header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ================= GET ALL EMPLOYEES =================
export const GetAllEmp = async (search = '', page = 1, limit = 5) => {
  try {
    const result = await fetch(`${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`);
    return await result.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// ================= CREATE EMPLOYEE =================
export const CreateEmp = async (empObj) => {
  try {
    const formData = new FormData();
    for (const key in empObj) formData.append(key, empObj[key]);

    const result = await fetch(`${BASE_URL}/api/employees`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData
    });

    return await result.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// ================= UPDATE EMPLOYEE =================
export const UpdateEmpById = async (empObj, id) => {
  try {
    const formData = new FormData();
    for (const key in empObj) formData.append(key, empObj[key]);

    const result = await fetch(`${BASE_URL}/api/employees/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: formData
    });

    return await result.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// ================= DELETE EMPLOYEE =================
export const DeleteEmpById = async (id) => {
  try {
    const result = await fetch(`${BASE_URL}/api/employees/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return await result.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// ================= GET EMPLOYEE BY ID =================
export const GetEmpById = async (id) => {
  try {
    const result = await fetch(`${BASE_URL}/api/employees/${id}`);
    return await result.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};













