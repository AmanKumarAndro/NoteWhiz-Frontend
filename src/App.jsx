import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import './App.css';
import Notes from './components/Notes';
import ModalAddNote from './components/ModalAddNote';
import { IoIosAddCircle } from "react-icons/io";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <NoteState>
        <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
          <div className="container">
            <Notes/>
            <div>
              <button
                onClick={() => setModalOpen(true)}
                className='text-primaryColor fixed bottom-10 right-10'>
                <IoIosAddCircle size={60} />
              </button>
              {modalOpen && <ModalAddNote
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />}
            </div>
          </div>
        </section>
      </NoteState>
    </>
  );
}

export default App;
