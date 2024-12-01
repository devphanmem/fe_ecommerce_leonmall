import React from "react";

const FooterComponent = () => (
  <footer className="text-center bg-gray-50 text-gray-600 border-t border-gray-200 py-4">
    &copy; {new Date().getFullYear()} My Website. All Rights Reserved.
  </footer>
);

export default FooterComponent;
