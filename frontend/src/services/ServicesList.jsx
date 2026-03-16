import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api/servicesApi";
import ServiceCard from "./ServiceCard";

function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      console.log("📦 Services received:", response.data);
      setServices(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch:", err);
      setError(
        "Failed to load services. Make sure backend is running on port 3000",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={containerStyle}>🔄 Loading services...</div>;
  if (error) return <div style={containerStyle}>❌ {error}</div>;

  return (
    <div style={containerStyle}>
      <h1>📋 Our Services</h1>

      {services.length === 0 ? (
        <p>
          No services yet. <Link to="/admin/add-service">Add one now!</Link>
        </p>
      ) : (
        <div style={gridStyle}>
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: "2rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "2rem",
  marginTop: "2rem",
};

export default ServicesList;
