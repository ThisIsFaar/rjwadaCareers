import { useState } from 'react';
import ApplyModal from './applyModal';

const JobCard = ({ job }) => {
  const [applyModalToggle, setApplyModalToggle] = useState(false);
  const toggleModal = () => {
    applyModalToggle === true
      ? setApplyModalToggle(false)
      : setApplyModalToggle(true);
  };
  return (
    <div className="block rounded-lg w-96 m-6 shadow-lg bg-white  text-center">
      {applyModalToggle && <ApplyModal job={job} toggleModal={toggleModal} />}
      <div className="p-4 border-b text-gray-900 text-xl font-medium mb-2">
        {job.title}
      </div>
      <div>
        <label className="text-gray-500 text-xs font-medium mb-2">
          location:{' '}
        </label>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
          {job.location}
        </span>
      </div>

      <div className="p-6">
        <p className="text-gray-700 text-base mb-4 max-h-60 overflow-auto">
          {job.description}
        </p>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mb-4">
          <svg
            aria-hidden="true"
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          Posted {job.postedDays} days ago
        </div>
        <div className="">
          <label className="text-gray-500 text-xs font-medium mb-2">
            Experience :{' '}
          </label>
          <span className="bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
            {job.experienceRequired}
          </span>
        </div>
        <label className="text-gray-500 text-xs font-medium ">
          Role :{' '}
          <span className="text-gray-900 text-xs font-medium ">{job.role}</span>
        </label>

        <div className="mt-6">
          <button
            type="button"
            className="  border-t px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={toggleModal}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
