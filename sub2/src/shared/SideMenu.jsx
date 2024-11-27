import React from 'react';
import { Link } from 'react-router-dom';
import styles from './menu.module.css';
import { FaHouse, FaClipboardList, FaCirclePlus } from 'react-icons/fa6'; // Import specific icons

const SideMenu = () => {
  return (
    <>
    <nav className={styles.sidebar}> {/* Use styles.sidebar instead of "styles.sidebar" */}
      <ul>
        <li><Link to="/"><FaHouse style={{ marginRight: '10px' }} /> Home</Link></li>
        <li><Link to="/posts"><FaClipboardList style={{ marginRight: '10px' }}/>Posts</Link></li>
        <li><Link to="/posts/CreatePostPage"><FaCirclePlus style={{ marginRight: '10px' }}/>Create new post</Link></li>
      </ul>
    </nav>
    <footer className={styles.footerNavbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/posts/CreatePostPage">Create post</Link></li>
      </ul>
    </footer>
 </>
  );
};

export default SideMenu;
