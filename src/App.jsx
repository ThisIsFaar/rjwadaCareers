import { useState } from 'react';
import './App.css';
import JobCard from './components/card';
import Navbar from './components/navbar';
import SearchBar from './components/searchbar';

function App() {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="flex justify-center flex-wrap bg-red-100 ">
        {data.map((card) => {
          return <JobCard />;
        })}
      </div>
    </>
  );
}

export default App;
