import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSideBar from "./AdminSideBar";
import toast from 'react-hot-toast';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/property/properties`);
        setProperties(response.data); 
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast.error('Failed to fetch properties.');
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/property/properties/${id}`);
      setProperties((prevProperties) => prevProperties.filter((property) => property._id !== id));
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete the property.');
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="property-cards-container">
        <h2 className="property-cards-headline">Property List</h2>
        <div className="property-container">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="property-card">
                <div className="property-image">
                  <img
                    src={property.imageURL || "https://via.placeholder.com/150"}
                    alt={property.title}
                    className="property-image__img"
                  />
                </div>
                <div className="property-info">
                  <h2 className="property-title">{property.title}</h2>
                  <p className="property-location">Location: {property.location || 'Unknown'}</p>
                  <p className="property-price">Price : ${property.price}</p>
                  <Link to={`/AdminManageProperty/${property._id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
                <div className="button-delete">
                  <button onClick={() => handleDelete(property._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyManagement;
