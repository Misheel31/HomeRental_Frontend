import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const GetBooking = () => {
  const { username } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/booking/${username}`
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings.");
      }
    };

    if (username) {
      fetchBookings();
    }
  }, [username]);

  const handleCheckout = (bookingId) => {
    navigate(`/payment/${bookingId}`);
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/booking/cancel/${bookingId}`
      );

      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      }
    } catch (error) {
      setError("Error canceling booking");
    }
  };

  const removePaidBooking = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking._id !== bookingId)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">My Bookings</h2>
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="border-b py-2">
              <div>
                <strong>Property ID:</strong> {booking.propertyId}
              </div>
              <div>
                <strong>Start Date:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
              </div>
              <div>
                <strong>End Date:</strong>{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Total Price:</strong> {booking.totalPrice}
              </div>

              <div className="flex gap-6 mt-4">
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Cancel Booking
                </button>
                {booking.paymentStatus === "Paid" ? (
                  <button
                    onClick={() => removePaidBooking(booking._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Booking Paid
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckout(booking._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-200"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetBooking;
