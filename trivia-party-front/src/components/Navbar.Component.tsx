import { Container, Nav, Navbar } from "react-bootstrap";

function NavbarComponent(){
    
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/home">Trivia Party</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/about">About Us</Nav.Link>
                    <Nav.Link href="/topartists">Top Artists</Nav.Link>
                </Nav>
                { localStorage.getItem("access_token") &&
                    <Nav className="ml-auto">
                    <a href="http://localhost:3000/" onClick={logOut}>Logout</a>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
}

function logOut(){
    localStorage.removeItem("access_token")
    localStorage.removeItem("code_verifier")
    localStorage.removeItem("refresh_token")
}

export default NavbarComponent;