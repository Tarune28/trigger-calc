import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../TriggerCalc.png";
import "./Header.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


function Header(props) {
  let [currentTabName, setCurrentTabName] = useState("");

  useEffect(() => {
    if (window.location.pathname == "/") {
      setCurrentTabName("none");
    }
  }, []);

  return (

    <Navbar expand="lg">
      <Container>
      <Navbar.Brand href="#home">
         <img
          src={logo}
          width="300"
          className="d-inline-block align-top mx-2"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav.Link className={"link mx-3"} href="/">
          Home
        </Nav.Link>
       <Nav.Link className={"link mx-3"} href="/comingSoon">
         About
        </Nav.Link>
       <Nav.Link className={"link mx-3"} href="/comingSoon">
          Ebook
        </Nav.Link>
       <Nav.Link className={"link mx-3"} href={""}>
          Contact
         </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    // <Navbar className="color-nav expand-lg" variant="dark">
      

    //   <Navbar.Brand href="#home">
    //     <img
    //       src={logo}
    //       width="300"
    //       className="d-inline-block align-top mx-2"
    //       alt="React Bootstrap logo"
    //     />
    //   </Navbar.Brand>

    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="float-end mx-5">
    //         <Nav.Link className={"link mx-3"} href="/home">
    //           About
    //         </Nav.Link>
    //         <Nav.Link className={"link mx-3"} href="/studentReports">
    //           Ebook
    //         </Nav.Link>
    //         <Nav.Link className={"link mx-3"} href="/dashboard">
    //           Contact
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
     
    // </Navbar>
  );
}

export default Header;
