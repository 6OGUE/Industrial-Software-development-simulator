import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Frontend from "./Frontend.jsx";
import Backend from "./Backend.jsx.jsx";
import Tetsing from "./Testing.jsx";
import MachineLearning from "./Machine Learning.jsx";

const boxStyle = {
  width: "190px",
  height: "190px",
  backgroundColor: "black",
  margin: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "18px",
  textAlign: "center",
  borderRadius: "8px",
  textDecoration: "none",
  border: "5px solid white",
  boxSizing: "border-box",
  cursor: "pointer",
  padding: "10px",
  wordBreak: "break-word",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  gap: "10px",
  flexWrap: "wrap",
  
};

const FiveBoxes = () => (
  <div style={containerStyle}>
    <Link to="/Frontend" style={boxStyle}>Frontend</Link>
    <Link to="/Backend" style={boxStyle}>Backend</Link>
    <Link to="/Testing" style={boxStyle}>Testing</Link>
    <Link to="/MachineLearning" style={boxStyle}>Machine Learning</Link>
  </div>
);

export default function App() {
  return (
    <Router>
        <div style={{alignItems:"center",textAlign:"center"}}>
            <h1>Choose Your Domain</h1>
        </div>
      <Routes>
        <Route path="/" element={<FiveBoxes />} />
        <Route path="/Frontend" element={<Frontend />} />
        <Route path="/Backend" element={<Backend />} />
        <Route path="/Testing" element={<Tetsing />} />
        <Route path="/MachineLearning" element={<MachineLearning />} />
      </Routes>
    </Router>
  );
}
