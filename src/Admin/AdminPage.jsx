import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminPage = () => {
  const [properties, setProperties] = useState([]);

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/property/properties`
        );
        setProperties(response.data); 
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to fetch properties.");
      }
    };
    fetchProperties();
  }, []);

  // Handle property deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/property/properties/${id}`);
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== id)
      );
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete the property.");
    }
  };

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 h-screen p-4">
      {/* Sidebar */}
      <div className="text-white p-4 h-full overflow-y-auto flex flex-col">
        <AdminSideBar />
      </div>

      {/* Main content */}
      <div className="bg-gray-100 p-4 h-full overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">Property List</h2>
        <div className="property-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property._id}
                className="property-card bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="property-image mb-4">
                  <Link to={`/AdminManagePropertyDetails/${property._id}`}>
                    <img
                      src={
                        "http://localhost:3000/property_images/" +
                          property.image || "https://via.placeholder.com/150"
                      }
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="property-info mb-4">
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-600">
                    Location: {property.location || "Unknown"}
                  </p>
                  <p className="text-lg font-bold">
                    Price per Night: ${property.pricePerNight}
                  </p>
                </div>
                <div className="flex justify-between">
                  <Link to={`/AdminManageProperty/${property._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDelete(property._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
