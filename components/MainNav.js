import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, NavDropdown, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

const MainNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchField, setSearchField] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(current => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };

  const handleInputChange = (event) => {
    setSearchField(event.target.value);
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <Navbar expanded={isExpanded} fixed="top" style={{ backgroundColor: '#2C3E50' }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white', fontWeight: 'bold' }}>Venu Burri</Navbar.Brand>
        <Navbar.Toggle onClick={toggleNavbar} />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link
                onClick={closeNavbar}
                active={router.pathname === "/"}
                className={router.pathname === "/" ? "active" : ""}
                style={{ color: 'white' }}
              >
                Home
              </Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link
                onClick={closeNavbar}
                active={router.pathname === "/search"}
                className={router.pathname === "/search" ? "active" : ""}
                style={{ color: 'white' }}
              >
                Advanced Search
              </Nav.Link>
            </Link>
          </Nav>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search"
              name="search"
              value={searchField}
              onChange={handleInputChange}
              className="me-2"
              style={{ borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>
          <Nav className="ms-3">
            <NavDropdown title={<span style={{ color: 'white' }}>User Name</span>} id="basic-nav-dropdown" menuVariant="dark">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item onClick={closeNavbar} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item onClick={closeNavbar} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
