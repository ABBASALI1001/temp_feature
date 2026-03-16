import { useState, useEffect } from "react";
import { getServices, deleteService } from "../api/servicesApi";
import { Link, useNavigate } from "react-router-dom";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteService(id);
        alert("✅ Service deleted successfully!");
        fetchServices();
      } catch (error) {
        alert("❌ Failed to delete service");
      }
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📋 Manage Services</h1>
        <Link to="/admin/add-service" style={styles.addButton}>
          ➕ Add New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <p>
          No services yet.{" "}
          <Link to="/admin/add-service">Add your first service!</Link>
        </p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Price Range</th>
              <th style={styles.th}>Tiers</th>
              <th style={styles.th}>Created</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const prices = service.tiers?.map((t) => t.price) || [];
              const minPrice = prices.length ? Math.min(...prices) : 0;
              const maxPrice = prices.length ? Math.max(...prices) : 0;

              return (
                <tr key={service._id} style={styles.row}>
                  <td style={styles.td}>
                    <strong>{service.title}</strong>
                  </td>
                  <td style={styles.td}>
                    ${minPrice} - ${maxPrice}
                  </td>
                  <td style={styles.td}>{service.tiers?.length || 0}</td>
                  <td style={styles.td}>
                    {new Date(service.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-service/${service._id}`)
                      }
                      style={styles.editButton}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id, service.title)}
                      style={styles.deleteButton}
                    >
                      🗑️ Delete
                    </button>
                    <Link
                      to={`/services/${service._id}`}
                      style={styles.viewButton}
                    >
                      👁️ View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  addButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#28a745",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #dee2e6",
  },
  row: {
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  editButton: {
    padding: "0.5rem 1rem",
    margin: "0 0.25rem",
    backgroundColor: "#ffc107",
    color: "black",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    margin: "0 0.25rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  viewButton: {
    padding: "0.5rem 1rem",
    margin: "0 0.25rem",
    backgroundColor: "#17a2b8",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    display: "inline-block",
  },
};

export default AdminServices;
