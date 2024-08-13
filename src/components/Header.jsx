import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
    const [user, setUser] = useState();
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [location])

    function handleLogout() {
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
            setUser(null);
            nav("/");
        }
    }

    return (
        <Row id="header">
            <Col>
                <ul>
                    {
                        user ?
                            <>
                                <li>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link to={"/"} onClick={handleLogout}>Logout</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to={"/login"}>Login</Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link to={"/register"}>Register</Link>
                                </li>
                            </>
                    }
                </ul>
            </Col>
        </Row>
    )
}