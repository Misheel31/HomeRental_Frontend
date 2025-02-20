import axios from "axios";
import React, { useState } from "react";

const CreateProperty = () => {
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    price: "",
    bedCount: "",
    bedroomCount: "",
    available: true,
    category: "",
    city: "",
    state: "",
    country: "",
    guestCount: "",
    bathroomCount: "",
    amenities: [],
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      amenities: value.split(",").map((item) => item.trim()), 
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPropertyData((prevData) => ({
      ...prevData,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(propertyData).forEach((key) => {
      if (key === "image") {
        formData.append(key, propertyData[key]);
      } else if (key === "amenities") {
        formData.append(key, propertyData[key].join(","));
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/property/properties/create",
        formData
      );
      alert("Property uploaded successfully!");

      const { imageUrl } = response.data; 

      // Set the image preview
      setImagePreview(`http://localhost:3000${imageUrl}`);
      setPropertyData({
        title: "",
        description: "",
        location: "",
        image: "",
        price: "",
        bedCount: "",
        bedroomCount: "",
        available: true,
        category: "",
        city: "",
        state: "",
        country: "",
        guestCount: "",
        bathroomCount: "",
        amenities: [],
      });
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to upload property.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Property</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={propertyData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={propertyData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={propertyData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price Per Night Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="pricePerNight">
            Price Per Night
          </label>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            value={propertyData.pricePerNight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Bed Count Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="bedCount">
            Bed Count
          </label>
          <input
            type="number"
            id="bedCount"
            name="bedCount"
            value={propertyData.bedCount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Bedroom Count Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="bedroomCount">
            Bedroom Count
          </label>
          <input
            type="number"
            id="bedroomCount"
            name="bedroomCount"
            value={propertyData.bedroomCount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Available Checkbox */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="available">
            Available
          </label>
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={propertyData.available}
            onChange={(e) =>
              setPropertyData((prevData) => ({
                ...prevData,
                available: e.target.checked,
              }))
            }
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Property preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>

        {/* Amenities Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            value={propertyData.amenities.join(", ")}
            onChange={handleAmenitiesChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={propertyData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            Bathroom Count
          </label>
          <input
            type="text"
            id="bathroomCount"
            name="bathroomCount"
            value={propertyData.bathroomCount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            Guest Count
          </label>
          <input
            type="text"
            id="guestCount"
            name="guestCount"
            value={propertyData.guestCount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={propertyData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={propertyData.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={propertyData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Property
        </button>
      </form>
    </div>
  );
};

export default CreateProperty;
