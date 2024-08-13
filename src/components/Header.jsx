import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
    

    return (
        <Row id="header">
            <Col>
                <ul>
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to={"/register"}>Register</Link>
                    </li>
                </ul>
            </Col>
        </Row>
    )
}