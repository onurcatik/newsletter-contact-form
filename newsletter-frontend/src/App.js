import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../components/Home";
import SubscriptionForm from "../src/components/SubscriptionForm";
import ContactForm from "../src/components/ContactForm";
import AdminDashboard from "../src/components/AdminDashboard";
import "./App.css"
import Navbar from "./components/Navbar";



function AppRouter() {
  return (
    <Router>
       <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<SubscriptionForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
