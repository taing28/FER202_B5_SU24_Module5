import { Col, Container, Row } from "react-bootstrap";

export default function PhotoDetail() {
    return (
        <Row>
            <Col>
                <Container>
                    <Row>
                        <Col>
                            <h2 className="text-center">Photo details</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <div>Image</div>
                        </Col>
                        <Col md={4}>
                            <ul>
                                <li>Title</li>
                                <li>Tags</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Comments
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}