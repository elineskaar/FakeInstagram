import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import styles from './menu.module.css';
import { FaHouse, FaClipboardList, FaCirclePlus } from 'react-icons/fa6'; // Import specific icons

const SideMenu = () => {

  const location = useLocation(); // Hook to get current route

  const handlePostsClick = (e) => {
    // If we're on the "/posts" page, scroll to the top first
    if (location.pathname === '/posts') {
      e.preventDefault(); // Prevent default behavior for navigation
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // After the scroll, manually trigger the reload/navigation
      setTimeout(() => {
        window.location.href = '/posts'; // This will reload the page
      }, 300); // Wait for the smooth scroll to finish before reloading
    }
  };

  return (
    <>
    <nav className={styles.sidebar}> {/* Use styles.sidebar instead of "styles.sidebar" */}
      <ul>
        <li><Link to="/"><FaHouse style={{ marginRight: '10px' }} /> Home</Link></li>
        <li><Link to="/posts"><FaClipboardList style={{ marginRight: '10px' }} onClick={handlePostsClick} />Posts</Link></li>
        <li><Link to="/posts/CreatePostPage"><FaCirclePlus style={{ marginRight: '10px' }}/>Create new post</Link></li>
      </ul>
    </nav>
    <footer className={styles.footerNavbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
            {/* Using <a> tag for Posts in footer as well */}
            <a href="/posts" onClick={handlePostsClick}>Posts</a>
          </li>
        <li><Link to="/posts/CreatePostPage">Create post</Link></li>
      </ul>
    </footer>
 </>
  );
};

export default SideMenu;
