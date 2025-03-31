import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light shadow">
      <h4 className="text-center py-3">🏏 SPL Dashboard</h4>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link to="/" className="text-decoration-none text-dark">
            📄 Register Player
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/player-list" className="text-decoration-none text-dark">
            🎮 Player List
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/payment-history" className="text-decoration-none text-dark">
            📊 Payment History
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
