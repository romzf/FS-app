// src/components/AppNavbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';

export default function AppNavbar() {
    
    return (
        <Navbar id="navbar" bg="primary" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/logo.png"
                        alt="Home Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
                        {localStorage.getItem('token') ? (
                            <>
                                <Nav.Link as={NavLink} to="/workouts" exact="true">My Workouts</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
