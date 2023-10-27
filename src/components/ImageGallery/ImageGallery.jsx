import React, { Component } from 'react';
import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';



class ImageGallery extends Component {
  render() {
    const { items: { data:{hits}} } = this.props;
    return (
      <ul className={style.ImageGallery}>
        {hits.map(({ webformatURL, tags, largeImageURL, id }) => (
          <ImageGalleryItem alt={tags} src={webformatURL} key={id} />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
