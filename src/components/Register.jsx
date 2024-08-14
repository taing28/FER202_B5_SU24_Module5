import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [userId, setUserId] = useState(0);
    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [cfPasswordErr, setCfPasswordErr] = useState("");
    const [street, setStreet] = useState("");
    const [streetErr, setStreetErr] = useState("");
    const [city, setCity] = useState("");
    const [cityErr, setCityErr] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [zipCodeErr, setZipCodeErr] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9999/users")
            .then(res => setUserId(res.data.length + 1))
            .catch(err => console.log(err));
    }, [])

    const handleRegister = () => {
        let isValid = true;

        if (name.length === 0) {
            setNameErr("Name must not empty");
            isValid = false;
        } else {
            setNameErr("");
        }
        if (email.length === 0) {
            setEmailErr("Email must not empty");
            isValid = false;
        } else {
            setEmailErr("");
        }
        if (password.length === 0) {
            setPasswordErr("Password must not empty");
            isValid = false;
        } else {
            setPasswordErr("");
        }
        if (cfPassword.length === 0) {
            setCfPasswordErr("Confirm password must not empty");
            isValid = false;
        } else {
            setCfPasswordErr("");
        }
        if (street.length === 0) {
            setStreetErr("Street must not empty");
            isValid = false;
        } else {
            setStreetErr("");
        }
        if (city.length === 0) {
            setCityErr("City must not empty");
            isValid = false;
        } else {
            setCityErr("");
        }
        if (zipCode.length === 0) {
            setZipCodeErr("Zip code must not empty");
            isValid = false;
        } else {
            setZipCodeErr("");
        }

        if (password !== cfPassword) {
            alert("Password not matched");
            isValid = false;
        }
        if (isValid) {
            const account = {
                email: email,
                password: password,
                activeCode: Math.random().toString(),
                isActive: false,
            }
            const address = {
                street: street,
                city: city,
                zipCode: zipCode,
            }

            const formData = {
                userId: userId,
                name: name,
                account,
                address,
            }
            axios.post("http://localhost:9999/users", formData)
                .then(res => {
                    console.log(res.data);
                    nav("/login");
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Row>
            <Col>
                <div className="wrapper-login">
                    <h2 style={{ textAlign: "center" }}>Sign in</h2>
                    <Form>
                        <FormGroup>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nguyen Van A"
                                onChange={e => setName(e.target.value)}
                            />
                        </FormGroup>
                        {nameErr && <span className="error">{nameErr}</span>}
                        <br />
                        <FormGroup>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="abc@gmail.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        {emailErr && <span className="error">{emailErr}</span>}
                        <br />
                        <FormGroup>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="*********"
                                onChange={e => setPassword(e.target.value)}

                            />
                        </FormGroup>
                        {passwordErr && <span className="error">{passwordErr}</span>}
                        <br />
                        <FormGroup>
                            <Form.Label>Re-password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="*********"
                                onChange={e => setCfPassword(e.target.value)}
                            />
                        </FormGroup>
                        {cfPasswordErr && <span className="error">{cfPasswordErr}</span>}
                        <br />
                        <FormGroup>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Le Van Luong, Tran Duy Hung,..."
                                onChange={e => setStreet(e.target.value)}
                            />
                        </FormGroup>
                        {streetErr && <span className="error">{streetErr}</span>}
                        <br />
                        <FormGroup>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ha Noi, Ho Chi Minh,..."
                                onChange={e => setCity(e.target.value)}
                            />
                        </FormGroup>
                        {cityErr && <span className="error">{cityErr}</span>}
                        <br />
                        <FormGroup>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="10000,..."
                                onChange={e => setZipCode(e.target.value)}
                            />
                        </FormGroup>
                        {zipCodeErr && <span className="error">{zipCodeErr}</span>}
                        <br />
                        <FormGroup style={{ textAlign: "center", marginTop: "4px" }}>
                            <Button variant="success" onClick={handleRegister}>Register</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}