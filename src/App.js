import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Layout.css";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="wrapper-container">
        <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/photos/:photoId" element={<PhotoDetail />} />
          </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
