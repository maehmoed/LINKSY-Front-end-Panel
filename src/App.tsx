import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Login from './pages/Login';
import CustomerManagement from './pages/CustomerManagement'; // Import the list page
import CustomerDetails from './pages/CustomerDetails'; // Import the new details page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Make Dashboard the default route */}
            <Route path="/" element={<Dashboard />} />

            {/* Explicit route for Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Route for Customer Management List */}
            <Route path="/customers" element={<CustomerManagement />} />

            {/* Route for Customer Details - uses a dynamic parameter */}
            <Route path="/customers/:customerId" element={<CustomerDetails />} />

            {/* Other routes */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />

            {/* Optional: Redirect any unknown paths back to dashboard */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
