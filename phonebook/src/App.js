import { useState, useEffect} from 'react';
import axios from 'axios';
import Persons from "./components/Persons";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if(persons.some(person => person.name === newName))
    {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const id = persons.filter(person => person.name === newName).map(el => el.id)[0];
        const changedNumber = {...persons.filter(person => person.name === newName).find(person => person.name === newName), number: newNumber}
        axios.put(`/api/persons/${id}`,changedNumber)
           .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
          })
           .catch(error => {
            setErrorMessage(
              `The Information of ${newName} has been removed from the server`
           );
            setTimeout(() => {
              setErrorMessage(null)
            },4000)
          })
      }
    } else {
        const phonebookList = persons.concat(newPerson);
        setPersons(phonebookList);
        axios.post("/api/persons",newPerson)
            .then(response => 
              setPersons(persons.concat(response.data))
              )
        setSuccessMessage(`${newName} has been added to the phonebook !`);
        setTimeout(() => {
          setSuccessMessage(null)
        },2500)
    }
    setNewName("");
    setNewNumber("");
  }

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  }
  const handleFilterInput = (e) => {
    setNewFilter(e.target.value);
  }

  const deleteContact = (e) => {
    if(window.confirm(`Delete ${e.target.id}`))
    {
    axios.delete(`/api/persons/${e.target.value}`)
         .then(
            setPersons(persons.filter(person => person.name !== e.target.id))
          )
    }
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter value={newFilter} onChange={handleFilterInput}/>
      <br />
      <Notification message={errorMessage} style={{backgroundColor: "red"}}/>
      <Notification message={successMessage} style={{backgroundColor: "#4BB543"}}/>
      <h3>Add new Person to the book</h3>
      <PersonForm 
        onSubmit={addPerson}
        value1={newName}
        value2={newNumber}
        onChange1={handleNameInput}
        onChange2={handleNumberInput}
      />
      <h3>Numbers</h3>
      <Persons person={personToShow} key={personToShow.id} onClick={deleteContact}/> 
    </div>
  )
}

export default App