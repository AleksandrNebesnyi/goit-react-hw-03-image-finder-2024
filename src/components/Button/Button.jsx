import css from './Buttom.module.css';

export const Button = ({ onBtnClick }) => {
  return (
    <button className={css.Button} type="submit" onClick={onBtnClick}>
      load more
    </button>
  );
};
