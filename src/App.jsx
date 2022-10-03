import { useState } from 'react';
import './App.css';
import { data, locationOptions, roleTypeOptions } from './assets/data';
import JobCard from './components/card';
import Navbar from './components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer';

function App() {
  const [jobs, setJobs] = useState(data);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(
    new Array(locationOptions.length).fill(false)
  );
  const [roleType, setRoleType] = useState(
    new Array(roleTypeOptions.length).fill(false)
  );
  const [sortByDate, setSortByDate] = useState(1);
  const transformJobs = () => {
    let availableJobs = [...jobs];
    if (search) {
      availableJobs = availableJobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortByDate) {
      availableJobs = availableJobs.sort((a, b) => {
        if (sortByDate === 1) {
          return a.postedDays - b.postedDays;
        } else {
          return b.postedDays - a.postedDays;
        }
      });
    }
    if (location) {
      let locationFiltersAdded = [];
      location.forEach((value, index) => {
        if (value === true) {
          locationFiltersAdded.push(locationOptions[index]);
        }
      });
      if (locationFiltersAdded.length > 0) {
        availableJobs = availableJobs.filter((job) =>
          locationFiltersAdded.includes(job.location)
        );
      }
    }

    if (roleType) {
      let roleTypeFiltersAdded = [];
      roleType.forEach((val, index) => {
        if (val === true) {
          roleTypeFiltersAdded.push(roleTypeOptions[index]);
        }
      });
      if (roleTypeFiltersAdded.length > 0) {
        availableJobs = availableJobs.filter((job) =>
          roleTypeFiltersAdded.includes(job.role)
        );
      }
    }

    return availableJobs;
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className=" border-b flex flex-wrap justify-evenly items-center">
        {/* Search Bar*/}
        <div className="search-bar relative flex items-center w-1/4 h-12 rounded-lg shadow-lg bg-white overflow-hidden">
          <div className=" grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            value={search}
            onChange={() => {
              setSearch(event.target.value);
            }}
            placeholder="Search for Job Title.."
          />
        </div>

        {/* CheckBox Location */}
        <div className="flex filter-location justify-center">
          <div>
            <span className="font-medium">Location:</span>
            {locationOptions.map((field, index) => {
              return (
                <div className="form-check" key={field}>
                  <input
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value={field}
                    checked={location[index]}
                    onChange={() => {
                      const updateLocation = location.map((val, fieldIndex) => {
                        return fieldIndex === index ? !val : val;
                      });
                      setLocation(updateLocation);
                    }}
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="flexCheckDefault"
                  >
                    {field}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Type */}
        <div className="flex self-start filter-role justify-center">
          <div>
            <span className="font-medium">Role Type:</span>
            {roleTypeOptions.map((field, index) => {
              return (
                <div className="form-check" key={field}>
                  <input
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value={field}
                    onChange={() => {
                      let roleTypeFilters = roleType.map((role, roleIndex) =>
                        roleIndex === index ? !role : role
                      );
                      setRoleType(roleTypeFilters);
                    }}
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="flexCheckDefault"
                  >
                    {field}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sort By */}
        <div className="filter-sort self-start">
          <div className="font-medium">Sort By:</div>
          <button
            type="button"
            className="text-white flex bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
            onClick={() => {
              sortByDate === 1 ? setSortByDate(-1) : setSortByDate(1);
            }}
          >
            Date Posted {sortByDate === 1 ? '🡻' : '🡹'}
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap bg-blue-100">
        {transformJobs().length > 0 ? (
          transformJobs().map((job, key) => {
            return <JobCard key={key} job={job} />;
          })
        ) : (
          <span className="h-fit">
            We will be glad to onboard you, but at present, we don't have the
            fitting role for you
          </span>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
