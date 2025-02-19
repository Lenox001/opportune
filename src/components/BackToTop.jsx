/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/BackToTop.css"

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${showButton ? "show" : ""}`}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
