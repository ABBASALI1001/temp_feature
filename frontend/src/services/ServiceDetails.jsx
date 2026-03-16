import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getService } from "../api/servicesApi";
import TierCard from "../components/services/TierCard";

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await getService(id);
      console.log("📦 Service details:", response.data);
      setService(response.data.data);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch:", err);
      setError("Failed to load service details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={containerStyle}>🔄 Loading...</div>;
  if (error) return <div style={containerStyle}>❌ {error}</div>;
  if (!service) return <div style={containerStyle}>❌ Service not found</div>;

  return (
    <div style={containerStyle}>
      <Link to="/services" style={backStyle}>
        ← Back to Services
      </Link>

      <div style={headerStyle}>
        <h1>{service.title}</h1>
        <p style={descriptionStyle}>{service.description}</p>
      </div>

      <div style={sectionsStyle}>
        {service.categories?.length > 0 && (
          <div style={sectionStyle}>
            <h3>📌 Categories</h3>
            <div style={listStyle}>
              {service.categories.map((cat, i) => (
                <span key={i} style={itemStyle}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {service.industries?.length > 0 && (
          <div style={sectionStyle}>
            <h3>🏢 Industries</h3>
            <div style={listStyle}>
              {service.industries.map((ind, i) => (
                <span key={i} style={itemStyle}>
                  {ind}
                </span>
              ))}
            </div>
          </div>
        )}

        {service.sources?.length > 0 && (
          <div style={sectionStyle}>
            <h3>📢 Sources</h3>
            <div style={listStyle}>
              {service.sources.map((src, i) => (
                <span key={i} style={itemStyle}>
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={tiersStyle}>
        <h2>💰 Pricing Tiers</h2>
        <div style={tiersGridStyle}>
          {service.tiers?.map((tier, index) => (
            <TierCard key={index} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
};

const backStyle = {
  display: "inline-block",
  marginBottom: "2rem",
  color: "#666",
  textDecoration: "none",
};

const headerStyle = {
  marginBottom: "2rem",
};

const descriptionStyle = {
  fontSize: "1.1rem",
  color: "#666",
  lineHeight: "1.6",
};

const sectionsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "2rem",
  marginBottom: "3rem",
};

const sectionStyle = {
  backgroundColor: "#f8f9fa",
  padding: "1.5rem",
  borderRadius: "8px",
};

const listStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "1rem",
};

const itemStyle = {
  backgroundColor: "#e9ecef",
  padding: "0.5rem 1rem",
  borderRadius: "20px",
  fontSize: "0.9rem",
};

const tiersStyle = {
  marginTop: "2rem",
};

const tiersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
  marginTop: "1rem",
};

export default ServiceDetails;
