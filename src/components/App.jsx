import { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('contacts');
    storageContacts && this.setState({contacts: JSON.parse(storageContacts)})
    }

  componentDidUpdate (prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onAddContact = contactData => {
    const checkedContact = this.state.contacts.find(
      contact => contactData.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (checkedContact) {
      alert(`${contactData.name} is already in contacts`);
      return;
    } else {
      const contact = { id: nanoid(), ...contactData };
      this.setState({ contacts: [contact, ...this.state.contacts] });
    }
  };

  onFilter = filterData => {
    this.setState({ filter: filterData });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );

    return (
      <Section>
        <h1>
          <span>☎︎ </span>Phonebook
        </h1>
        <Form onAddContact={this.onAddContact} />
        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} filter={this.state.filter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </Section>
    );
  }
}
