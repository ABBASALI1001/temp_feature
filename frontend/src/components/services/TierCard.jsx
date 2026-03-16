function TierCard({ tier }) {
  const handleBuy = () => {
    alert(
      `🛒 Buying ${tier.title} - $${tier.price}\nPayment integration will go here`,
    );
    // Payment integration will go here
  };

  return (
    <div style={cardStyle}>
      <h3>{tier.title}</h3>
      <div style={priceStyle}>${tier.price}</div>
      <p style={descStyle}>{tier.description}</p>
      <button onClick={handleBuy} style={buttonStyle}>
        Buy Now
      </button>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #dee2e6",
  borderRadius: "8px",
  padding: "1.5rem",
  textAlign: "center",
  backgroundColor: "white",
  transition: "transform 0.2s",
  cursor: "pointer",
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
};

const priceStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#2c3e50",
  margin: "1rem 0",
};

const descStyle = {
  color: "#666",
  marginBottom: "1.5rem",
};

const buttonStyle = {
  width: "100%",
  padding: "0.75rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer",
};

export default TierCard;
