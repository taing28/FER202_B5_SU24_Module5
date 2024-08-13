import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Layout.css";
import Header from "./components/Header";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="wrapper-container">
        <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
