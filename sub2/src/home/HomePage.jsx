import React from 'react';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="welcome-container">
      <div className="robot-container">
        <div className="robot">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="120"
            height="120"
          >
            {/* Robot Body */}
            <rect x="25" y="40" width="50" height="40" rx="5" fill="#ff66b2" />
            <rect x="30" y="45" width="40" height="30" rx="5" fill="#f2f2f2" />
            {/* Robot Head */}
            <circle cx="50" cy="25" r="15" fill="#ff66b2" />
            {/* Robot Eyes */}
            <circle cx="43" cy="22" r="3" fill="white" />
            <circle cx="57" cy="22" r="3" fill="white" />
            {/* Robot Arms (Left Arm is Waving) */}
            <line
              x1="25"
              y1="45"
              x2="15"
              y2="40"
              stroke="#ff66b2"
              strokeWidth="5"
              className="wave-left"
            />
            <line
              x1="75"
              y1="45"
              x2="85"
              y2="40"
              stroke="#ff66b2"
              strokeWidth="5"
            />
            {/* Robot Legs */}
            <line x1="35" y1="80" x2="35" y2="90" stroke="#ff66b2" strokeWidth="5" />
            <line x1="65" y1="80" x2="65" y2="90" stroke="#ff66b2" strokeWidth="5" />
          </svg>
        </div>
        <div className="speech-bubble">
          <p>Welcome to Fake Instagram!</p>
          <p>Navigation on the left!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
