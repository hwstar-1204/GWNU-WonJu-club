import React from "react";
import "../Club_Style/Club_gallery.css";

const ClubGallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <h2>사진첩</h2>
      <div className="images">
        {images.map((image, index) => (
          <div key={index} className="image">
            <img src={image.url} alt={image.title} />
            <div className="image-title">{image.title}</div>
            <div className="image-date">날짜: {image.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubGallery;
