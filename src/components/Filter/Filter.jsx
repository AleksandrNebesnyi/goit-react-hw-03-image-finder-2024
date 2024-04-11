import { nanoid } from 'nanoid';
import { Component } from 'react';
import css from './Filter.module.css';

export class Filter extends Component {
  inputFilterId = nanoid();
  render() {
    const { value, onFilterChange } = this.props;
    return (
      <>
        <label className={css.label} htmlFor="inputFilterId">
          Search contact
          <input
            id="inputFilterId"
            className={css.input}
            type="text"
            name="filter"
            value={value}
            onChange={onFilterChange}
          />
        </label>
      </>
    );
  }
}
