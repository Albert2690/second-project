import { useEffect, useState } from "react";
// import { useUserBlockMutation,useUsersFetchMutation } from '../../slices/adminApislice'
import { useFetchBookingMutation } from "../../slices/DoctorApislice";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { UserTable } from '../../components/Admin/UserTable'
import { AppoinmetTable } from "../../components/Doctors/AppoinmentTable";
import VedioModal from "../../components/Doctors/VedioModal";
import Pagination from "../../components/Pagination";

export default function Appoinments() {
  const [bookingchange, setBookingChange] = useState(false);
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin);
  const [bookingFetch, { isLoading }] = useFetchBookingMutation();
  const [search, setSearch] = useState("");
  const { doctorInfo } = useSelector((state) => state.doctor);

  console.log(doctorInfo, "ifoo");

  const { doctorJwt } = doctorInfo.result;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await bookingFetch({ doctorJwt });

        if (responseUsers.data.success) {
          console.log(responseUsers.data.bookings, "ht");
          // const usersArray = responseUsers.data.users
          setBookings(responseUsers.data.bookings);
        }
      } catch (error) {
        toast.error("Internal Server Error");
      }
    };
    fetchData();
    console.log(bookings, "bookin");
  }, [bookingchange]);

  const handlefilter = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  let filteredDoctors = bookings.filter(
    (item) =>
      item.user.name.toLowerCase().includes(search.toLowerCase()) ||
      item.user.email.toLowerCase().includes(search.toLowerCase())
  );
  const lastindex = currentPage * postPerPage;

  const startIndex = lastindex - postPerPage;

  const Bookingss = filteredDoctors.slice(startIndex, lastindex - 1);

  return (
    <section>
      <div className="md:container px-2">
        <div className="flex-col ">
         
               <form action="" className="w-full flex justify-center mb-7">
            <input
              type="text"
              onChange={(e) => handlefilter(e)}
              placeholder="Search by name or email... "
              className="border   rounded-full text-sm text-center w-[200px] md:w-[400px] h-[45px] border-textColor focus:border-blue-400"
            />
          </form>
          <div className="mt-5  ">
            <button><VedioModal /></button>
          </div>
          <h2 className="font-bold flex justify-center items-start text-textColor mb-7 text-[40px]  ">
            Appoinments
          </h2>
          <AppoinmetTable users={Bookingss} setUserChange={setBookingChange} />
        </div>
      </div>
      <div>
      <Pagination
            totalPosts={bookings.length}
            postPerPage={postPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
    </section>
  );
}
