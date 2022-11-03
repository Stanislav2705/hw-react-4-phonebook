import { useState,useEffect } from "react";
import FormPhoneBook from "./FormPhoneBook/FormPhoneBook";
import PhoneBookList from "./PhoneBookList/PhoneBookList";
import BlockPhone from "./BlockPhone/BlockPhone";
import { nanoid } from "nanoid";
import { Label,Input,Text } from "./Phonebook.styled";



export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
        const value = JSON.parse(localStorage.getItem("contacts"));
        return value ?? [];
    }
  );
  const [filter, setFilter] = useState("");


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  },[contacts])

  useEffect(() => {
    return () => {
      localStorage.removeItem("contacts")
    }
  }, [])

    const addContacts = (contact) => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} - ${contact.number} is already in contacts.`)
    }
    setContacts((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact,
      }
      return  [...prev,newContact]

    })
    }

    const removeContact = (id) => {
      setContacts((prev) => {
        const newContacts = prev.contacts.filter((item) => item.id !== id);

        return newContacts

      })
    }


    const handleChange = (e) => {
    const { value } = e.target;
    setFilter(value)
  }

  const isDuplicate = ({name, number}) => {
    const result = contacts.find((item) => item.name === name
      && item.number === number);
    return result;
  }

    const getFilterContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter)
        || normalizedNumber.includes(normalizedFilter);
      return result;
    })
    return filteredContacts;
  }

  const filteredContacts = getFilterContacts();

  return (
    <div>
        <BlockPhone title='Phonebook'>
          <FormPhoneBook onSubmit={addContacts} />
        </BlockPhone>
        <BlockPhone title="Contacts">
          <Label htmlFor="filter"><Text></Text></Label>
          <Input
            type="text"
            name="filter"
            value={filter}
            onChange={handleChange}
            placeholder="Find contacts by name"
          />
          <PhoneBookList items={filteredContacts} removeContact={removeContact} />
        </BlockPhone>
    </div>
  )
}


// export default class PhoneBook extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({contacts: parsedContacts})
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     const newContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (newContacts !== prevContacts) {
//       localStorage.setItem('contacts', JSON.stringify(newContacts));
//     }
//   }

//   addContacts = (contact) => {
//     if (this.isDuplicate(contact)) {
//       return alert(`${contact.name} - ${contact.number} is already in contacts.`)
//     }
//     this.setState((prev) => {
//       const newContact = {
//         id: nanoid(),
//         ...contact
//       }
//       return {
//         contacts: [...prev.contacts, newContact]
//       }
//     })
//   }

//   removeContact = (id) => {
//     this.setState((prev) => {
//       const newContacts = prev.contacts.filter((item) => item.id !== id);

//       return {
//         contacts: newContacts,
//       }
//     })
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     })
//   }

//   isDuplicate({name, number}) {
//     const { contacts } = this.state
//     const result = contacts.find((item) => item.name === name
//       && item.number === number);
//     return result;
//   }

//   getFilterContacts() {
//     const { contacts, filter } = this.state;

//     if (!filter) {
//       return contacts;
//     }

//     const normalizedFilter = filter.toLocaleLowerCase();
//     const filteredContacts = contacts.filter(({ name, number }) => {
//       const normalizedName = name.toLocaleLowerCase();
//       const normalizedNumber = number.toLocaleLowerCase();
//       const result = normalizedName.includes(normalizedFilter)
//         || normalizedNumber.includes(normalizedFilter);
//       return result;
//     })

//     return filteredContacts;
//   }

//   render() {
//     const { addContacts,handleChange,removeContact } = this;
//     const { filter } = this.state;
//     const contacts = this.getFilterContacts()
//     return (
//       <div>
//         <BlockPhone title='Phonebook'>
//           <FormPhoneBook onSubmit={addContacts} />
//         </BlockPhone>
//         <BlockPhone title="Contacts">
//           <Label htmlFor="filter"><Text></Text></Label>
//           <Input
//             type="text"
//             name="filter"
//             value={filter}
//             onChange={handleChange}
//             placeholder="Find contacts by name"
//           />
//           <PhoneBookList items={contacts} removeContact={removeContact} />
//         </BlockPhone>
//       </div>
//     )
//   }
// }
