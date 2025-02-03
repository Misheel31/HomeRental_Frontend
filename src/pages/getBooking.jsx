import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext"; 

const GetBooking = () => {
  const { username } = useAuth(); 
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/booking/get?username=${username}`
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
              <div>
                <strong>Special Requests:</strong>{" "}
                {booking.specialRequests || "None"}
              </div>
              <button
                onClick={() => cancelBooking(booking._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetBooking;
