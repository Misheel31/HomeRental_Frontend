import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../pages/ImageSlider";

const AdminPropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/property/properties/${propertyId}`
        );
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching property details.");
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!property) return null;

  const amenityIcons = {
    WiFi: "📶",
    Pool: "🏊",
    Parking: "🚗",
    AirConditioning: "❄️",
  };

  const amenities = property.amenities;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Slider Section */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <Slider images={property.images} />
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {property.location.split(", ").join(" > ")}
      </div>

      <h1 className="text-4xl font-serif mb-6">{property.title}</h1>

      <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
        <div className="flex items-center">
          <FaBed className="mr-2 w-5 h-5" />
          <span>
            {property.bedroomCount} bedrooms, {property.bedCount} beds
          </span>
        </div>
        <div className="flex items-center">
          <FaBath className="mr-2 w-5 h-5" />
          <span>{property.bathroomCount} bathrooms</span>
        </div>
        <div className="flex items-center">
          <FaRulerCombined className="mr-2 w-5 h-5" />
          <span>{property.size} sq/ft</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <p className="text-gray-700 mb-8 leading-relaxed">
            {property.description}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-amber-50 rounded-lg"
                >
                  <span>{amenityIcons[amenity] || "✔️"}</span>
                  <span className="ml-3">{amenity}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 text-amber-800 hover:underline">
              Show all amenities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyDetails;
