import React, { Component } from 'react';

import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    status: `idle`,
  };
 
  render() {
    const { arrayPictures } = this.props;
    
      return (
        
          <ul className={style.ImageGallery}>
            {arrayPictures &&
              arrayPictures.map(({ webformatURL, tags, largeImageURL, id }) => (
                <ImageGalleryItem
                  alt={tags}
                  src={webformatURL}
                  key={id}
                  largeImageURL={largeImageURL}
                />
              ))}
          </ul>
      );
    
  }
}

export default ImageGallery;
