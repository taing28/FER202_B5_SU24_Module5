import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9999/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleLogin = () => {
        let isValid = true;

        if (email.length === 0) {
            isValid = false;
            setEmailError("Email must not empty");
        } else {
            setEmailError("");
        }

        if (password.length === 0) {
            isValid = false;
            setPasswordError("Password must not empty");
        } else {
            setPasswordError("");
        }

        if (isValid) {
            const user = users?.find(u => u.account.email === email && u.account.password === password);
            if (user === null || user === undefined) {
                alert("User not found")
            } else if (!user.account.isActive) {
                alert("Account is not actived")
            } else {
                const { id, name, address: { street, city, zipCode } } = user;
                localStorage.setItem("user", JSON.stringify({ id, name, street, city, zipCode }));
                navigate("/");
            }
        }
    }

    return (
        <Row>
            <Col>
                <div className="wrapper-login">
                    <h2 style={{ textAlign: "center" }}>Sign in</h2>
                    <Form>
                        <FormGroup>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="abc@gmail.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        {emailError && <span className="error">{emailError}</span>}
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
                        {passwordError && <span className="error">{passwordError}</span>}
                        <br />
                        <div className="d-flex justify-content-between">
                                <div><Link to={"/register"}>Register</Link></div>
                                <div><Link>Forgot password?</Link></div>
                        </div>
                        <FormGroup style={{ textAlign: "center", marginTop: "4px" }}>
                            <Button variant="success" onClick={handleLogin}>Login</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}