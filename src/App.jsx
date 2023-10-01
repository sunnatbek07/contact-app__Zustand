import React, { useEffect, useState } from 'react';
import useContact from './store/contact';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const [tel, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [tg, setTg] = useState("");

  const { contact, addContact } = useContact();

  const addcontact = () => {
    const newContact = {
      id: Date.now(),
      tel,
      email,
      tg
    }

    if (newContact.tel.trim().length && newContact.email.trim().length && newContact.tg.trim().length) {
      addContact(newContact)
      setTitle("")
      setEmail("")
      setTg("")
    } else {
      alert("Please fill the field!")
    }
  }

  return (
    <div className='container mx-auto'>
      <ToastContainer />
      <div className='my-5 py-5 shadow-xl border w-[70%] mx-auto'>
        <h2 className='text-2xl text-blue-600 text-center font-bold'>Contacts</h2>
        <div className='w-full flex gap-5 mt-4 px-3 flex-wrap'>
          <input
            type="tel"
            id='phone'
            name='phone'
            placeholder='Enter phone number'
            className='rounded-md border focus:outline-blue-500 px-3 py-1 grow'
            onChange={(e) => setTitle(e.target.value)} />
          <input
            type="email"
            id='email'
            name='email'
            placeholder='Enter email'
            className='rounded-md border focus:outline-blue-500 px-3 py-1 grow'
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='flex items-center px-3 gap-5 mb-10 mt-5 flex-wrap'>
          <input
            type="text"
            placeholder='Enter telegram username'
            className='rounded-md border focus:outline-blue-500 px-3 py-1 grow'
            onChange={(e) => setTg(e.target.value)} />

          <button className='px-3 py-1 bg-blue-500 text-white rounded-md active:bg-blue-800' onClick={addcontact}>Add contact</button>
        </div>
        <ul className='flex flex-col gap-y-5 my-5 px-3'>
          {
            contact?.length ? contact.map((item) => {
              return (
                <li key={item} className='flex items-center justify-between p-5 shadow-sm border rounded-md flex-wrap'>
                  <div className='flex items-center gap-5 flex-wrap'>
                    <p className='px-3 border-x border-black'>{item?.tel}</p>
                    <p className='px-3 border-x border-black'>{item?.email}</p>
                    <p className='px-3 border-x border-black'>{item?.tg}</p>
                  </div>
                  <button className='rounded-md bg-red-500 text-white px-3 font-semibold mt-3 lg:mt-0'>Delete</button>
                </li>
              )
            }) : <h3 className='text-center text-red-500 text-2xl'>Contact is empty</h3>
          }
        </ul>
      </div>
    </div>
  )
}

export default App