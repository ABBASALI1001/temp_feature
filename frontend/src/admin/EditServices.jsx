import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getService, updateService } from "../api/servicesApi";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    industries: [],
    sources: [],
    tiers: [{ title: "", description: "", price: "" }],
  });

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await getService(id);
      const service = response.data.data;
      setFormData({
        title: service.title,
        description: service.description,
        categories: service.categories || [],
        industries: service.industries || [],
        sources: service.sources || [],
        tiers: service.tiers || [{ title: "", description: "", price: "" }],
      });
    } catch (error) {
      console.error("Error fetching service:", error);
      alert("Failed to load service");
      navigate("/admin/services");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({
      ...formData,
      [field]: values,
    });
  };

  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers[index][field] = value;
    setFormData({
      ...formData,
      tiers: updatedTiers,
    });
  };

  const addTier = () => {
    setFormData({
      ...formData,
      tiers: [...formData.tiers, { title: "", description: "", price: "" }],
    });
  };

  const removeTier = (index) => {
    const updatedTiers = formData.tiers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tiers: updatedTiers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const serviceData = {
        ...formData,
        tiers: formData.tiers.map((tier) => ({
          ...tier,
          price: parseFloat(tier.price),
        })),
      };

      await updateService(id, serviceData);
      alert("✅ Service updated successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>✏️ Edit Service</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Basic Info */}
        <div style={styles.section}>
          <h3>Basic Information</h3>

          <div style={styles.field}>
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.textarea}
              rows="4"
            />
          </div>
        </div>

        {/* Categories */}
        <div style={styles.section}>
          <h3>Categories (comma separated)</h3>
          <input
            type="text"
            value={formData.categories.join(", ")}
            onChange={(e) => handleArrayChange(e, "categories")}
            style={styles.input}
            placeholder="E-commerce, Business, Portfolio"
          />
        </div>

        {/* Industries */}
        <div style={styles.section}>
          <h3>Industries (comma separated)</h3>
          <input
            type="text"
            value={formData.industries.join(", ")}
            onChange={(e) => handleArrayChange(e, "industries")}
            style={styles.input}
            placeholder="Healthcare, Finance, Education"
          />
        </div>

        {/* Sources */}
        <div style={styles.section}>
          <h3>Sources (comma separated)</h3>
          <input
            type="text"
            value={formData.sources.join(", ")}
            onChange={(e) => handleArrayChange(e, "sources")}
            style={styles.input}
            placeholder="Google Ads, LinkedIn, Facebook"
          />
        </div>

        {/* Tiers */}
        <div style={styles.section}>
          <h3>Pricing Tiers</h3>

          {formData.tiers.map((tier, index) => (
            <div key={index} style={styles.tierCard}>
              <h4>Tier {index + 1}</h4>

              <div style={styles.field}>
                <label>Title</label>
                <input
                  type="text"
                  value={tier.title}
                  onChange={(e) =>
                    handleTierChange(index, "title", e.target.value)
                  }
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.field}>
                <label>Description</label>
                <input
                  type="text"
                  value={tier.description}
                  onChange={(e) =>
                    handleTierChange(index, "description", e.target.value)
                  }
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.field}>
                <label>Price ($)</label>
                <input
                  type="number"
                  value={tier.price}
                  onChange={(e) =>
                    handleTierChange(index, "price", e.target.value)
                  }
                  style={styles.input}
                  required
                />
              </div>

              {formData.tiers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  style={styles.removeButton}
                >
                  ❌ Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addTier} style={styles.addButton}>
            + Add Another Tier
          </button>
        </div>

        {/* Form Buttons */}
        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => navigate("/admin/services")}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" disabled={saving} style={styles.submitButton}>
            {saving ? "Saving..." : "💾 Update Service"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  form: {
    backgroundColor: "#f8f9fa",
    padding: "2rem",
    borderRadius: "8px",
  },
  section: {
    marginBottom: "2rem",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "4px",
  },
  field: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    resize: "vertical",
  },
  tierCard: {
    padding: "1rem",
    border: "1px solid #dee2e6",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  addButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeButton: {
    padding: "0.25rem 0.5rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
  },
  cancelButton: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  submitButton: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
};

export default EditService;
