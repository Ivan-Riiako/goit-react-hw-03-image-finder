import React, { Component } from 'react';
import style from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={style.ImageGalleryItem}>
        <img
          className={style.ImageGalleryItemImage}
          src={this.pros.src}
          alt={this.pros.alt}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
