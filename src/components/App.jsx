import React, { Component } from 'react';
import axios from 'axios';

import style from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem';
// import Button from './Button';
import Loader from './Loader';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33947023-c15fa4d03e325678c88d2d925';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});

    


class App extends Component {
  state = {
    showModal: false,
    dataSearch: '',
    pictures: null,
    selectPicture: null,
    loading: true,
  };

  componentDidMount() {}

  async componentDidUpdate(_, prevState) {
    const { dataSearch } = this.state;
    const { fetchhPhoto } = this;
    if (prevState.dataSearch !== this.state.dataSearch) {
      const pictures = await fetchhPhoto(`${dataSearch}`);
      this.setState({ pictures });
    }
  }
  // Запрос на сервер
  fetchhPhoto = (value, page = 1) => {
    return instance({ params: { q: `${value}`, page: `${page}` } })
      .then(function (pictures) {
        return pictures;
      })
      .catch(function (error) {
        // handle error
        if (error.response) {
          // Запрос был сделан, и сервер ответил кодом состояния, который
          // выходит за пределы 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        console.log(error);
      });
  };
  handleSubmit = data => {
    const { value } = data;
    // if (contacts.some(contact => contact.name === name)) {
    //   alert(`${name} is already in contacrs`);
    //   return;
    // }

    this.setState({ dataSearch: value });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleSelectingPicture = ( src, alt ) => {
    this.setState({
      selectPicture: { src, alt },
    });
    this.toggleModal();
  };

  render() {
    const { showModal, pictures, selectPicture, loading } = this.state;
    const { handleSelectingPicture, toggleModal, handleSubmit } = this;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={handleSubmit} />
        {pictures && (
          <ImageGallery items={pictures} onChoose={handleSelectingPicture} />
        )}
        {loading&&<Loader/>}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={selectPicture.src} alt={selectPicture.alt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

  