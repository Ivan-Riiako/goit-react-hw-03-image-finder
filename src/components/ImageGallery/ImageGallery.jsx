import React, { Component } from 'react';
import style from './ImageGallery.module.css';


class ImageGallery extends Component {

  

  render() {
    return (
        <ul className={style.gallery}>
            {this.props.children}
       </ul>
    );
  }
}

export default ImageGallery;
