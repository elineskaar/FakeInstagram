import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styled from "styled-components";

// Styled Button, this code is from ChatGPT. It was a lot more difficult to implement scrollbutton in react then mvc, and we needed help from 
// ChatGPT to get this code to work.
const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #381d1d;
  color: white;
  border: none;
  border-radius: 20%;
  padding: 10px;
  font-size: 25px;
  cursor: pointer;
  display: ${(props) => (props.visible ? "inline" : "none")};
  transition: background-color 0.3s ease; /* Smooth transition */
  z-index: 1000; /* Ensure it's on top of other elements */

  &:hover {
    background-color: rgb(210, 210, 160);
  }
`;

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  // Function to show/hide button based on scroll position
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Listen to scroll event
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Button visible={visible} onClick={scrollToTop}>
      <FaArrowCircleUp />
    </Button>
  );
};

export default ScrollButton;
