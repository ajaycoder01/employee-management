
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
 import './App.css'
import RefreshHandler from './Pages/RefreshHandler';
import EmpManagementApp from './Pages/EmpManagementApp';
import EmpDetails from './Pages/EmpDetails';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/index.html" element={<Navigate to="/" replace />} />
       
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ ADMIN + EMPLOYEE BOTH */}
        <Route
          path="/employee"
          element={<PrivateRoute element={<EmpManagementApp />} />}
        />

        {/* ✅ ADMIN ONLY ROUTE (example) */}
        <Route
          path="/employee/:id"
          element={<EmpDetails />}
        />
      </Routes>
    </>
  );
}

export default App;


