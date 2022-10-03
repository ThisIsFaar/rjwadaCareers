import { useRef, useState } from 'react';
import { emailTemplateID, emailPublicID, emailServiceID } from '../backend';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ApplyModal = ({ job, toggleModal }) => {
  const form = useRef();
  const { title: job_title, role: role_type } = job;
  const [data, setData] = useState({
    name: '',
    email: '',
    resume_link: '',
    job_title,
    role_type,
  });
  const handleChange = (name) => (e) => {
    console.log(form.current);
    setData({ ...data, [name]: e.target.value });
  };
  const { name, email, resume_link } = data;
  const onSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(emailServiceID, emailTemplateID, form.current, emailPublicID)
      .then(
        (result) => {
          toggleModal();
          toast.success('Congrats! you have successfully applied', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          toggleModal();
          toast.error('Something Went Wrong!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
  };
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
        style={{
          zIndex: '5',
          backgroundColor: '#000000c2',
        }}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={toggleModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                Applying for {`${job_title} ${role_type}`}
              </h3>
              <form ref={form} className="space-y-6" action="#">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange('name')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange('email')}
                    placeholder="Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="resume_link"
                    value={resume_link}
                    onChange={handleChange('resume_link')}
                    placeholder="Resume Public Link: upload it on GDrive etc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <input type="hidden" name="job_title" value={job_title} />
                <input type="hidden" name="role_type" value={role_type} />
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onSubmit}
                >
                  Send Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyModal;
