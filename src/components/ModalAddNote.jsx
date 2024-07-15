import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/noteContext';
import Alert from './Alert';

const ModalAddNote = ({ existingNote, darkMode, setModalOpen }) => {
    const { addNote, editNote, alert } = useContext(NoteContext);

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "Personal"
    });

    const modalRef = useRef();

    // Use effect to set note state if existingNote is provided
    useEffect(() => {
        if (existingNote) {
            setNote({
                title: existingNote.title,
                description: existingNote.description,
                tag: existingNote.tag
            });
        }
    }, [existingNote]);

    const handleClick = (e) => {
        e.preventDefault();
        // Conditional logic for adding or updating note
        if (existingNote) {
            editNote(existingNote._id, note.title, note.description, note.tag);
        } else {
            addNote(note.title, note.description, note.tag);
        }
        setModalOpen(false);
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    // Close modal on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setModalOpen]);

    return (
        <>
            {/* <Alert title={alert.title} message={alert.message} /> */}
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                <div ref={modalRef} className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]">
                    <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
                        NoteWhiz - {existingNote ? "Update Note" : "Add Note"}
                    </h3>
                    <span className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primaryColor`}></span>
                    <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <input minLength={3} required onChange={handleChange} value={note.title} type="text" className='p-2 w-full rounded-lg border border-primaryColor/20' name="title" id="title" placeholder='Title' />
                    </p>
                    <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <input onChange={handleChange} value={note.tag} type="text" className='p-2 w-full rounded-lg border border-primaryColor/20' name="tag" id="tag" placeholder='Tag' />
                    </p>
                    <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                        <textarea minLength={3} required onChange={handleChange} value={note.description} className='p-2 w-full border border-primaryColor/20 rounded-lg' name="description" id="description" placeholder='Write your note here'></textarea>
                    </p>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3">
                            <button onClick={handleClick} className={`block w-full rounded-md border border-primaryColor  p-3 text-center text-base font-medium ${note.title.length < 3 || note.description.length < 3
                                ? "bg-primaryColor/50"
                                : "bg-primaryColor hover:bg-transparent hover:text-primaryColor"
                                } text-white  transition`}>
                                {existingNote ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAddNote;
