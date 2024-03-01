import React, { useEffect, useState } from 'react';
import useContactStore from './store/contact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { contacts, addContact, deleteContact, loadContacts, saveContacts } = useContactStore();

  const [uName, setuName] = useState("");
  const [tel, setTitle] = useState("");

  useEffect(() => {
    loadContacts();
  }, [])

  const handleAddContact = () => {
    const newContact = { name: uName, phone: tel }
    if (newContact.name.length == 0) {
      toast.error("Please enter name!");
    } else if (newContact.phone.length == 0) {
      toast.error("Please enter phone number!");
    } else {
      setuName("");
      setTitle("");
      toast.success("Contacs added successfully!")
      addContact(newContact);
      saveContacts();
    }
  };

  const handleDeleteContact = (index) => {
    deleteContact(index);
    toast.warn("Contact deleted!");
    saveContacts();
  };

  return (
    <div className='container mx-auto px-[10px] md:px-5'>
      <ToastContainer />
      <div className='my-10 py-5 shadow-xl border w-[100%] md:w-[80%] mx-auto'>
        <h4 className='text-xl text-center my-3 bg-blue-50 font-semibold py-1 '>Add contact</h4>
        <div className='w-full flex gap-5 mt-4 px-3 flex-wrap'>
          <input
            type="text"
            value={uName}
            placeholder='Enter name'
            className='rounded-md border focus:outline-blue-500 px-3 py-1 grow'
            onChange={(e) => setuName(e.target.value)} />
          <input
            type="text"
            value={tel}
            placeholder='Enter phone number'
            className='rounded-md border focus:outline-blue-500 px-3 py-1 grow'
            onChange={(e) => setTitle(e.target.value)} />

          <button className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400 active:bg-blue-800 duration-150 mx-auto xl:m-0' onClick={handleAddContact}>
            Add contact
          </button>
        </div>

        <div className='bg-blue-50 m-3 p-3'>
          <h2 className='text-2xl text-blue-600 text-center font-bold cursor-default'>
            Contacts
          </h2>

          <ul className='flex flex-col gap-y-5 my-5 px-3'>
            {contacts.length ? (
              contacts.map((item, index) => (
                <li key={index} className='flex items-center justify-between p-5 shadow-sm border rounded-md flex-wrap'>
                  <div className='flex flex-grow items-center gap-5 flex-wrap'>
                    <p className='px-3 py-1 shadow-md border border-gray-300 cursor-default max-w-[250px] w-full'>
                      Name: {item.name}
                    </p>
                    <p className='px-3 py-1 shadow-md border border-gray-300 cursor-default max-w-[250px] w-full'>
                      Phone: {item.phone}
                    </p>
                  </div>
                  <button className='rounded-md bg-red-500 text-white px-4 py-1 font-semibold mt-3 md:mt-0 lg:mt-0 hover:bg-red-400 active:bg-red-700 duration-150' onClick={() => handleDeleteContact(index)}>
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <h3 className='text-center text-red-500 text-2xl'>
                Contact list is empty!
              </h3>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
