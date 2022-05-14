import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import "../styles/prescription.css";

function Prescription(props) {

    const [prescription, setPrescription] = useState({
        "notes": "",
        "vitals": "",
        "medicines": "",
        "advice": ""
    });

    const [patientAddr, setPatientAddr] = useState(sessionStorage.getItem("patientAddr"));

    const updatePrescription = (event) => {
        const {name, value} = event.target;
        setPrescription((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(patientAddr == ""){
            toast.error("Patient's Ethereum Address Not Provided");
            return;
        }

        const doctorAddr = sessionStorage.getItem("addr");

        //TODO: check if pateint has authoriszed this doctor 
        //TODO: if auth then add this pres in patients's contract
        
        setPrescription({
            "notes": "",
            "vitals": "",
            "medicines": "",
            "advice": ""
        })
        setPatientAddr("");
        
    }

    return (
        <div className='prescriptionDiv'>
            <h1 className='heading1'>Prescription</h1>
            <Form className="prescriptionFormDiv">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control onChange={updatePrescription} name='notes' value={prescription.notes} as="textarea" rows={3} placeholder="High Fever" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Vitals</Form.Label>
                    <Form.Control onChange={updatePrescription} name='vitals' value={prescription.vitals} as="textarea" placeholder="101 °C" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Medicines</Form.Label>
                    <Form.Control onChange={updatePrescription} name='medicines' value={prescription.medicines} as="textarea" rows={3}  placeholder="Paracetamol 100mg" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Advice</Form.Label>
                    <Form.Control onChange={updatePrescription} name='advice' value={prescription.advice} as="textarea" placeholder="Eat Ice" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Patient's Ethereum Address</Form.Label>
                    <Form.Control disabled onChange={(event) => {setPatientAddr(event.target.value)}} value={patientAddr} placeholder="0x725....." />
                </Form.Group>
                <Button className='customButton' variant="primary" type="submit" onClick={(event) => onSubmit(event)}>
                    Submit
                </Button>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Prescription;