import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBath as Bath, FaBed as Bed, FaCar as Car, FaDog as Dog, FaWater as Droplets, FaChevronLeft, FaChevronRight, FaCircle, FaUtensils as Kitchen, FaRulerCombined as Ruler, FaWifi as Wifi, FaWind as Wind } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../pages/ImageSlider";
import Navbar from "../components/Navbar";

const PropertyDetails = ({}) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guestCount, setGuestCount] = useState(1);
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

  const amenities = [
    { icon: <Kitchen className="w-5 h-5" />, name: "Outdoor kitchen" },
    { icon: <Wifi className="w-5 h-5" />, name: "Wi-fi" },
    { icon: <Dog className="w-5 h-5" />, name: "Pets allowed" },
    { icon: <Wind className="w-5 h-5" />, name: "Air conditioning" },
    { icon: <Car className="w-5 h-5" />, name: "Parking available" },
    { icon: <Droplets className="w-5 h-5" />, name: "Washing machine" },
  ];

  return (
    <div className="container mx-auto p-6">
    <Navbar/>
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
          <Bed className="mr-2 w-5 h-5" />
          <span>{property.bedroomCount} bedrooms, {property.bedCount} beds</span>
        </div>
        <div className="flex items-center">
          <Bath className="mr-2 w-5 h-5" />
          <span>{property.bathroomCount} bathrooms</span>
        </div>
        <div className="flex items-center">
          <Ruler className="mr-2 w-5 h-5" />
          {/* <span>{property.size} sq/ft</span> */}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <p className="text-gray-700 mb-8 leading-relaxed">{property.description}</p>

          <div className="mb-8">
            <h2 className="text-2xl mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center p-3 bg-amber-50 rounded-lg">
                  {amenity.icon}
                  <span className="ml-3">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Bedrooms & bathrooms</h2>
            <div className="flex items-center gap-2 text-gray-700">
              <Bed className="w-5 h-5" />
              <span>{property.bedroomCount} bedrooms, {property.bedCount} beds</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-700">
              <Bath className="w-5 h-5" />
              <span>{property.bathroomCount} bathrooms</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select dates</label>
              <button className="w-full border rounded-lg p-3 text-left">
                Add dates for price
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Guests</label>
              <div className="flex items-center border rounded-lg p-3">
                <span className="flex-1">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    -
                  </button>
                  <span>{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/booking/${propertyId}`)}
              className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-500 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyDetails;
