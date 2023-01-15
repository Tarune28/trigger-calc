import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import MomentUtils from "../../utils/MomentUtils";
import RequestUtils from "../../utils/RequestUtils";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from "../../TriggerCalc.png"
import "./Header.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


function Header(props) {

    let [currentTabName, setCurrentTabName] = useState("");

    useEffect(() => {
        if(window.location.pathname == "/") {
            setCurrentTabName("none")
        }
      }, []);

    return (
        <Navbar className="color-nav expand-lg" variant="dark">
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
 
            <Navbar.Brand href="#home">
            <img
              src={logo}
              width="300"
          
              className="d-inline-block align-top mx-2"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
     
        <Container className="float-end">
        <Nav className="float-end mx-5">
            <Nav.Link className={"link"} href="/home">Link tab</Nav.Link>
            <Nav.Link className={"link"} href="/studentReports">Link tab</Nav.Link>
            <Nav.Link className={"link"} href="/dashboard">Link tab</Nav.Link>
          </Nav>
        </Container>
          
          
     
           </Navbar.Collapse>
       
      </Navbar>


    );

}

export default Header;
