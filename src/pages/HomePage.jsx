import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../pages/ImageSlider";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [location, setLocation] = useState("");
  const [username, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem("username");
  //   if (user) {
  //     setUser(username);
  //   }
  // }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/property/properties${
            location ? `?location=${location}` : ""
          }`
        );
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching properties.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) =>
      name === "min" ? [Number(value), prev[1]] : [prev[0], Number(value)]
    );
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const toggleWishlist = async (property) => {
    try {
      const isAlreadyInWishlist = wishlist.some(
        (item) => item._id === property._id
      );

      if (isAlreadyInWishlist) {
        setWishlist(wishlist.filter((item) => item._id !== property._id));
      } else {
        setWishlist([...wishlist, property]);
        await axios.post("http://localhost:3000/api/wishlist", {
          propertyId: property._id,
        });
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };

  const goToWishlistPage = () => {
    navigate("/wishlist");
  };

  const goToPropertyDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.location.toLowerCase().includes(location.toLowerCase()) &&
      (property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      property.pricePerNight >= priceRange[0] &&
      property.pricePerNight <= priceRange[1]
  );

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Slider className="mt-8" />

      <h1 className="text-3xl font-bold text-left mb-6 mt-8">
        Available Properties
      </h1>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            onChange={handleLocationChange}
            className="border p-2 rounded w-full"
            placeholder="Enter Location"
          />
        </div>
        <div>
          <label className="block text-gray-700">Min Price:</label>
          <input
            type="number"
            name="min"
            value={priceRange[0]}
            onChange={handlePriceRangeChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Max Price:</label>
          <input
            type="number"
            name="max"
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg overflow-hidden shadow-lg relative"
            >
              <img
                src={"http://localhost:3000/property_images/" + property.image}
                alt={property.title}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => goToPropertyDetails(property._id)}
              />
              <div className="p-2">
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <p className="text-sl font-normal mt-4">
                  Location: {property.location}
                </p>
                <p className="text-sm font-normal">
                  Price per Night: ${property.pricePerNight}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {property.available ? "Available" : "Not Available"}
                </p>

                <FaHeart
                  className={`absolute top-4 right-4 cursor-pointer text-2xl ${
                    wishlist.some((item) => item._id === property._id)
                      ? "text-red-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => toggleWishlist(property)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No properties found.
          </div>
        )}
      </div>

      <button
        onClick={goToWishlistPage}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        View Wishlist
      </button>

      <Footer />
    </div>
  );
};

export default HomePage;
