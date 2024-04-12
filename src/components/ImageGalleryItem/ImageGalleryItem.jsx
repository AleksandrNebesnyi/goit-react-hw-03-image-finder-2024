import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  url,
  description,
  largeUrl,
  onImageClick,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem}
        src={url}
        alt={description}
        onClick={() => onImageClick(largeUrl)}
      />
    </li>
  );
};
