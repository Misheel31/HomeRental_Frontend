import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const properties = [
    { name: "Bristol", image: "/assets/image.avif" },
    { name: "Cornwall", image: "/assets/SliderImage2.jpeg" },
    { name: "London", image: "/assets/SliderImage3.jpeg" },
  ];

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation logo component
  const Logo = () => (
    <div className="flex items-center">
      <span
        className={`text-2xl font-bold ${
          isScrolled ? "text-blue-600" : "text-blue-800"
        }`}
      >
        HomeRental
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white border-b border-gray-200" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className={`px-6 py-2 font-medium rounded-full ${
                  isScrolled
                    ? "text-blue-600 border border-blue-600 hover:bg-blue-50"
                    : "text-blue-800 border border-blue-800 hover:bg-blue-100"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`px-6 py-2 font-medium rounded-full ${
                  isScrolled
                    ? "text-blue-600 border border-blue-600 hover:bg-blue-50"
                    : "text-blue-800 border border-blue-800 hover:bg-blue-100"
                }`}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-300 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Column - Text Content */}
            <div className="md:w-1/2 text-blue-900 max-w-lg">
              <h1 className="text-4xl font-bold leading-tight mb-6">
                Find your dream home, anywhere, anytime
              </h1>
              <p className="text-lg mb-8">
                Explore thousands of homes, apartments, and vacation rentals
                tailored to your lifestyle.
              </p>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                Browse Listings
              </button>
            </div>

            {/* Right Column - Interactive Image */}
            <div className="w-[500px] h-auto">
              <img
                src={"/assets/SliderImage2.jpeg"}
                alt="Featured Property"
                className="rounded-[25px] shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Locations */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Explore Popular Locations
          </h2>
          <div className="relative">
            {/* <button className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-100 shadow-md rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button> */}
            <div className="flex justify-center gap-8 overflow-x-auto py-4">
              {properties.map((property) => (
                <div
                  key={property.name}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-full h-full overflow-hidden rounded-lg mb-2 group-hover:shadow-lg">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">
                    {property.name}
                  </span>
                </div>
              ))}
            </div>
            {/* <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-100 shadow-md rounded-full">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Why Choose Rentify?
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Interactive Features */}
            <div className="relative">
              {/* Feature Card */}
              <div className="bg-white rounded-xl shadow-md p-6 max-w-sm mb-4 transform -rotate-3">
                <p className="text-gray-800 font-medium">Verified Listings</p>
                <p className="text-gray-600">
                  Every property is vetted for accuracy and quality.
                </p>
              </div>

              {/* Chat Card */}
              <div className="bg-white rounded-xl shadow-md p-6 max-w-sm ml-8 transform rotate-3">
                <p className="text-gray-800 font-medium">Seamless Support</p>
                <p className="text-gray-600">
                  Connect with our support team 24/7 for any queries.
                </p>
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div>
              <div className="mb-4">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                  Expertly Curated
                </span>
                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  Rent with Confidence
                </h2>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the perfect place for your needs with our curated
                listings, detailed descriptions, and expert support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
