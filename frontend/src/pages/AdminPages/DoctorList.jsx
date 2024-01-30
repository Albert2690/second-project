import React from "react";
import { useEffect, useState } from "react";
import DoctorTable from "../../components/Admin/DoctorTable";

import { useDoctorFetchMutation } from "../../slices/adminApislice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { UserTable } from "../../components/Admin/UserTable";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

function DoctorList() {
  const [postPerPage,setPostPerPage] = useState(5)
  const [currentPage,setCurrentPage] = useState(1)
  const [doctorschange, setDoctorsChange] = useState(false);
  console.log(doctorschange, "5544");
  const [statuschange, setstatuschange] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin);
  const [DoctorFetch, { isLoading }] = useDoctorFetchMutation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await DoctorFetch();

        if (responseUsers.data.success) {
          console.log(responseUsers.data.doctors, "herer");
          // const usersArray = responseUsers.data.doctors
          setDoctors(responseUsers.data.doctors);
        }
      } catch (error) {
        toast.error("Internal Server Error");
      }
    };
    fetchData();
    console.log(doctors, "docot");
  }, [doctorschange]);

  const handlefilter = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  let filteredDoctors = doctors.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const lastindex = currentPage * postPerPage

    const startIndex = lastindex-postPerPage

    const Doctors = filteredDoctors.slice(startIndex,lastindex)
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
         
          <h2 className="font-bold flex justify-center items-start text-textColor mb-7 text-[40px] ">
            Doctors List
          </h2>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <DoctorTable
              doctors={Doctors}
              setDoctorsChange={setDoctorsChange}
              doctorschange={doctorschange}
              setstatuschange={setstatuschange}
            />
          )}
        </div>
      </div>
      <div>
              <Pagination totalPosts={filteredDoctors.length}
              postPerPage={postPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              
              
              
              />
            </div>
    </section>
  );
}

export default DoctorList;
