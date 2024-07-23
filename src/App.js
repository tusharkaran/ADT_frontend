import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
// import AddTicket from './components/AddTicket';
import './components/dashboard.css'

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/add-ticket">Add Ticket</Link></li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/add-ticket" element={<AddTicket />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
