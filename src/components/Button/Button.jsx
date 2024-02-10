import style from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} type="button" className={style.Button}>
      Load More
    </button>
  );
};
Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
export default Button;