import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  const lowestPrice =
    service.tiers?.length > 0
      ? Math.min(...service.tiers.map((t) => t.price))
      : 0;

  return (
    <div style={cardStyle}>
      <h2>{service.title}</h2>
      <p>{service.description.substring(0, 100)}...</p>

      {service.categories?.length > 0 && (
        <div style={tagsStyle}>
          {service.categories.slice(0, 3).map((cat, i) => (
            <span key={i} style={tagStyle}>
              {cat}
            </span>
          ))}
        </div>
      )}

      <div style={priceStyle}>Starting from ${lowestPrice}</div>

      <Link to={`/services/${service._id}`} style={buttonStyle}>
        View Details →
      </Link>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "1.5rem",
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const tagsStyle = {
  margin: "1rem 0",
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
};

const tagStyle = {
  backgroundColor: "#f0f0f0",
  padding: "0.25rem 0.75rem",
  borderRadius: "16px",
  fontSize: "0.875rem",
};

const priceStyle = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#2c3e50",
  margin: "1rem 0",
};

const buttonStyle = {
  display: "inline-block",
  padding: "0.5rem 1rem",
  backgroundColor: "#3498db",
  color: "white",
  textDecoration: "none",
  borderRadius: "4px",
  marginTop: "1rem",
};

export default ServiceCard;
