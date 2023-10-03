// import React from 'react';
// import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    
        return (
          <header className={style.Searchbarearchbar}>
            <form className={style.SearchForm} onClick={onSubmit}>
              <button type="submit" className={style.SearchForm_button}>
                <span className={style.SearchForm_button_label} c>
                  Search
                </span>
              </button>

              <input
                className={style.SearchForm_input}
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        );
    
}


export default Searchbar;