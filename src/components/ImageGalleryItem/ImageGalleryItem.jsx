import React, { Component } from 'react';
import style from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';


class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { src, alt, largeImageURL } = this.props;
    const { showModal } = this.state;
    const { toggleModal } = this;


    return (
      <>
        <li className={style.ImageGalleryItem}>
          <img
            className={style.ImageGalleryItemImage}
            src={src}
            alt={alt}
            onClick={toggleModal}
          />
        </li>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
};

export default ImageGalleryItem;
