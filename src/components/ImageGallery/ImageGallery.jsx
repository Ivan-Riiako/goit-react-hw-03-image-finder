import React, { Component } from 'react';

import style from './ImageGallery.module.css';
import api from 'services/PixabayAPI';
import imagesArreyNormalaize from 'services/imagesArreyNormalaize';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    status: `idle`,
    arrayPictures: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { dataSearch } = this.props;
    const { currentPage } = this.state;
    const { cleanGallery } = this;

    if (
      (prevProps.dataSearch !== dataSearch && prevProps.dataSearch !== '') ||
      dataSearch === ''
    ) {
      cleanGallery();
    }
    if (
      prevProps.dataSearch !== dataSearch ||
      prevState.currentPage !== currentPage
    ) {
      if ( prevProps.dataSearch !== dataSearch) {
        this.setState({ status: `pending` });
      }
        await api
          .fetchhPhoto(`${dataSearch}`, currentPage)
          .then(responseImagesPixabay => {
            const arreyNormalaize = imagesArreyNormalaize(
              responseImagesPixabay
            );
            const { arrayPictures, totalPage } = arreyNormalaize;
            this.setState(prevState => ({
              arrayPictures: [...prevState.arrayPictures, ...arrayPictures],
              status: `resolved`,
              totalPage,
            }));
          })
          .catch(error => this.setState({ error, status: `rejected` }));
        // .finally(this.setState({ loading: false }));
    }
    this.setState({ loading: false });
  }

  cleanGallery = () => {
    this.setState({
      arrayPictures: [],
      currentPage: 1,
      totalPage: 0,
      loading: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      loading: true,
    }));
  };

  render() {
    const { status, error, arrayPictures, totalPage, currentPage, loading } =
      this.state;
    const { handleLoadMore } = this;

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
          {loading && <Loader />}
          {totalPage > currentPage &&!loading&& <Button onLoadMore={handleLoadMore} />}
        </>
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
  }
}


export default ImageGallery;
