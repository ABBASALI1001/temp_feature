import { useState } from "react";
import { createService } from "../api/servicesApi";
import { useNavigate } from "react-router-dom";

function AddService() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    industries: [],
    sources: [],
    tiers: [{ title: "", description: "", price: "" }],
  });

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle array inputs (categories, industries, sources)
  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({
      ...formData,
      [field]: values,
    });
  };

  // Handle tier changes
  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers[index][field] = value;
    setFormData({
      ...formData,
      tiers: updatedTiers,
    });
  };

  // Add new tier
  const addTier = () => {
    setFormData({
      ...formData,
      tiers: [...formData.tiers, { title: "", description: "", price: "" }],
    });
  };

  // Remove tier
  const removeTier = (index) => {
    const updatedTiers = formData.tiers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tiers: updatedTiers,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data
      const serviceData = {
        ...formData,
        tiers: formData.tiers.map((tier) => ({
          ...tier,
          price: parseFloat(tier.price),
        })),
      };

      console.log("📤 Sending data:", serviceData);

      const response = await createService(serviceData);
      console.log("✅ Service created:", response.data);

      alert("✅ Service added successfully!");
      navigate("/services");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Failed to add service. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>➕ Add New Service</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Basic Info */}
        <div style={sectionStyle}>
          <h3>Basic Information</h3>

          <div style={fieldStyle}>
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., Web Design & Development"
            />
          </div>

          <div style={fieldStyle}>
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={textareaStyle}
              rows="4"
              placeholder="Describe the service..."
            />
          </div>
        </div>

        {/* Categories */}
        <div style={sectionStyle}>
          <h3>Categories (comma separated)</h3>
          <input
            type="text"
            value={formData.categories.join(", ")}
            onChange={(e) => handleArrayChange(e, "categories")}
            style={inputStyle}
            placeholder="E-commerce, Business, Portfolio"
          />
        </div>

        {/* Industries */}
        <div style={sectionStyle}>
          <h3>Industries (comma separated)</h3>
          <input
            type="text"
            value={formData.industries.join(", ")}
            onChange={(e) => handleArrayChange(e, "industries")}
            style={inputStyle}
            placeholder="Healthcare, Finance, Education"
          />
        </div>

        {/* Sources */}
        <div style={sectionStyle}>
          <h3>Sources (comma separated)</h3>
          <input
            type="text"
            value={formData.sources.join(", ")}
            onChange={(e) => handleArrayChange(e, "sources")}
            style={inputStyle}
            placeholder="Google Ads, LinkedIn, Facebook"
          />
        </div>

        {/* Tiers */}
        <div style={sectionStyle}>
          <h3>Pricing Tiers</h3>

          {formData.tiers.map((tier, index) => (
            <div key={index} style={tierStyle}>
              <h4>Tier {index + 1}</h4>

              <div style={fieldStyle}>
                <label>Title</label>
                <input
                  type="text"
                  value={tier.title}
                  onChange={(e) =>
                    handleTierChange(index, "title", e.target.value)
                  }
                  style={inputStyle}
                  placeholder="e.g., Basic"
                  required
                />
              </div>

              <div style={fieldStyle}>
                <label>Description</label>
                <input
                  type="text"
                  value={tier.description}
                  onChange={(e) =>
                    handleTierChange(index, "description", e.target.value)
                  }
                  style={inputStyle}
                  placeholder="e.g., 5 pages website"
                  required
                />
              </div>

              <div style={fieldStyle}>
                <label>Price ($)</label>
                <input
                  type="number"
                  value={tier.price}
                  onChange={(e) =>
                    handleTierChange(index, "price", e.target.value)
                  }
                  style={inputStyle}
                  placeholder="199"
                  required
                />
              </div>

              {formData.tiers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  style={removeButtonStyle}
                >
                  ❌ Remove Tier
                </button>
              )}

              <hr style={dividerStyle} />
            </div>
          ))}

          <button type="button" onClick={addTier} style={addButtonStyle}>
            + Add Another Tier
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={submitButtonStyle}>
          {loading ? "Saving..." : "💾 Save Service"}
        </button>
      </form>
    </div>
  );
}

// Styles
const containerStyle = {
  padding: "2rem",
  maxWidth: "800px",
  margin: "0 auto",
};

const formStyle = {
  backgroundColor: "#f8f9fa",
  padding: "2rem",
  borderRadius: "8px",
};

const sectionStyle = {
  marginBottom: "2rem",
  padding: "1rem",
  backgroundColor: "white",
  borderRadius: "4px",
};

const fieldStyle = {
  marginBottom: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "1rem",
};

const textareaStyle = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "1rem",
  resize: "vertical",
};

const tierStyle = {
  padding: "1rem",
  border: "1px solid #dee2e6",
  borderRadius: "4px",
  marginBottom: "1rem",
};

const dividerStyle = {
  margin: "1rem 0",
  border: "none",
  borderTop: "1px solid #dee2e6",
};

const addButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const removeButtonStyle = {
  padding: "0.25rem 0.5rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const submitButtonStyle = {
  width: "100%",
  padding: "1rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1.1rem",
  cursor: "pointer",
};

export default AddService;
