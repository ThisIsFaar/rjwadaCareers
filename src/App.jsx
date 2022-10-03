import { useState } from 'react';
import './App.css';
import { data, locationOptions, roleTypeOptions } from './assets/data';
import JobCard from './components/card';
import Navbar from './components/navbar';

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
      <div
        className="border-b flex justify-evenly items-center"
        style={{ height: '25vh' }}
      >
        {/* Search Bar*/}
        <div class="relative flex items-center w-1/4 h-12 rounded-lg shadow-lg bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
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
        <div class="flex justify-center">
          <div>
            <span className="font-medium">Location:</span>
            {locationOptions.map((field, index) => {
              return (
                <div class="form-check" key={field}>
                  <input
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                    class="form-check-label inline-block text-gray-800"
                    for="flexCheckDefault"
                  >
                    {field}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Type */}
        <div class="flex justify-center">
          <div>
            <span className="font-medium">Role Type:</span>
            {roleTypeOptions.map((field, index) => {
              return (
                <div class="form-check" key={field}>
                  <input
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                    class="form-check-label inline-block text-gray-800"
                    for="flexCheckDefault"
                  >
                    {field}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <div className="font-medium">Sort By:</div>
          <button
            type="button"
            class="text-white flex bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
            onClick={() => {
              sortByDate === 1 ? setSortByDate(-1) : setSortByDate(1);
            }}
          >
            Date Posted {sortByDate === 1 ? '🡻' : '🡹'}
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap bg-blue-100 h-screen">
        {transformJobs().length > 0
          ? transformJobs().map((job) => {
              return <JobCard job={job} />;
            })
          : `We will be glad to onboard you, but at present, we don't have the fitting role for you`}
      </div>
    </>
  );
}

export default App;
