import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Bar, BarChart } from "recharts";

const PriceFilter = ({ isOpen, onClose, onApply }) => {
  const [priceRange, setPriceRange] = useState([10, 230]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample histogram data - replace with actual data
  const histogramData = Array.from({ length: 30 }, (_, i) => ({
    price: i * 10,
    count: Math.floor(Math.random() * 20) + 1,
  }));

  // Fetch properties based on price range
  useEffect(() => {
    if (priceRange[0] !== undefined && priceRange[1] !== undefined) {
      const fetchProperties = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            "http://localhost:3000/api/property/properties/by-price-range",
            {
              params: {
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
              },
            }
          );
          setProperties(response.data);
        } catch (error) {
          console.error("Error fetching properties by price range", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProperties();
    }
  }, [priceRange]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) =>
      name === "min" ? [Number(value), prev[1]] : [prev[0], Number(value)]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2">Price range</h3>
          <p className="text-gray-600 mb-4">
            Nightly prices before fees and taxes
          </p>

          <div className="h-32 mb-6">
            <BarChart width={350} height={100} data={histogramData}>
              <Bar dataKey="count" fill="#FF385C" />
            </BarChart>
          </div>

          <div className="relative mb-6">
            <input
              type="range"
              min="10"
              max="230"
              value={priceRange[0]}
              onChange={handlePriceChange}
              name="min"
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="10"
              max="230"
              value={priceRange[1]}
              onChange={handlePriceChange}
              name="max"
              className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="border rounded-full px-6 py-2">
              <div className="text-gray-500 text-sm">Minimum</div>
              <div className="font-medium">${priceRange[0]}</div>
            </div>
            <div className="border rounded-full px-6 py-2">
              <div className="text-gray-500 text-sm">Maximum</div>
              <div className="font-medium">${priceRange[1]}+</div>
            </div>
          </div>

          <button
            onClick={() => onApply(priceRange)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-6 w-full"
          >
            Apply
          </button>
        </div>

        {loading && <div>Loading properties...</div>}
        {!loading && properties.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Properties within your price range:
            </h3>
            <ul>
              {properties.map((property) => (
                <li key={property._id} className="mt-2">
                  {property.title} - ${property.pricePerNight}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!loading && properties.length === 0 && (
          <div>No properties found for this price range.</div>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;
