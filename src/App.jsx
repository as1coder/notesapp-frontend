import { useState, useEffect } from 'react'
import Notetext from './component/notetext'
import './App.css'
import axios from 'axios'

function App() {
  const [inputValue, setinputValue] = useState('')
  const [inputText, setinputText] = useState([])

  const API_URL = 'https://notesapp-backend-jpux.onrender.com';



  const handleEdit = (id) => {
    const noteToEdit = inputText.find(note => note._id === !id);
    if (noteToEdit) {
      setinputText(noteToEdit.text)
    }
  }


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${id}`);
      setinputText(inputText.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };


  const handleAdd = async () => {
    if (inputValue.trim() === '') return;

    try {
      const res = await axios.post(`${API_URL}/api/notes`, {
        text: inputValue
      });

      setinputText([res.data, ...inputText]);
      setinputValue('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleSave = async (id, updatedText) => {
    if (updatedText.trim() === '') return;

    try {
      const res = await axios.put(`${API_URL}/api/notes/${id}`, {
        text: updatedText
      });

      setinputText(inputText.map(note => note._id === id ? res.data : note));
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/notes`);
        setinputText(res.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);


  return (
    <>
      <div className=' p-12 bg-slate-800 text-white min-h-screen'>
        <div className=' rounded-lg p-4 min-w-full bg-slate-700 shadow-slate-400 overflow-auto  shadow-lg h-[40%]' >
          <div className='justify-center flex items-center p-3 gap-3 sm:flex-row flex-col'>
            <input placeholder='Type here...'
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              className='text-black px-4 py-2 rounded w-full sm:w-[400px]' type="text" />
            <button className="bg-slate-400 text-white px-4 py-1 rounded 
                   hover:bg-slate-600 hover:shadow-md hover:shadow-white 
                   transition duration-200 cursor-pointer" onClick={handleAdd}> add</button>
          </div>
        </div>

        <span className='shadow-sm shadow-white m-4' > <h1>Your Notes</h1></span>


        <div>
          {inputText.map((note) => (

            <Notetext key={note._id}
              text={note.text}
              id={note._id}
              onSave={handleSave}
              onDelete={handleDelete}
              onEdit={handleEdit} />
          ))
          }
        </div>

      </div>
    </>
  )
}

export default App
