import React, { Component } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import style from './App.module.css';

import API from 'services/PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import imagesArreyNormalaize from 'services/imagesArreyNormalaize';
import queryNormalaize from 'services/queryNormalaize';

import Loader from 'components/Loader';
import Button from 'components/Button';

class App extends Component {
  state = {
    query: '',
    queryId: null,
    arrayPictures: [],
    isLoading: false,
    currentPage: 1,
    totalPage: 1,
  };
  async componentDidUpdate(_, prevState) {
    const { currentPage, query } = this.state;
    
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      try {
        this.setState({
          isLoading: true,
        });
        const queryPure = queryNormalaize(query);
        const arrayImages = await API.fetchPhoto(`${queryPure}`, currentPage);
        const { arrayPictures, totalPage } = imagesArreyNormalaize(arrayImages);
        this.setState(prevState => ({
          arrayPictures: [...prevState.arrayPictures, ...arrayPictures],
          totalPage,
        }));
      } catch (error) {
        toast.error('This is an error!');
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  handleSubmit = data => {
    const { value } = data;
    this.setState({
      query:  `${Date.now()}/${value}`,
      arrayPictures: [],
      currentPage: 1,
    });
  };

  render() {
    const { arrayPictures, isLoading, currentPage, totalPage } = this.state;
    const { handleSubmit, handleLoadMore } = this;
    const loadMoreExsesability = totalPage > 1 && currentPage <= totalPage;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery arrayPictures={arrayPictures} />
        <Toaster />
        {loadMoreExsesability && <Button onLoadMore={handleLoadMore} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
