import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import NoteContext from '../context/notes/noteContext';
import ModalAddNote from './ModalAddNote';
import Alert from "./Alert";

const Modal = ({ props, darkMode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const trigger = useRef(null);
  const modal = useRef(null);
  const [alert, setAlert] = useState({
    title: "",
    message: ""
});

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      if (!modalOpen || modal.current.contains(target) || trigger.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleDelete = () => {
    deleteNote(props._id);
    setAlert({
      title: "NoteWhiz",
      message: "Note deleted successfully",
    })
    setTimeout(() => {
      setAlert({
        title: "",
        message: "",
      })
    }, 4000);
    setModalOpen(false);
    
  };
 
  

  return (
    <>      
      <button
        ref={trigger}
        onClick={() => setModalOpen(true)}
        className={`rounded-full bg-primaryColor ring-1 ring-primaryColor hover:bg-transparent hover:text-primaryColor transition px-6 py-3 text-base font-medium text-white`}
      >
        View Details
      </button>
      <div className="container mx-auto py-3 ">
        <div
          className={`fixed left-0 top-0 flex h-full  min-h-screen w-full items-center  bg-black bg-opacity-50 justify-center backdrop-blur-sm bg-dark/90 px-4 py-5 ${modalOpen ? "block" : "hidden"
            }`}
        >
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            onBlur={() => setModalOpen(false)}
            className="w-full backdrop:blur max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
            {/* <p
              className={`rounded-md border mx-[-70px] rounded-tl-[20px] mt-[-81px] bg-primaryColor p-2 text-center text-base font-medium text-white `}
              >
                {props.tag}
              </p> */}
            <div className="flex mt-[-20px] items-center gap-2 justify-between">
              <p className={`rounded-md border mx-[-70px] rounded-tl-[20px] mt-[-81px] bg-primaryColor p-2 text-center text-base font-medium text-white`}>
                {props.tag}
              </p>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setEditModalOpen(true)}
                  className={`rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition`}
                >
                  <FaRegEdit />
                </button>
                <button onClick={handleDelete}
                  className={`rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition`}
                >
                  <MdDeleteSweep />
                </button>
              </div>
            </div>
            <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
              {props.title}
            </h3>
            <span className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primaryColor`}></span>
            <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
              {props.description}
            </p>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                >
                  Close
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button className="block w-full rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition">
                  <a href={`/#`}> Share(coming soon) </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        {editModalOpen && <ModalAddNote existingNote={props} setModalOpen={setEditModalOpen} />}
      </div>
    </>
  );
};

export default Modal;
