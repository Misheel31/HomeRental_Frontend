import axios from "axios";
import { useEffect, useState } from "react";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/booking/getAllBookings"
        );
        setBookings(response.data.bookings); // Directly access response.data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading bookings.....</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Property ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {booking.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(booking.startDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${booking.totalPrice}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {booking.propertyId || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;
