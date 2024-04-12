import { Component } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import { GoSearch } from 'react-icons/go';

export class Searchbar extends Component {
  state = {
    guery: '',
  };
  handleChange = e => {
    this.setState({ guery: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.guery.trim() === '') {
      return Notiflix.Notify.info('Please input a query');
    }
    this.props.submit(this.state.guery);
    this.setState({ guery: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <GoSearch size="24" color="red" />
          </button>
          <label className={css.SearchFormButtonLabel}>Search</label>
          <input
            onChange={this.handleChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            value={this.state.guery}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
