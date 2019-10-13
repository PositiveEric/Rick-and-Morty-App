import React from "react";
import { Navbar } from "react-bootstrap";

export const Footer: React.FC = () => {
  return (
    <Navbar
      id="footer"
      bg="dark"
      variant="dark"
      className="justify-content-center"
    >
      <Navbar.Brand href="https://twitter.com/rickandmorty">
        Twitter
      </Navbar.Brand>
      <Navbar.Brand href="https://www.imdb.com/title/tt2861424/">
        IMDB
      </Navbar.Brand>
      <Navbar.Brand href="https://rickandmortyapi.com/">API</Navbar.Brand>
      <div>© Rick and Morty</div>
    </Navbar>
  );
};
