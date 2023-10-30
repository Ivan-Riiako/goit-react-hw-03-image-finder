import style from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} type="button" className={style.Button}>
      Load More
    </button>
  );
};

export default Button;