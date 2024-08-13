import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Homepage() {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState("0");
    const [searchText, setSearchText] = useState("");
    const [currentTag, setCurrentTag] = useState("All");
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
        
        if(searchText.length > 0) {
            tempPhotos = tempPhotos.filter(ph => ph.title.toLowerCase().startsWith(searchText.toLowerCase()))
        }

        if(currentTag !== "All") {
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
                                    <Col key={photo.id} className="d-flex justify-content-center">
                                        <Link to={`/photos/${photo.id}`} style={{textDecoration:'none'}}>
                                            <Card style={{ width: '18rem', height: '18rem', marginTop: '16px' }}>
                                                <Card.Img variant="top" src={photo.image.thumbnail} />
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
                    Sider
                </div>
            </Col>
        </Row>
    )
}