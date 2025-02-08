import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      {" "}
      {/* Further reduced padding */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-start">
          {" "}
          {/* Aligned content to the left */}
          {/* Left Side - Brand & Links */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-2">
            {" "}
            {/* Reduced margin-bottom */}
            <h3 className="text-base font-semibold mb-2">Rentify</h3>{" "}
            {/* Reduced font size */}
            <p className="text-xs">
              Helping you find your next home. Whether you're looking to buy,
              rent, or sell, Rentify has you covered.
            </p>
            <div className="mt-2">
              <a
                href="/about"
                className="text-gray-400 hover:text-white text-xs"
              >
                About Us
              </a>
              <br />
              <a
                href="/contact"
                className="text-gray-400 hover:text-white text-xs"
              >
                Contact
              </a>
              <br />
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white text-xs"
              >
                Privacy Policy
              </a>
              <br />
              <a
                href="/terms-of-service"
                className="text-gray-400 hover:text-white text-xs"
              >
                Terms of Service
              </a>
            </div>
          </div>
          {/* Right Side - Social Media Links */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-2">
            {" "}
            {/* Reduced margin-bottom */}
            <h3 className="text-base font-semibold mb-2">Follow Us</h3>{" "}
            {/* Reduced font size */}
            <div className="flex space-x-3">
              {" "}
              {/* Reduced space between icons */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f text-lg"></i>{" "}
                {/* Reduced icon size */}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter text-lg"></i>{" "}
                {/* Reduced icon size */}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram text-lg"></i>{" "}
                {/* Reduced icon size */}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-linkedin-in text-lg"></i>{" "}
                {/* Reduced icon size */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-left mt-4 border-t border-gray-700 pt-2">
          {" "}
          {/* Left-aligned and reduced spacing */}
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Rentify. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
