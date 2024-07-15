import React from 'react';
import Modal from './Modal';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


const NotesContainer = ({
  props
  // image
  // darkMode // Pass darkMode as a prop from parent component
}) => {
  const formatDate = (inputDate) => {
    // Create a new Date object from the input string
    const date = new Date(inputDate);

    // Define options for formatting the date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Format the date according to options
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
};


  return (
    <>
      <div className={`mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 ${props.darkMode ? 'dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3' : ''}`}>
        {/* <img src={image} alt="" className="w-full" /> */}
        {props.date && (
          <span className={`mb-5 inline-block rounded bg-primaryColor px-4 py-1 text-center text-xs font-semibold leading-loose text-white ${props.darkMode ? 'dark:bg-primaryColor' : ''}`}>
            {formatDate(props.date)}
          </span>
          
        )}
        
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <div
              className={`mb-4 block text-xl font-semibold ${props.darkMode ? 'text-white hover:text-primaryColor' : 'text-dark hover:text-primaryColor'} sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]`}
            >
              {props.title}
            </div>
          </h3>
          {/* <p className={`mb-7 text-base leading-relaxed ${darkMode ? 'text-dark-6' : 'text-body-color'}`}> */}
          <p className={`mb-7 text-base leading-relaxed text-body-color`}>
            {props.description}
          </p>
              <div className="">
            <Modal props={props}
            darkMode={props.darkMode}/>
          </div>
            {/* edit , delete button */}
          {/* <div className="flex items-center gap-2 justify-end">
            <button
              className={`rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition`}
            >
              <FaRegEdit />
            </button>
            <button
              className={`rounded-md border border-primaryColor bg-primaryColor p-3 text-center text-base font-medium text-white hover:bg-transparent hover:text-primaryColor transition`}
            >
              <MdDeleteSweep />
            </button>
          </div> */}
            
          
        </div>
      </div>
    </>
  )
}

export default NotesContainer;
