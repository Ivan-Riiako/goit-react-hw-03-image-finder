import React, { Component } from 'react';
import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import api from 'services/PixabayAPI';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
// import Button from './Button';


class ImageGallery extends Component {
  state = {
    status: `idle`,
    showModal: false,
    pictures: null,
    selectPicture: null,
    error:null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { dataSearch } = this.props;
    if (prevProps.dataSearch !== dataSearch) {
      this.setState({ status: `pending` });

      await api
        .fetchhPhoto(`${dataSearch}`)
        .then(pictures => {
          this.setState({ pictures, status: `resolved` });
        })
        .catch(error => this.setState({ error, status: `rejected` }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleSelectingPicture = (src, alt) => {
    this.setState({
      selectPicture: { src, alt },
    });
    this.toggleModal();
  };
  
  render() {
    const { status,error, showModal, pictures, selectPicture } = this.state;
    const { handleSelectingPicture, toggleModal } = this;
    if (status === 'idle') {
      return <p>Введите название картинки</p>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={style.ImageGallery}>
            {pictures &&
              pictures.data.hits.map(
                ({ webformatURL, tags, largeImageURL, id }) => (
                  <ImageGalleryItem
                    alt={tags}
                    src={webformatURL}
                    key={id}
                    largeImageURL={largeImageURL}
                    onChoose={handleSelectingPicture}
                  />
                )
              )}
          </ul>
          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={selectPicture.src} alt={selectPicture.alt} />
            </Modal>
          )}
        </>
      );
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
  }
}

export default ImageGallery;
