import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datetime from "react-datetime";
import moment from "moment";
import MomentUtils from "../../../utils/MomentUtils";
import RequestUtils from "../../../utils/RequestUtils";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "./Home.css";
import { Tag } from "antd";
import { Dropdown, InputGroup, DropdownButton } from "react-bootstrap";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";

function Home() {
  /**  State Variables **/

  // State: hold a list of events

  let [search, setSearch] = useState("");

  let [metabolicRate, setMetabolicmetabolicRate] = useState("");

  let [daysAfter, setCurrentDaysAfter] = useState(null);

  let [currentLocationName, setCurrentLocationName] = useState("");

  let [currentKeepEvent, setCurrentKeepEvent] = useState(false);

  // Data type of startDateTime IN DB is String: MM/DD/YY hh:mm A
  // Data type of startDateTime IN APPLICATION is Moment object
  let [currentStartDateTime, setCurrentStartDateTime] = useState(
    MomentUtils.roundUp(moment(new Date()), "hour")
  );

  let [currentEndDateTime, setCurrentEndDateTime] = useState(
    MomentUtils.roundUp(moment(new Date()), "hour").add(1, "hour")
  );

  let [medication, setMedication] = useState("");

  let [dosage, setDosage] = useState([{
    "value": "",
    "label": "Units"}
  ]);

  let [selectedDossage, setSelectedDossage] = useState("")

  let [results, setResults] = useState("");

  let [resultsModal, setResultsModal] = useState(false);

  function showResults(e) {
    e.preventDefault();
    setResultsModal(true);
  }

  function hideResults() {
    setResultsModal(false);
   
  }
  // function clearResults() {
  //   setSelectedDossage("");
  //   setMedication("");
  //   setMetabolicmetabolicRate("");
  //   setCurrentDaysAfter(null);
  // }

  

  function dosageSetter (brand) {
    let dosages = null;
    if(brand == "OVIDREL") {
      dosages = [{
        "value": "250",
        "label": "MCG"}
      ]
    }
    if(brand == "NOVAREL") {
      dosages = [{
        "value": "5000",
        "label": "USP"
      },{
        "value": "10000",
        "label": "USP"
      }]
    }
    if(brand == "PREGNYL") {
      dosages = [{
        "value": "5000",
        "label": "USP"
      },{
        "value": "10000",
        "label": "USP"
      }]
    }
    setDosage(dosages);
  }

  function calculate(e) {
   
    if(medication == "OVIDREL") {
      if(metabolicRate == "SLOW") {
        if(daysAfter <= 11) {
          return "Pregnancy test will not be reliable";
        }
        if(daysAfter > 11 && daysAfter <= 14) {
          return "Pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be ";
        }
        if(daysAfter >= 15) {
          return "All pregnancy tests on the market over 25MlU/mL should be reliable";
        }
      }
      if(metabolicRate == "AVERAGE") {
        if(daysAfter <= 9) {
          return "Pregnancy test won’t be reliable";
        }
        if(daysAfter >= 10 && daysAfter <= 12) {
          return "Pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be";
        }
        if(daysAfter >= 13) {
          return "All pregnancy tests on the market over 25MlU/mL should be reliable";
        }
      }
      if(metabolicRate == "FAST") {
        if(daysAfter <= 7) {
          return "Pregnancy test won’t be reliable";
        }
        if(daysAfter >= 8 && daysAfter <= 9) {
          return "10-12 days past trigger → pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be";
        }
        if(daysAfter >= 10) {
          return "All pregnancy tests on the market over 25MlU/mL should be reliable";
        }
      }
      
    }
    if(medication == "NOVAREL" || medication == "PREGNYL") {
      
      if(parseInt(selectedDossage) == 5000) {
        if(metabolicRate == "SLOW") {
          if(daysAfter <= 10) {
            return "Pregnancy test will not be reliable";
          }
          if(daysAfter >= 11 && daysAfter <= 12) {
            return "Questionable - wait 1-2 more day to be sure ";
          }
          if(daysAfter > 12 && daysAfter <= 14) {
            return "pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be ";
          }
          if(daysAfter >= 15) {
            return "All pregnancy tests on the market over 25MlU/mL should be reliable";
          }
        }
        if(metabolicRate == "AVERAGE") {
          if(daysAfter <= 9) {
            return "Pregnancy test won’t be reliable";
          }
          if(daysAfter >= 10 && daysAfter <= 11) {
            return "Pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be";
          }
          if(daysAfter >= 12) {
            return "All pregnancy tests on the market over 25MlU/mL should be reliable";
          }
        }
        if(metabolicRate == "FAST") {
          if(daysAfter <= 7) {
            return "Pregnancy test won’t be reliable"
          }
          if(daysAfter == 8) {
            return "questionable - wait one more day to be sure"
          }
          if(daysAfter == 9) {
            return "pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be";
          }
          if(daysAfter >= 10) {
            return "All pregnancy tests on the market over 25MlU/mL should be reliable";
          }
        }
      }
      if(parseInt(selectedDossage) == 10000) {
        console.log("here")
        if(metabolicRate == "SLOW") {
          if(daysAfter <= 12) {
            return "Pregnancy test will not be reliable";
          }
          if(daysAfter > 12 && daysAfter <= 14) {
            return "pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be  ";
          }
          if(daysAfter >= 15) {
            return "all pregnancy tests on the market over 25MlU/mL should be reliable";
          }
        }
        if(metabolicRate == "AVERAGE") {
          if(daysAfter <= 10) {
            return "pregnancy test won’t be reliable";
          }
          if(daysAfter > 10 && daysAfter <= 12) {
            return "pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be";
          }
          if(daysAfter >= 13) {
            return "all pregnancy tests on the market over 25MlU/mL should be reliable";
          }
        }
        if(metabolicRate == "FAST") {
          console.log("he1re")
          if(daysAfter <= 9) {
            return "pregnancy test won’t be reliable";
          }
          if(daysAfter == 10) {
            return "pregnancy test with a 25MlU/mL sensitivity will be reliable, but a 6.5 MlU/mL will not be "
          }
          if(daysAfter >= 11) {
            return "All pregnancy tests on the market should be reliable";
          }
        }
      }
    }
    console.log(daysAfter, metabolicRate, dosage, medication)
    
    
  
  }

  /** Helper Functions **/

  function test(e) {
    e.preventDefault();
    console.log("Test");
    debugger;
  }


  return (
    <>
      <Header></Header>
      <div className="diagonal-box">
        <div className="content my-auto align-middle">
          <Form className="calculator col-8 my-auto mx-auto" onSubmit={showResults}>
            <h2 className="title pb-2">Calculate Testing Time</h2>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Select
                    as="select"
                    value={medication}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setMedication(e.target.value);
                      dosageSetter(e.target.value);
                    }}
                  >
                    <option value="null">Select a Value</option>
                    <option value="OVIDREL">Ovidrel</option>
                    <option value="NOVAREL">Novarel</option>
                    <option value="PREGNYL">Pregnyl</option>
                  </Form.Select>
                </Col>
                <Col>
                  <InputGroup className="">
                    <Form.Select
                    as="select"
                    value={selectedDossage}
                    onChange={(e) => {
                      setSelectedDossage(e.target.value);
                    }}
                  >
                    {dosage.map((dosage) => {
                      return (
                        <option>{dosage.value}</option>
                      );


                    })}
                 
                  </Form.Select>

                  <InputGroup.Text className="dark">
                  {dosage[0]["label"]}
                </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter days"
                  value={daysAfter}
                  onChange={(e) => {
                    setCurrentDaysAfter(e.target.value);
                  }}
                />

 

                <InputGroup.Text className="dark">
                  from previous trigger
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
               <Form.Select
                    as="select"
                    value={metabolicRate}
                    onChange={(e) => {
                      setMetabolicmetabolicRate(e.target.value);
                    }}
                  >
                    <option value="">Assumed Metabolic metabolicRate</option>
                    <option value="SLOW">Slow - Worst Case Scenario</option>
                    <option value="AVERAGE">Average</option>
                    <option value="FAST">Fast - Best Case Scenario</option>
                  </Form.Select>

             
              </InputGroup>
            </Form.Group>

            <Button type='submit' variant="dark" onClick={calculate}>
              Calculate
            </Button>
          </Form>
        </div>
      </div>
      <Container className="ab pt-5 mt-3 pb-5">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Information About The Calculator</h2>
          <p className="par">
            1. The information is based on the generally accepted figure that{" "}
            <a href="https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a683e58a-63ea-44b8-a326-1a99a537bcf2&type=display">
              29 ± 6 hours is the half life range for subcutaneously injected
              HCG
            </a>{" "}
            (the active ingredient in all of the medications listed) intended
            for ovulation stimulation. This figure means that, on average,
            people will metabolize half of the remaining HCG in their body every
            29 hours. For some individuals, this figure will be closer to 35
            hours with a slow metabolic metabolicRate; for others, it will be closer to
            23 hours with a faster metabolic metabolicRate.{" "}
          </p>
          <p className="par">
            2. This information is intended as an <strong>estimate only</strong>
            . The metabolic metabolicRate for medications can differ drastically from
            person to person,{" "}
            <a href="https://genesight.com/genetic-insights/fast-slow-or-in-between-how-your-genes-affect-medication-success/">
              pending numerous factors
            </a>
            .
          </p>
          <p className="par">
            3. The sensitivity of pregnancy tests on the market vary
            significantly. If you are not sure what your pregnancy test
            sensitivity is,{" "}
            <a href="https://www.fairhavenhealth.com/hpt">this site offers</a>{" "}
            some helpful information as you interpret your calculator results.{" "}
          </p>
          <p className="par">
            <strong>
              4. This website is not intended to be a replacement for your
              medical provider’s advice, nor is it intended to be medical
              advice.
            </strong>
          </p>
        </Col>
      </Container>
      <Modal show={resultsModal} onHide={hideResults}>
        <Modal.Header closeButton>
          <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>{calculate()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideResults}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer></Footer>
    </>
  );
}

export default Home;
