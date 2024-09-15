import React from "react";
import ItemsContainer from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span></span>
        <span>© 2024 Skill Sync | All rights reserved·</span>
        
      </div>
    </footer>
  );
};

export default Footer;