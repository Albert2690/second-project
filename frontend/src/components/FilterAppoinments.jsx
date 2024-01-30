import React, { useState } from 'react';

const FilterAppoinment = ({setFilter}) => {
  const [sortBy, setSortBy] = useState([]);
  const [filterBy, setFilterBy] = useState([]);

  const handleSort = (sortValue) => {
   setSortted(sortValue)
  };

  const handleFilter = (filtered) => {
    console.log("handleddd",filtered)
    setFilter(filtered)
    
  };

  return (
    <div className='w-full flex flex-row gap-10' >

<div style={{ display: 'flex', alignItems: 'center' }}>
        <label className='relative text-cyan-400 text-lg font-bold  rounded-lg'>Filter By:</label>
        <select onChange={(e)=>handleFilter(e.target.value)}
              className="focus:outline-none  rounded-lg  text-black font-semibold   md:text-md text-sm  "
              id="yourSelect"
              
              name="role"
            >
              <option value="">Status</option>
              <option className='text-black font-semibold text-md' value="completed">completed</option>
              <option className='text-black font-semibold text-md' value="pending">pending</option>
              <option className='text-black font-semibold text-md' value="cancelled">cancelled</option>


            </select>
       
      </div>

     
     

     
    </div>
  );
};

export default FilterAppoinment;
