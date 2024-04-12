import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';
export const Loader = ({ height = '80', width = '80', color = '#4fa94d' }) => {
  return (
    <div className={css.div}>
      <TailSpin
        visible={true}
        height={height}
        width={width}
        color={color}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
