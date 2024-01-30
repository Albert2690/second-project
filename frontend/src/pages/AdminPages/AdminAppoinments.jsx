import { useEffect, useState } from "react";
import { useFetchbookingsMutation } from "../../slices/adminApislice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppoinmetsTable } from "../../components/Admin/AppoinmentsTable";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify"; 
import FilterAppoinment from "../../components/FilterAppoinments";

export default function AdminAppoinments() {
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter,setFilter] = useState('')
  const [bookingchange, setBookingChange] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin);
  const [bookingFetch, { isLoading }] = useFetchbookingsMutation();
  const [search, setSearch] = useState("");
  let filteredBookings = bookings
  if(filter!==''){
    filteredBookings = bookings.filter((item)=>item.status === filter)

  }
  const lastindex = currentPage * postPerPage;

  const startIndex = lastindex - postPerPage;

  const Bookingss = filteredBookings.slice(startIndex, lastindex - 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await bookingFetch();

        if (responseUsers.data.success) {
          console.log(responseUsers.data.bookings, "ht");
          setBookings(responseUsers.data.bookings);
        }
      } catch (error) {
        toast.error("Internal Server Error");
      }
    };
    fetchData();
    console.log(bookings, "bookin");
  }, [bookingchange]);

  return (
    <section>
      <div className="md:container px-2">
        <div className="flex-col ">
          <h2 className="font-bold flex justify-center items-start text-textColor mb-7 text-[40px]  ">
            Appoinments
          </h2>
          <div className="mb-10">
          <FilterAppoinment setFilter={setFilter} />

          </div>
          <AppoinmetsTable users={Bookingss} setUserChange={setBookingChange} />
        </div>
        <div>
          <Pagination
            totalPosts={filteredBookings.length}
            postPerPage={postPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
