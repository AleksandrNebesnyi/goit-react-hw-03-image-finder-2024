import { Component } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImage } from '../components/api/api-servis';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
      this.scrollOnLoadButton();
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      page: 1,
      searchQuery: query,
      error: null,
      isLoading: false,
    });
  };

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    this.setState({ isLoading: true });
    getImage(searchQuery, page)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data],
        }));
      })
      .catch(error => {
        this.setState({ error });
        Notiflix.Notify.error('Something is wrong try again');
      })

      .finally(() => this.setState({ isLoading: false }));
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };
  handleImageClick = largeImgUrl => {
    this.setState({
      showModal: true,
      largeImage: largeImgUrl,
    });
  };
  //  Скролл при клике на кнопку
  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, showModal, largeImage } = this.state;

    const shouldRenderLoadMoreButton = images.length >= 12 && !isLoading;

    return (
      <div className={css.container}>
        <Searchbar submit={this.onChangeQuery} />
        {isLoading && <Loader height="150" width="150" />}
        {images && (
          <ImageGallery items={images} onImageClick={this.handleImageClick} />
        )}
        {shouldRenderLoadMoreButton && <Button onBtnClick={this.handleClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImage}></Modal>
        )}
      </div>
    );
  }
}
