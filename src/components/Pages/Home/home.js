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
  let [listEvents, setListEvents] = useState([]);

  let [listOldEvents, setListOldEvents] = useState([]);

  let [showModal, setShowModal] = useState(true);

  let [showOldEvents, setShowOldEvents] = useState(false);

  let [editing, setEditing] = useState(false);

  let [search, setSearch] = useState("");

  let [currentEventId, setCurrentEventId] = useState("");

  let [currentEventName, setCurrentEventName] = useState("");

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

  /** Helper Functions **/

  useEffect(populateEvents, []);

  function showOldEventsModal() {
    setShowOldEvents(true);
  }

  function hideOldEventsModal() {
    setShowOldEvents(false);
  }

  function showEventModal() {
    setShowModal(true);
  }

  function hideEventModal() {
    setShowModal(false);
  }

  function sortEvents(list) {
    return list.sort((event1, event2) => {
      let ev1ST = moment(event1.startTime);
      let ev2ST = moment(event2.startTime);
      return ev1ST.diff(ev2ST);
    });
  }

  function resetEventForm() {
    setCurrentEventName("");
    setCurrentStartDateTime(MomentUtils.roundUp(moment(new Date()), "hour"));
    setCurrentEndDateTime(
      MomentUtils.roundUp(moment(new Date()), "hour").add(1, "hour")
    );
    setCurrentLocationName("");
    setCurrentEventId("");
  }

  /** CRUD FUNCTIONS **/

  // CREATE

  // Function called when "Add Event" button is pressed
  function handleAdd() {
    // 1. Clear the form
    resetEventForm();

    // 2. Set editing to false
    setEditing(false);

    // 3. Show the modal
    showEventModal();
  }

  // Creation of eve

  // READ
  function populateEvents() {
    // getting the events from the database
    RequestUtils.get("/getAllRecords") // send out post req and get the response from server
      .then((response) => response.json()) // take response and turn it into JSON object
      .then((data) => {
        // data = JSON object created ^^
        if (!data.ok) {
          alert("Events could not be populated!");
          return;
        }
        let sortedLOEvents = sortEvents(data.records);
        setListEvents(sortedLOEvents);
      })
      .catch((error) => {
        // alert("Something went wrong! 176");
      });
  }

  function searchEvents(e) {
    e.preventDefault();
    // getting the events from the database
    RequestUtils.get("/getSearchRecords?keywords=" + search) // send out post req and get the response from server
      .then((response) => response.json()) // take response and turn it into JSON object
      .then((data) => {
        // data = JSON object created ^^
        if (!data.ok) {
          alert("Events could not be populated!");
          return;
        }
        alert("searched");

        let sortedLOEvents = sortEvents(data.records);
        setListEvents(sortedLOEvents);
      })
      .catch((error) => {
        // alert("Something went wrong! 176");
      });
  }

  // Function that fills in the fields of modal for editing
  // FIXME: Setters async. Change all fields to normal variables
  function populateEventFields(_id) {
    let listEventsCopy = listEvents.filter((event) => {
      return event._id.localeCompare(_id) == 0;
    });

    let event = listEventsCopy[0];
    let eventName = event.eventName;
    setCurrentEventName(eventName);
    let startTime = event.startTime;
    setCurrentStartDateTime(moment(startTime));
    let endTime = event.endTime;
    setCurrentEndDateTime(moment(endTime));
    let locationName = event.location;
    setCurrentLocationName(locationName);
    setCurrentEventId(event._id);
    setCurrentKeepEvent(event.keepEvent);
  }

  return (
    <>
      <Header></Header>
      <div class="diagonal-box">
        <div class="content my-auto align-middle">
          <Form
            className="calculator col-8 my-auto mx-auto"
            onSubmit={console.log("asdf")}
          >
            <h2 className="title pb-2">Calculate Testing Time</h2>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Select aria-label="Default select example">
                    <option>Brand of Medication</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
                <Col>
                  <InputGroup className="">
                    <Form.Control
                      type="text"
                      placeholder="Dosage"
                      value={currentEventName}
                      onChange={(e) => {
                        setCurrentEventName(e.target.value);
                      }}
                    />

                    <DropdownButton
                      variant="dark"
                      title="Units"
                      id="input-group-dropdown-2"
                      align="end"
                    >
                      <Dropdown.Item href="#">Action</Dropdown.Item>
                      <Dropdown.Item href="#">Another action</Dropdown.Item>
                      <Dropdown.Item href="#">
                        Something else here
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="number"
                placeholder="Enter days"
                value={currentEventName}
                onChange={(e) => {
                  setCurrentEventName(e.target.value);
                }} />
                
                <Form.Control type="number"
                placeholder="Enter hours"
                value={currentEventName}
                onChange={(e) => {
                  setCurrentEventName(e.target.value);
                }} />

                <InputGroup.Text className="dark">from previous trigger.</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
            <InputGroup>
                <Form.Control type="number"
                placeholder="Enter assumed metabolic rate"
                value={currentEventName}
                onChange={(e) => {
                  setCurrentEventName(e.target.value);
                }} />

                <DropdownButton
                      variant="dark"
                      title="Units"
                      id="input-group-dropdown-2"
                      align="end"
                    >
                      <Dropdown.Item href="#">Action</Dropdown.Item>
                      <Dropdown.Item href="#">Another action</Dropdown.Item>
                      <Dropdown.Item href="#">
                        Something else here
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton>
              </InputGroup>
            </Form.Group>

          

            <Button type="submit" variant="dark">
              Calculate
            </Button>
          </Form>
        </div>
      </div>
      <Container className="ab pt-5 mt-3 pb-5">

      <Col md={{ span: 6, offset: 3 }}>
        <h2 class="text-center">Information About The Calculator</h2>
      <p class="par">1. The information is based on the generally accepted figure that <a href="https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a683e58a-63ea-44b8-a326-1a99a537bcf2&type=display">29 ± 6 hours is the half life range for subcutaneously injected HCG</a> (the active ingredient in all of the medications listed) intended for ovulation stimulation. This figure means that, on average, people will metabolize half of the remaining HCG in their body every 29 hours. For some individuals, this figure will be closer to 35 hours with a slow metabolic rate; for others, it will be closer to 23 hours with a faster metabolic rate. </p>
      <p class="par">2. This information is intended as an <strong>estimate only</strong>. The metabolic rate for medications can differ drastically from person to person, <a href="https://genesight.com/genetic-insights/fast-slow-or-in-between-how-your-genes-affect-medication-success/">pending numerous factors</a>.</p>
      <p class="par">3. The sensitivity of pregnancy tests on the market vary significantly. If you are not sure what your pregnancy test sensitivity is, <a href="https://www.fairhavenhealth.com/hpt">this site offers</a> some helpful information as you interpret your calculator results. </p>
      <p class="par"><strong>4. This website is not intended to be a replacement for your medical provider’s advice, nor is it intended to be medical advice.</strong></p>
      </Col>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Home;
