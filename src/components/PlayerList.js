import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">🎮 Registered Players</h3>
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
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PlayerList;
