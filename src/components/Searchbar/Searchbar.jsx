import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

class Searchbar extends Component{
  state = {
    value: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({  value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    // this.setState({ name: '', number: '' });
    // e.currentTarget.reset();
  };
  render() {
     const { value } = this.state;
     const { handleChange, handleSubmit } = this;
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onClick={handleSubmit}>
          <button type="submit" className={style.SearchForm_button}>
            {/* <span className={style.SearchForm_button_label} >
                  Search
                </span> */}
          </button>

          <input
            onChange={handleChange}
            value={value}
            className={style.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}


export default Searchbar;