// import React, { Component } from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, largeImageURL, onChoose }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItemImage}
        src={src}
        alt={alt}
        onClick={()=>onChoose(largeImageURL, alt)}
      />
    </li>
  );
};

export default ImageGalleryItem;
