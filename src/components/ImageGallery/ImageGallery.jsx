import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
                tags={tags}
                webformatURL={webformatURL}
                key={id}
                largeImageURL={largeImageURL}
              />
            ))}
        </ul>
      );
    
  }
}
ImageGallery.propTypes = {
  arrayPictures: PropTypes.array.isRequired,
};
export default ImageGallery;
