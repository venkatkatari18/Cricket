import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const AdminDashboard = ({ setIsAdmin }) => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  const handleDelete = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const headers = [
    { label: 'Email', key: 'email' },
    { label: 'Village', key: 'village' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Specialization', key: 'specialization' },
    { label: 'Jersey Name', key: 'jerseyName' },
    { label: 'T-Shirt Size', key: 'tShirtSize' },
    { label: 'Payment Status', key: 'paymentStatus' },
  ];

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">🏆 Admin Dashboard</h3>

      <Row className="justify-content-center mt-5">
        <Col md={12}>
          <h4 className="text-center mb-3">🏏 Registered Players</h4>
          {players.length > 0 ? (
            <>
              <div className="d-flex justify-content-end mb-3">
                <CSVLink
                  data={players}
                  headers={headers}
                  filename="registered_players.csv"
                  className="btn btn-success"
                >
                  📥 Download CSV
                </CSVLink>
              </div>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Village</th>
                    <th>Mobile</th>
                    <th>Specialization</th>
                    <th>Jersey Name</th>
                    <th>T-Shirt Size</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.email}</td>
                      <td>{player.village}</td>
                      <td>{player.mobile}</td>
                      <td>{player.specialization}</td>
                      <td>{player.jerseyName}</td>
                      <td>{player.tShirtSize}</td>
                      <td
                        className={`text-${player.paymentStatus === 'Success' ? 'success' : 'danger'}`}
                      >
                        {player.paymentStatus}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p className="text-center">No registered players yet! 😎</p>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={4} className="text-center">
          <Button variant="danger" onClick={handleLogout} className="mt-3">
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
