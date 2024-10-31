// Loading.js
import React from 'react';
import '../App.css';


const Loading = () => {
  return (
    <div className="loading">
      {/* Replace the path with your actual GIF path */}
      <h3>Loading, please wait...</h3>
      <p>
      <img
        src="/loading.gif"
        alt="loding..."
        width="30"
        height="30"
        className="loading-gif" />
      </p>
    </div>
  );
};

export default Loading;
