import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./menu.module.css";
import { FaHouse, FaClipboardList, FaCirclePlus } from "react-icons/fa6"; // Import specific icons

const SideMenu = () => {
  const location = useLocation();
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch a new fun fact from the API
  const fetchFunFact = async () => {
    setLoading(true); // Set loading state before fetching the new fact
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      const data = await response.json();
      setFact(data.text); // Set the random fact
    } catch (error) {
      console.error("Error fetching the fun fact:", error);
      setFact("Oops! Couldn't fetch a fun fact right now.");
    } finally {
      setLoading(false); // End loading state after the fetch completes
    }
  };

  // Initial fetch of fun fact on component mount
  useEffect(() => {
    fetchFunFact();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={styles.sidebar}>
        <ul>
          <li>
            <Link to="/" className={isActive("/") ? styles.active : ""}>
              <FaHouse style={{ marginRight: "10px" }} /> Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className={isActive("/posts") ? styles.active : ""}>
              <FaClipboardList style={{ marginRight: "10px" }} /> Posts
            </Link>
          </li>
          <li>
            <Link to="/posts/CreatePostPage" className={isActive("/posts/CreatePostPage") ? styles.active : ""}>
              <FaCirclePlus style={{ marginRight: "10px" }} /> Create new post
            </Link>
          </li>
        </ul>
        
        {/* Fun Fact Section */}
        <div className={styles.funFact}>
          <h3>Fun Fact:</h3>
          {loading ? <p>Loading...</p> : <p>{fact}</p>}
          
          {/* Reload Button */}
          <button className={styles.reloadButton} onClick={fetchFunFact}>
            Get Another Fun Fact
          </button>
        </div>
      </nav>
      
      <footer className={styles.footerNavbar}>
        <ul>
          <li>
            <Link to="/" className={isActive("/") ? styles.active : ""}>
              <FaHouse style={{ fontSize: "25px" }} />
            </Link>
          </li>
          <li>
            <Link to="/posts" className={isActive("/posts") ? styles.active : ""}>
              <FaClipboardList style={{ fontSize: "25px" }} />
            </Link>
          </li>
          <li>
            <Link to="/posts/CreatePostPage" className={isActive("/posts/CreatePostPage") ? styles.active : ""}>
              <FaCirclePlus style={{ fontSize: "25px" }} />
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default SideMenu;
