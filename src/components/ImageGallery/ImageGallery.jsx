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
    arrayPictures: null,
    error: null,
    currentPage: 1,
    totalPage:null
  };

  async componentDidUpdate(prevProps) {
    const { dataSearch } = this.props;
    if (prevProps.dataSearch !== dataSearch) {
      this.setState({ status: `pending` });

      await api
        .fetchhPhoto(`${dataSearch}`)
        .then(responseImagesPixabay => {
          const arreyNormalaize = imagesArreyNormalaize(responseImagesPixabay);
          const { arrayPictures, totalPage } = arreyNormalaize;
          this.setState({
            arrayPictures,
            status: `resolved`,
            totalPage,
          });
        })
        .catch(error => this.setState({ error, status: `rejected` }));
    }
  }

  

  handleLoadMore = () => {
    const { dataSearch } = this.props;
    const { currentPage, totalPage } = this.state;

    if (totalPage > currentPage) {
      // this.setState({ status: `pending` });
      const nextPage = currentPage + 1;
      this.setState({ currentPage: nextPage });
      api
        .fetchhPhoto(`${dataSearch}`, nextPage)
        .then(responseImagesPixabay => {
          const arreyNormalaize = imagesArreyNormalaize(responseImagesPixabay);
          const { arrayPictures } = arreyNormalaize;
          this.setState(prevState => ({
            arrayPictures: [...prevState.arrayPictures, ...arrayPictures],
            status: `resolved`,
          }));
        })
        .catch(error => this.setState({ error, status: `rejected` }));
    }
  };
  render() {
    const { status, error, arrayPictures } = this.state;
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
          <Button onLoadMore={handleLoadMore} />
        </>
      );
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
  }
}

export default ImageGallery;
