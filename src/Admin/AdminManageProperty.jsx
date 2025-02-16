import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProperty = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    pricePerNight: "",
    available: true,
    bedCount: "",
    bedroomCount: "",
    amenities: "",
    category: "",
    type: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: "",
    guestCount: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property data using ID from the URL
        const response = await axios.get(
          `http://localhost:3000/api/property/properties/${id}`
        );
        const propertyData = response.data;

        // Set the fetched data into state
        setData({
          title: propertyData.title || "",
          description: propertyData.description || "",
          location: propertyData.location || "",
          image: propertyData.image || "",
          pricePerNight: propertyData.pricePerNight || "",
          available: propertyData.available || true,
          bedCount: propertyData.bedCount || "",
          bedroomCount: propertyData.bedroomCount || "",
          amenities: propertyData.amenities?.join(", ") || "",
          category: propertyData.category || "",
          type: propertyData.type || "",
          streetAddress: propertyData.streetAddress || "",
          aptSuite: propertyData.aptSuite || "",
          city: propertyData.city || "",
          state: propertyData.state || "",
          country: propertyData.country || "",
          guestCount: propertyData.guestCount || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        toast.error("Failed to fetch property details.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAmenitiesChange = (e) => {
    setData({ ...data, amenities: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "amenities") {
        formData.append(
          key,
          data[key].split(",").map((item) => item.trim())
        );
      } else if (key === "image" && data[key] instanceof File) {
        formData.append(key, data[key]); // Append the file if a new one is selected
      } else if (key !== "image") {
        formData.append(key, data[key]); // Append other fields
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:3000/api/property/properties/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Property Updated Successfully");
        alert("Property Updated Successfully");
      } else {
        toast.error("Failed to update property. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update property. Please try again later.");
      console.error(
        "Error updating property:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return (
      <p className="text-center text-lg font-medium">
        Loading property details...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Property
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Title */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Location */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Preview */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Current Image:
          </label>
          {typeof data.image === "string" && data.image && (
            <img
              src={`http://localhost:3000/${data.image}`}
              alt="Property"
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
          )}

          <label className="block text-sm font-medium text-gray-700">
            Upload New Image:
          </label>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];
              setData({ ...data, image: file });
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Price Per Night */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Price Per Night:
          </label>
          <input
            type="number"
            name="pricePerNight"
            value={data.pricePerNight}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Availability */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Available:
          </label>
          <select
            name="available"
            value={data.available}
            onChange={(e) =>
              setData({ ...data, available: e.target.value === "true" })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Bed Count */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Bed Count:
          </label>
          <input
            type="number"
            name="bedCount"
            value={data.bedCount}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Guest Count:
          </label>
          <input
            type="number"
            name="guestCount"
            value={data.guestCount}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Bedroom Count:
          </label>
          <input
            type="number"
            name="bedroomCount"
            value={data.bedroomCount}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Amenities */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Amenities (comma separated):
          </label>
          <input
            type="text"
            name="amenities"
            value={data.amenities}
            onChange={handleAmenitiesChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={data.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
