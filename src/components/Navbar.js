import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'

const NavigationBar = ({ isAdmin }) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                {/* <img src={Logo} alt='' width="25"/> */}
                <Navbar.Brand as={Link} to="/"> <img src={Logo} alt='' width="25"/> Summer Premier League</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!isAdmin && (
                            <>
                                <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
                                <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
