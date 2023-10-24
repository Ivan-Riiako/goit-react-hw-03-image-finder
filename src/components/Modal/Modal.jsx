import React,{Component} from 'react';
import style from './Modal.module.css';

 class Modal extends Component {

  render() {
    return (
 
      <div className={style.Overlay}>
        <div className={style.Modal}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default Modal;