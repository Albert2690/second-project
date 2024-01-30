import React, { useState,useEffect,useRef } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { io } from "socket.io-client";
import { useGetbookingNotificationMutation } from "../../slices/adminApislice";
import { IoIosNotifications } from "react-icons/io";
const socket_url = import.meta.env.VITE_APP_SOCKET_URL;


function Notification1() {
  const socket = useRef(null);
 const [opened,setOpen] = useState(false)
  const [notification, setNotification] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    const notificationss =
    JSON.parse(localStorage.getItem("notifications")) || [];
  setNotification(notificationss);
  },[notification])
  useEffect(() => {
    const setupSocket = () => {
      if (!socket.current) {
        socket.current = io(socket_url);
      }

      socket.current.on("adminNotification", (data) => {
          console.log(data,'data from notification admin')
          const notifications =   JSON.parse(localStorage.getItem("notifications")) || [];
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        if (!bookings.find((booking) => booking._id === data.booking._id)) {
          bookings.push(data.booking);
          notifications.push(data.message);
          console.log(notifications,'notiif')

          setNotification(notifications);
          localStorage.setItem("bookings", JSON.stringify(bookings));
          localStorage.setItem("notifications", JSON.stringify(notifications));
        }
      });
    };

    setupSocket();
  }, [notification]);
  const removenotifications = ()=>{
    localStorage.removeItem('notifications')
    localStorage.removeItem('bookings')
    setClear(true)

}

  const notificationClassName = `absolute text-red-600 top-5 text-xs right-1 font-bold ${
    notification.length > 0 ? "visible" : "hidden"
  }`;
console.log(notification)
  return (
    <div>
    
        <div
                //   onClick={() => setisdropdown(!isdropdown)}
                  className="px-2  relative cursor-pointer "
                >
                  <div    aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} className={`cursor-pointer `}>
                    <IoIosNotifications className="w-[30px] h-[30px]" />
                    <div className={notificationClassName}>
                      {notification.length}
                    </div>
                  </div>
                  {/* {notification.length > 0 && (
                    <Notification
                      notifications={notification}
                      isDropdownOpen={isdropdown}
                      setClear={setClear}
                    />
                  )} */}
                </div>
    
      {notification.length > 0 && (
  <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    className='rounded-lg'
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
  >
    {notification.map((item, index) => (
      <MenuItem className='bg-cyan-400' key={index}>
        {item}
      </MenuItem>
    ))}
    <div className='mt-3 flex justify-center'>
      <span
        onClick={removenotifications}
        className="bg-red-500 text-white text-center max-w-[140px] cursor-pointer border px-2 py-1 text-sm w-[300px] border-gray-300 rounded-lg"
      >
        Clear All
      </span>
    </div>
  </Menu>
)}

    </div>
  );
}

export default Notification1;
