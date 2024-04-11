import { Component } from 'react';
import css from './ContactsList.module.css';

export class ContactsList extends Component {
  render() {
    const { contacts, onDeleteContact } = this.props;
    return (
      <ul className={css.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={css.listItem}>
            <p className={css.itemText}>
              {name}:{number}
            </p>

            <button
              type="button"
              className={css.itemButton}
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
