import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import RegistrationForm from './components/SummerPremierLeagueForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <NavigationBar  isAdmin={isAdmin}/>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        {isAdmin && <Route path="/admin/dashboard" element={<AdminDashboard setIsAdmin={setIsAdmin}/>} />}
        {/* Add other routes as needed */}
      </Routes>
    </>
  );
};

export default App;
