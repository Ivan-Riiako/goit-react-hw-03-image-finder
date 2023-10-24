import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
//  const { onClose } = this.props;

    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
        console.log(e.code);
      }

    });
  }

  render() {
    return createPortal(
      <div className={style.Overlay}>
        <div className={style.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;