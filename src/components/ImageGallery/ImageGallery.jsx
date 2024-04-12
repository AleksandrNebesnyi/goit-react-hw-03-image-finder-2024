import css from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ items, onImageClick }) => {
  return (
    <ul className={css.imageGallery}>
      {items.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeUrl={largeImageURL}
            description={tags}
            onImageClick={onImageClick}
          />
        );
      })}
    </ul>
  );
};
