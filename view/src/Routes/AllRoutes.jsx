import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";


// Component that defines all the routes in the application
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Route for the homepage */}
         <Route path="/" element={<Homepage />} /> 

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the registration page */}
        <Route path="/register" element={<Register />} />

        <Route path="/board/:boardId" element={<Homepage />}   />

      </Routes>
    </div>
  );
};

export default AllRoutes;
