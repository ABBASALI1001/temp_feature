import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ServicesList from "./services/ServicesList";
import ServiceDetails from "./services/ServiceDetails";
import AddService from "./admin/AddService";        // ✅ FIXED
import "./App.css";
import AdminServices from "./admin/AdminServices";
import EditService from "./admin/EditService";      // ✅ FIXED

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>🏠 Home</Link>
          <Link to="/services" style={linkStyle}>📋 Services</Link>
          <Link to="/admin/services" style={linkStyle}>📊 Admin Panel</Link> {/* 👈 ADD THIS */}
          <Link to="/admin/add-service" style={linkStyle}>➕ Add Service</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/add-service" element={<AddService />} />
          <Route path="/admin/edit-service/:id" element={<EditService />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Home Component
function Home() {
  return (
    <div style={containerStyle}>
      <h1>🏢 Centennial Infotech</h1>
      <p>Welcome to our Services Portal</p>
    </div>
  );
}

// Styles
const navStyle = {
  padding: "1rem",
  backgroundColor: "#333",
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  backgroundColor: "#555",
};

const containerStyle = {
  padding: "2rem",
  textAlign: "center",
};

export default App;
