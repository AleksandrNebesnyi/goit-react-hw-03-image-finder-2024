import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';
import initialContacts from '../contacts';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  CONTACT_STORAGE_KEY = 'contacts';

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(this.CONTACT_STORAGE_KEY));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        this.CONTACT_STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = ({ name, number }) => {
    const normalizeName = name.toLowerCase();
    if (normalizeName.trim() === '') {
      return;
    }
    const ifNameAlreadyExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );

    if (ifNameAlreadyExist) {
      Notiflix.Notify.failure(`${name} is alredy in contact`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => {
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>

        <ContactForm submit={this.addContact} />

        <h2>Contacts</h2>

        <Filter onFilterChange={this.handleChange} value={filter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

// export const App = () => {
//   return (
//     <div className={css.container}>

//       <input type="text" name="name" required />
//     </div>
//   );
// };
