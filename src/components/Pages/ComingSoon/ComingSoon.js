import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datetime from "react-datetime";
import moment from "moment";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Tag } from "antd";
import { Dropdown, InputGroup, DropdownButton } from "react-bootstrap";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import "./ComingSoon.css";

function ComingSoon() {


  return (
    <>
      <Header></Header>
        <div className="comingSoon pt-5 mt-5">
            <h1>Coming Soon!</h1>
        </div>
        <Footer/>
    </>
   
  );
}

export default ComingSoon;
