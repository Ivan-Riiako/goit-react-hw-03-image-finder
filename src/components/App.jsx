import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import style from './App.module.css';


class App extends Component {
  state = {
    dataSearch: '',
  };

  handleSubmit = data => {
    const { value } = data
    this.setState({ dataSearch: value });
  };

  render() {
    const { dataSearch } =this.state;
    const { handleSubmit } = this;
    
    return (
      <div className={style.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery dataSearch={dataSearch}/>
      </div>
    );
  }
}

export default App;

  