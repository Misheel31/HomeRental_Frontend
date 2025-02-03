import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BookingPage = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
    totalPrice: 0,
    specialRequests: "",
  });

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Assuming the userId is stored in localStorage after login
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/property/properties/${propertyId}`
        );
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  useEffect(() => {
    if (formData.startDate && formData.endDate && property) {
      const price = calculateTotalPrice();
      setFormData((prev) => ({ ...prev, totalPrice: price }));
    }
  }, [formData.startDate, formData.endDate, formData.guests, property]);

  const calculateTotalPrice = () => {
    if (!property || !formData.startDate || !formData.endDate) return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const duration = Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
    const pricePerNight = parseFloat(property.pricePerNight) || 0;

    return (duration * pricePerNight * formData.guests).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (isNaN(start) || isNaN(end) || start >= end) {
      alert("Invalid dates. Check-in must be before Check-out.");
      setIsLoading(false);
      return;
    }

    const totalPrice = calculateTotalPrice();
    if (isNaN(totalPrice) || totalPrice <= 0) {
      alert("Invalid total price.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/booking/create",
        {
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalPrice,
          specialRequests: formData.specialRequests,
          username: username,
          propertyId: propertyId,
        }
      );

      if (response.status === 200) {
        alert("Booking confirmed!");
        navigate("/home");
      } else {
        alert(
          response.data?.error || "Booking failed. Please try again later."
        );
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!property) {
    return <div className="text-center p-6">Loading property details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-serif mb-6">Complete your booking</h1>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-medium mb-2">Price Details</h2>
        <p className="text-gray-600">
          Price per night: ${property.pricePerNight}
        </p>
        {formData.totalPrice > 0 && (
          <p className="text-gray-600">Total Price: ${formData.totalPrice}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Check-in</label>
          <input
            type="date"
            required
            className="w-full p-3 border rounded-lg"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Check-out</label>
          <input
            type="date"
            required
            className="w-full p-3 border rounded-lg"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            min={formData.startDate || new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Number of guests</label>
          <input
            type="number"
            min="1"
            max="10"
            required
            className="w-full p-3 border rounded-lg"
            value={formData.guests}
            onChange={(e) =>
              setFormData({
                ...formData,
                guests: parseInt(e.target.value) || 1,
              })
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Special requests</label>
          <textarea
            className="w-full p-3 border rounded-lg h-32"
            value={formData.specialRequests}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};
