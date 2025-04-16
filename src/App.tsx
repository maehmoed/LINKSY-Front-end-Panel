import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Home from './pages/Home'; // Keep Home component if needed elsewhere
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Make Dashboard the default route */}
            <Route path="/" element={<Dashboard />} />

            {/* Explicit route for Dashboard (optional, but good practice) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Other routes */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />

            {/* Keep /home if you need it, otherwise it can be removed */}
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
