import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datetime from 'react-datetime';
import moment from "moment";
import MomentUtils from "../../../utils/MomentUtils";
import RequestUtils from "../../../utils/RequestUtils";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "./Home.css"
import { Tag } from 'antd';
import logo from "../../../logo.png"
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
    let [currentStartDateTime, setCurrentStartDateTime] = useState(MomentUtils.roundUp(
        moment(new Date()),
        "hour"
    ));

    let [currentEndDateTime, setCurrentEndDateTime] = useState(MomentUtils.roundUp(
        moment(new Date()),
        "hour"
    ).add(1, "hour"));

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
        setCurrentStartDateTime(MomentUtils.roundUp(
            moment(new Date()),
            "hour"
        ));
        setCurrentEndDateTime(MomentUtils.roundUp(
            moment(new Date()),
            "hour"
        ).add(1, "hour"));
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
            .then(response => response.json()) // take response and turn it into JSON object
            .then(data => { // data = JSON object created ^^
                if (!data.ok) {
                    alert("Events could not be populated!");
                    return;
                }
                let sortedLOEvents = sortEvents(data.records);
                setListEvents(sortedLOEvents);


            })
            .catch(error => {
                // alert("Something went wrong! 176");
            });

    }

    function searchEvents(e) {
        e.preventDefault();
        // getting the events from the database
        RequestUtils.get("/getSearchRecords?keywords=" + search) // send out post req and get the response from server
            .then(response => response.json()) // take response and turn it into JSON object
            .then(data => { // data = JSON object created ^^
                if (!data.ok) {
                    alert("Events could not be populated!");
                    return;
                }
                alert("searched")

                let sortedLOEvents = sortEvents(data.records);
                setListEvents(sortedLOEvents);
                


            })
            .catch(error => {
                // alert("Something went wrong! 176");
            });

    }



    // Function that fills in the fields of modal for editing
    // FIXME: Setters async. Change all fields to normal variables
    function populateEventFields(_id) {
        let listEventsCopy = listEvents.filter((event) => {
            return ((event._id).localeCompare(_id) == 0);
        });

        let event = listEventsCopy[0]
        let eventName = event.eventName
        setCurrentEventName(eventName);
        let startTime = event.startTime
        setCurrentStartDateTime(moment(startTime));
        let endTime = event.endTime
        setCurrentEndDateTime(moment(endTime));
        let locationName = event.location
        setCurrentLocationName(locationName)
        setCurrentEventId(event._id);
        setCurrentKeepEvent(event.keepEvent);
    }




    return (
        <>
            <Header></Header>
            <div class="diagonal-box">
	<div class="content my-auto align-middle"> 
    <Form className="calculator col-8 my-auto mx-auto" onSubmit={console.log("asdf")}>
            <h2 className="title">Calculate</h2>
                        <Form.Group className="mb-3">
                            <Row>
                            <Col>
                            <Form.Control type="text" className="col-2" placeholder="Enter event name" value={currentEventName} onChange={(e) => { setCurrentEventName(e.target.value) }} />
                            </Col>
                            <Col>
                            <Form.Control type="text" className="col-2" placeholder="Enter event name" value={currentEventName} onChange={(e) => { setCurrentEventName(e.target.value) }} />
                            </Col>
                            </Row>
                            
                          
                        
                        </Form.Group>
                        <Form.Group className="mb-3">
                           
                            <Form.Control type="text" placeholder="Enter event name" value={currentEventName} onChange={(e) => { setCurrentEventName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        
                            <Form.Control type="number" placeholder="Enter event name" value={currentEventName} onChange={(e) => { setCurrentEventName(e.target.value) }} />
                        </Form.Group>
                


                        <Form.Group className="mb-3">
                      
                            <Form.Control type="text" placeholder="Enter location" value={currentLocationName} onChange={(e) => { setCurrentLocationName(e.target.value) }} />
                        </Form.Group>

                        <Button type="submit" className="color-button">Calculate</Button>
                    </Form>
    
    </div>
</div>
        




          
                    
              

        </>
    );

}

export default Home;
