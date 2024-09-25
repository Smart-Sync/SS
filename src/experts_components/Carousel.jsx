import React, { useState } from 'react';

const Carousel = ({ interviews }) => {
  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % interviews.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + interviews.length) % interviews.length);
  };

  if (interviews.length === 0) return <div>No upcoming interviews.</div>; // Handle empty state

  return (
    <div id="controls-carousel" className="relative w-full" data-carousel="static">
      {/* Carousel Wrapper */}
      <div style={{ backgroundColor: '#FEF9D9' }} className="relative h-56 overflow-hidden rounded-lg md:h-79 bg-red-100 shadow-md p-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className={`${index === currentIndex ? 'block' : 'hidden'} absolute block w-full h-full flex flex-col items-center justify-start py-6 duration-700 ease-in-out`}
          >
            <h2 className="text-xl font-bold ">{interview.requirement} Interview Board</h2>
            <p className='w-[70%] text-center'>You have been invited to an interview for the subject  {interview.requirement}</p>
            <p className="mb-4">Date: {new Date(interview.date).toLocaleDateString()}</p>
            <div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-5 hover:bg-green-600">
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
