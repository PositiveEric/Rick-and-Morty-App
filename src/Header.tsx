import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { ImageCarousel } from './Carousel';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Rick and Morty</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/" className="headerLink">
            Home
          </Link>

          <Link to="/planets" className="headerLink">
            Planets
          </Link>

          <Link to="/episodes" className="headerLink">
            Episodes
          </Link>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="warning">Search</Button>
        </Form> */}
      </Navbar>
      <ImageCarousel />
    </div>
  );
};
