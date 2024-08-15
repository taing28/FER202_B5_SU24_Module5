import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
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

    //Get all Tags
    let tagList = [];
    photos?.map(p => {
        let photoTags = p.tags;
        tagList = [...tagList, ...photoTags];
    })
    //Push all elements to new Array
    let newTags = [...new Set(tagList)];

    useEffect(() => {
        let tempPhotos = photos;

        if (searchText.length > 0) {
            tempPhotos = tempPhotos.filter(ph => ph.title.toLowerCase().includes(searchText.toLowerCase()) || ph.tags.includes(searchText.toLowerCase()))
        }

        if (currentTag !== "all") {
            tempPhotos = tempPhotos.filter(ph => ph.tags.includes(currentTag));
        }

        setFilteredPhotos(tempPhotos);
    }, [photos, searchText, currentTag])

    return (
        <Row>
            <Col md={9} lg={10}>
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
                                    {album.title}
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}>
                                    <InputGroup className="mb-3 mt-3">
                                        <Form.Control
                                            placeholder="Search by title or tags"
                                            onChange={e => setSearchText(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    filteredPhotos.length > 0 ?
                                        filteredPhotos?.map(photo => (
                                            <Col md={4} xl={3} key={photo.id} className="d-flex justify-content-center">
                                                <Link to={`/photos/${photo.photoId}`} style={{ textDecoration: 'none' }}>
                                                    <Card className="photo-card">
                                                        <Card.Img style={{height:"14rem"}} variant="top" src={"assets/images/" + photo.image.thumbnail} alt="Image" />
                                                        <Card.Body>
                                                            <Card.Title>{photo.title}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        ))
                                        :
                                        <Col>
                                            <h3 className="text-center">
                                                Not found
                                            </h3>
                                        </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Col>
            <Col md={3} lg={2} className="d-none d-md-block">
                <div className="sider rounded mt-3">
                    <h4>Tags: {currentTag}</h4>
                    <Button onClick={e => setCurrentTag(e.target.value)} style={{ margin: "4px" }} value={"all"}>All</Button>
                    {
                        newTags?.map(t => (
                            <Button onClick={e => setCurrentTag(e.target.value)} style={{ margin: "4px" }} value={t}>{t}</Button>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}