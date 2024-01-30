import React from 'react';
import { useEffect } from 'react';

const Notification = ({ notifications, isDropdownOpen,setClear }) => {

    const removenotifications = ()=>{
        localStorage.removeItem('notifications')
        localStorage.removeItem('bookings')
        setClear(true)

    }
  return (
    isDropdownOpen && (
        <>
      <div className="bg-blue-200 rounded-lg border w-[300px] border-gray-300 text-xs  p-2  shadow mt-2 right-0">
        {notifications.map((notification, index) => (
          <div  className='mt-2 flex justify-center ' key={index}>{notification}</div>
        ))}
      </div>
      <div className=' mt-3'  >
         <span onClick={removenotifications}  className="bg-red-500 text-white  border px-2 py-1 text-sm w-[300px] border-gray-300 rounded-lg" >Clear All</span>
      </div>
      </>

    )
  );
};

export default Notification;
