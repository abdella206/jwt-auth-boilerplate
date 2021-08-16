import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar(props) {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Welcome To Language Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/home'>Home</Nav.Link>
                            <Nav.Link href='/language'>Language Tracker</Nav.Link>
                            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link eventKey={2} onClick={props.logout} href="/"> Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
