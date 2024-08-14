import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Homepage() {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState("0");
    const [searchText, setSearchText] = useState("");
    const [currentTag, setCurrentTag] = useState("all");
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    useEffect(() => {
        axios.get("http://localhost:9999/albums")
            .then(res => setAlbums(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (currentAlbum === "0") {
            axios.get("http://localhost:9999/photos")
                .then(res => setPhotos(res.data))
                .catch(err => console.log(err));
        } else {
            axios.get(`http://localhost:9999/photos?albumId=${currentAlbum}`)
                .then(res => setPhotos(res.data))
                .catch(err => console.log(err));
        }
    }, [currentAlbum])

    useEffect(() => {
        let tempPhotos = photos;

        if (searchText.length > 0) {
            tempPhotos = tempPhotos.filter(ph => ph.title.toLowerCase().startsWith(searchText.toLowerCase()))
        }

        if (currentTag !== "all") {
            tempPhotos = tempPhotos.filter(ph => ph.tags.includes(currentTag));
        }

        setFilteredPhotos(tempPhotos);
    }, [photos, searchText, currentTag])

    return (
        <Row>
            <Col md={10}>
                <Container>
                    <Row className="menu">
                        <Col className="menu_item">
                            <div onClick={() => setCurrentAlbum("0")}>
                                All
                            </div>
                        </Col>
                        {albums?.map(album => (
                            <Col key={album.id} className="menu_item">
                                <div onClick={() => setCurrentAlbum(album.id)}>
                                    {album.description}
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3 search-bar mt-3">
                                        <Form.Control
                                            placeholder="Search by title"
                                            onChange={e => setSearchText(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                {filteredPhotos?.map(photo => (
                                    <Col md={3} key={photo.id} className="d-flex justify-content-center">
                                        <Link to={`/photos/${photo.photoId}`} style={{ textDecoration: 'none' }}>
                                            <Card className="photo-card">
                                                <Card.Img variant="top" src={"assets/images/"+photo.image.thumbnail} />
                                                <Card.Body>
                                                    <Card.Title>{photo.title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Col>
            <Col md={2}>
                <div className="sider rounded mt-3">
                    <h4>Tags</h4>
                    <ul style={{ listStyle: 'none' }}>
                        <li>
                            <Form.Check
                                label="All"
                                name="tags"
                                type="radio"
                                value={"all"}
                                defaultChecked
                                onClick={e => setCurrentTag(e.target.value)}
                            />
                        </li>
                        <li>
                            <Form.Check
                                label="New"
                                name="tags"
                                type="radio"
                                value={"new"}
                                onClick={e => setCurrentTag(e.target.value)}
                            />
                        </li>
                        <li>
                            <Form.Check
                                label="Hot"
                                name="tags"
                                type="radio"
                                value={"hot"}
                                onClick={e => setCurrentTag(e.target.value)}
                            />
                        </li>
                        <li>
                            <Form.Check
                                label="Summer"
                                name="tags"
                                type="radio"
                                value={"summer"}
                                onClick={e => setCurrentTag(e.target.value)}
                            />
                        </li>
                        <li>
                            <Form.Check
                                label="Cold"
                                name="tags"
                                type="radio"
                                value={"cold"}
                                onClick={e => setCurrentTag(e.target.value)}
                            />
                        </li>
                        <li>
                            <Form.Check
                                label="Natural"
                                name="tags"
                                type="radio"
                                value={"natural"}
                                onClick={e => setCurrentTag(e.target.value)}
                            />
                        </li>
                    </ul>
                </div>
            </Col>
        </Row>
    )
}