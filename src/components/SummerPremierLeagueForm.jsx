import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Table } from 'react-bootstrap';

const SummerPremierLeagueForm = () => {
  const [formData, setFormData] = useState({
    name: '', // ✅ Added name field
    email: '',
    file: null,
    village: '',
    mobile: '',
    specialization: '',
    jerseyName: '',
    tShirtSize: '',
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [players, setPlayers] = useState([]);
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Load players from local storage on mount
  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
    setErrors({ ...errors, file: '' });
  };

  // Form Validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required!';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required!';
      valid = false;
    }
    if (!formData.file) {
      newErrors.file = 'Photo upload is required!';
      valid = false;
    }
    if (!formData.village) {
      newErrors.village = 'Please select your village!';
      valid = false;
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Valid mobile number is required!';
      valid = false;
    }
    if (!formData.specialization) {
      newErrors.specialization = 'Please choose your specialization!';
      valid = false;
    }
    if (!formData.jerseyName) {
      newErrors.jerseyName = 'Jersey name is required!';
      valid = false;
    }
    if (!formData.tShirtSize) {
      newErrors.tShirtSize = 'Please select a t-shirt size!';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      initiatePayment();
    }
  };

  // Initiate Razorpay Payment
  const initiatePayment = () => {
    const options = {
      key: 'rzp_test_B1zVaAUxY0dWRG', // Razorpay Key
      amount: 30000, // ₹300 in paise
      currency: 'INR',
      name: 'Summer Premier League',
      description: 'Player Registration Fee',
      handler: function (response) {
        alert('Payment Successful! 🎉');
        setPaymentSuccess(true);
        handleSuccessfulPayment();
      },
      prefill: {
        name: formData.jerseyName || 'Player Name',
        email: formData.email,
        contact: formData.mobile,
      },
      theme: {
        color: '#0d6efd',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', function (response) {
      alert('Payment Failed. Please try again! ❌');
    });
  };

  // Handle Successful Payment - Save Data and Show Thank You Page
  const handleSuccessfulPayment = () => {
    const newPlayer = {
      ...formData,
      id: Date.now(),
      paymentStatus: 'Success',
    };

    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));

    // Show the Thank You page
    setShowThankYou(true);

    // ✅ Clear form after submission
    setFormData({
      name: '',
      email: '',
      file: null,
      village: '',
      mobile: '',
      specialization: '',
      jerseyName: '',
      tShirtSize: '',
    });

    setPaymentSuccess(false); // Reset payment status for next submission
  };

  // Admin Login Handler
  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      alert('Admin Access Granted! ✅');
    } else {
      alert('Incorrect Password. Access Denied! ❌');
    }
  };

  return (
    <Container className="my-5">
      {showThankYou ? (
        <Row className="justify-content-center mt-5">
          <Col md={6} className="text-center">
            <Card className="shadow-lg p-4 bg-light rounded-lg">
              <h2 className="text-success mb-4">🎉 Thank You!</h2>
              <p className="lead">Your registration has been successfully submitted!</p>
              <Button
                variant="primary"
                onClick={() => setShowThankYou(false)}
                className="mt-3"
              >
                Register Another Player
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-lg rounded-lg p-4 bg-light">
                <Card.Body>
                  <h2 className="text-center text-success mb-4">
                    Summer Premier League Registration 🏏
                  </h2>

                  <Form onSubmit={handleSubmit}>
                    {/* Name */}
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    {/* File Upload */}
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Your Photo</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        isInvalid={!!errors.file}
                        accept="image/*"
                      />
                      <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Village */}
                    <Form.Group className="mb-3">
                      <Form.Label>Village</Form.Label>
                      <Form.Select
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        isInvalid={!!errors.village}
                      >
                        <option value="">Choose...</option>
                        <option value="Bhavaram">Bhavaram</option>
                        <option value="Govindpuram">Govindpuram</option>
                        <option value="Gollalugunta">Gollalugunta</option>
                        <option value="Gurrapalem">Gurrapalem</option>
                        <option value="Iripaka">Iripaka</option>
                        <option value="Jaggampeta">Jaggampeta</option>
                        <option value="Katravulapalli">Katravulapalli</option>
                        <option value="Kothuru">Kothuru</option>
                        <option value="Mallepalli">Mallepalli</option>
                        <option value="Manyavaripalem">Manyavaripalem</option>
                        <option value="Maripaka">Maripaka</option>
                        <option value="Mallisala">Mallisala</option>
                        <option value="Mavidada">Mavidada</option>
                        <option value="Nagaram">Nagaram</option>
                        <option value="Neeladriraopeta">Neeladriraopeta</option>
                        <option value="Rajapudi">Rajapudi</option>
                        <option value="Talluru">Talluru</option>
                        <option value="Thimmapuram">Thimmapuram</option>
                        <option value="Vengayammapuram">Vengayammapuram</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.village}</Form.Control.Feedback>
                    </Form.Group>


                    {/* Mobile */}
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        isInvalid={!!errors.mobile}
                      />
                      <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Specialization */}
                    <Form.Group className="mb-3">
                      <Form.Label>Specialization</Form.Label>
                      <Form.Select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        isInvalid={!!errors.specialization}
                      >
                        <option value="">Choose...</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="All-Rounder">All-Rounder</option>
                        <option value="Wicket Keeper">Wicket Keeper</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.specialization}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Jersey Name */}
                    <Form.Group className="mb-3">
                      <Form.Label>Jersey Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="jerseyName"
                        value={formData.jerseyName}
                        onChange={handleChange}
                        isInvalid={!!errors.jerseyName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.jerseyName}</Form.Control.Feedback>
                    </Form.Group>

                    {/* T-Shirt Size */}
                    <Form.Group className="mb-3">
                      <Form.Label>T-Shirt Size</Form.Label>
                      <Form.Select
                        name="tShirtSize"
                        value={formData.tShirtSize}
                        onChange={handleChange}
                        isInvalid={!!errors.tShirtSize}
                      >
                        <option value="">Choose...</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.tShirtSize}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                      Pay ₹300 & Register
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SummerPremierLeagueForm;
