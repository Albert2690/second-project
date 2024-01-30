import { Card, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useDoctorBlockMutation,
  useUsersFetchMutation,
} from "../../slices/adminApislice";
import {
  useDoctorFetchMutation,
  useDoctorApproveMutation,
} from "../../slices/adminApislice";
import Pagination from "../Pagination";

const TABLE_HEAD = ["Name", "Email", "Status", "Mobile", "Detials", "Actions"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export default function DoctorTable({
  doctors,
  setDoctorsChange,
  DoctorsChage,
  setstatuschange,
}) {
  // const [doctors,setUserss] = useState([])

  // const location = useLocation()

  const [userBlock, { isLoading }] = useDoctorBlockMutation();
  const [getUsers, { isLoadingg }] = useUsersFetchMutation();
  const [approve, { isLoadin }] = useDoctorApproveMutation();

  const approveDoctor = async (e, userId) => {
    e.preventDefault();
    console.log("hiii");
    try {
      console.log(userId, "heeeeee");
      await approve({ userId });
      setDoctorsChange((prevstate) => !prevstate);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const blockuser = async (userId) => {
    try {
      console.log("helloooooooo");
      console.log(userId, "userid");
      const resultt = await userBlock({ userId });

      setDoctorsChange((prevUserChange) => !prevUserChange);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  ">
      <Card className=" overflow-scroll">
        <table className=" min-w-max text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-cyan-300 p-5 "
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 items-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <div className="my-2"></div>
          <tbody>
            {doctors.map((user) => (
              <tr key={user._id} className="odd:bg-gray-200">
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.email}
                  </Typography>
                </td>
                <td className="">
                  {user.status === "pending" && (
                    <Typography
                      variant="small"
                      className="font-normal text-red-500"
                    >
                      {user.status}
                    </Typography>
                  )}
                  {user.status === "Approved" && (
                    <Typography
                      variant="small"
                      className="font-normal text-green-500"
                    >
                      {user.status}
                    </Typography>
                  )}
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.mobile}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Info
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center items-center">
                    {user.is_blocked === 0 ? (
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            blockuser(user._id);
                          }}
                          className="bg-red-500 px-1 py-1 rounded text-white"
                        >
                          Block
                        </button>
                      </Typography>
                    ) : (
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            blockuser(user._id);
                          }}
                          className="bg-primaryColor px-1 py-1 rounded text-white"
                        >
                          Unblock
                        </button>
                      </Typography>
                    )}

                    {user.status === "pending" && (
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={(e) => approveDoctor(e, user._id)}
                          className="bg-primaryColor px-1 py-1 rounded text-white"
                        >
                          Approve
                        </button>
                      </Typography>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
