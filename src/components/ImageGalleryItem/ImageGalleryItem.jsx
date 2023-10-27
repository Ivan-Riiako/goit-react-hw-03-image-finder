// import React, { Component } from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({src,alt,id }) =>  {
 
    return (
      <li  className={style.ImageGalleryItem}>
        <img className={style.ImageGalleryItemImage} src={src} alt={alt} />
      </li>
    );
  
}

export default ImageGalleryItem;
