import axios from "axios";
import React, { useEffect, useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/wishlist/${username}`
        );
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [username]);

  const removeFromWishlist = async (itemId) => {
    if (!username) return alert("Please log in first.");

    try {
      await axios.delete(`http://localhost:3000/api/wishlist/${itemId}`);

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== itemId)
      );

      alert("Item removed from wishlist!");
    } catch (error) {
      console.error("Error removing wishlist item", error);
      alert("Failed to remove item from wishlist.");
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`http://localhost:3000/property_images/${item.image}`}
                alt={item.title}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => goToPropertyDetails(item._id)}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-lg font-semibold">
                  Location: {item.location}
                </p>
                <p className="text-lg font-semibold">
                  Price per Night: ${item.pricePerNight}
                </p>
                <button
                  onClick={() => removeFromWishlist(item._id)} // ✅ Pass correct `_id`
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
