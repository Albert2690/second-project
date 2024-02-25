import React from "react";
import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import logo from "../../assets/images/Vcare.png";
import profile from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import ALogout from "./Logout";
import { io } from "socket.io-client";
import { useGetbookingNotificationMutation } from "../../slices/adminApislice";
import { IoIosNotifications } from "react-icons/io";
import Notification from "./Notification";
import Notification1 from "./Notification1";
const socket_url = import.meta.env.VITE_APP_BASE_URLL;

import { BiMenu } from "react-icons/bi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const navLinks = [
  {
    path: "/admin",
    display: "Home",
  },
  {
    path: "/admin/services-managment",
    display: "Services",
  },
  {
    path: "/admin/doctors",
    display: "Doctors",
  },
  {
    path: "admin/users",
    display: "Users",
  },
  {
    path: "admin/appoinments",
    display: "Appoinments",
  },
];

function AHeader() {

  const [getnotification, { isloading }] = useGetbookingNotificationMutation();
  const headref = useRef(null);
  const menuref = useRef(null);
  const socket = useRef(null);
  const [clear, setClear] = useState(false);

  const [isdropdown, setisdropdown] = useState(false);
  const [notification, setNotification] = useState([]);
  const { adminInfo } = useSelector((state) => state.admin);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuref.current.contains(event.target)) {
        // setisdropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const notificationss =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotification(notificationss);
    const handlestickyHeader = () => {
      window.addEventListener("scroll", () => {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headref.current.classList.add("sticky_header");
        } else {
          headref.current.classList.remove("sticky_header");
        }
      });
    };

    handlestickyHeader();

    return () => {
      window.removeEventListener("scroll", handlestickyHeader);
    };
  }, [clear, notification]);

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

          setNotification(notifications);
          localStorage.setItem("bookings", JSON.stringify(bookings));
          localStorage.setItem("notifications", JSON.stringify(notifications));
        }
      });
    };

    setupSocket();
  }, [notification]);

  const toggleMenu = () => {
    menuref.current.classList.toggle("show_menu");
  };

  const memoizedNotifications = useMemo(() => {
    return JSON.parse(localStorage.getItem("notifications")) || [];
  }, []);

  const notificationClassName = `absolute text-red-600 top-5 text-xs right-1 font-bold ${
    notification.length > 0 ? "visible" : "hidden"
  }`;
  const iconstyle =
    isdropdown && notification.length > 0 ? "hidden" : "visilble";

    

  return (
    <header className="header flex items-center" ref={headref}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <Link to={"/admin"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="navigation" ref={menuref} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-4">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navclass) =>
                      navclass.isActive
                        ? "text-primaryColor leading-[7] font-[700] text-[20px]"
                        : "text-textColor leading-[7] font-[700] text-[17px]"
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {adminInfo ? (
              <>
                {/* <div
                  onClick={() => setisdropdown(!isdropdown)}
                  className="px-2  relative cursor-pointer "
                >
                  <div className={`cursor-pointer ${iconstyle}`}>
                    <IoIosNotifications className="w-[30px] h-[30px]" />
                    <div className={notificationClassName}>
                      {notification.length}
                    </div>
                  </div>
                  {notification.length > 0 && (
                    <Notification
                      notifications={notification}
                      isDropdownOpen={isdropdown}
                      setClear={setClear}
                    />
                  )}
                </div> */}
 <div>
  <Notification1 />
 </div>

                <div className=""></div>
                <ALogout />
              </>
            ) : (
              <Link to={"/admin/login"}>
                <button className="bg-primaryColor px-2 py-1 rounded-full font-[500] w-full text-sm text-white flex items-center justify-center">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-7 h-7"></BiMenu>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AHeader;
