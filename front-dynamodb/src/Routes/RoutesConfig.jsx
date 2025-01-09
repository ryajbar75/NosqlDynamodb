import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AddDepartmentForm from '../Compononets/Departement/AddDepartmentForm';
import DepartmentList from '../Compononets/Departement/Departement';
import EmployeeList from '../Compononets/ListEmployees/ListEmployees';
import Dashboard from '../Compononets/Dashbord/Dashboard';
import AddEmployeeWithCapture from '../Compononets/AddEmployee/AddEmployee';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-employee" element={<AddEmployeeWithCapture />} />
      <Route path="/list-employees" element={<EmployeeList/>} />
      <Route path="/apartment" element={<DepartmentList/>} />
      <Route path="/add-department" element={<AddDepartmentForm/>} />
    </Routes>
  );
};

export default RoutesConfig;
