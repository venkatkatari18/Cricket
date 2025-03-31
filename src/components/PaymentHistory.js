import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';

const PaymentHistory = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers.filter((player) => player.paymentStatus !== 'Pending'));
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">📊 Payment History</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Email</th>
            <th>Jersey Name</th>
            <th>Amount Paid</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.email}</td>
              <td>{player.jerseyName}</td>
              <td>₹300</td>
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

export default PaymentHistory;
