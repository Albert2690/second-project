import { useEffect, useState } from "react";
import uploadImageCloudinary from "../../../utils/uploadCloudinary";
import DoctorDetials from "./DoctorDetials";
import userimg from "../../assets/images/doctor-img01.png";
import About from "../../components/Doctors/About";
import doctorimg from "../../assets/images/doctor-img02.png";
import staricon from "../../assets/images/Star.png";
import Feedback from "../../components/Doctors/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { FaMobile } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Experience from "../../components/Doctors/Experience";
import {
  useDoctorProfileMutation,
  useDoctorProfileUpdateMutation,
} from "../../slices/DoctorApislice";
import Timeslot from "../../components/Doctors/Timeslot";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { doctorInfo } = useSelector((state) => state.doctor);

  console.log(doctorInfo, "ifoo");

  const { doctorJwt } = doctorInfo.result;
  const [tab, setTab] = useState("overview");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [fee, setfee] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState();
  const [certificate, setCertificate] = useState();

  const [experience, setExperience] = useState([]);
  const [experiencee, setExperiencee] = useState([]);
  const [doctor, setDoctor] = useState("");

  const [profile, { isLoading }] = useDoctorProfileMutation();
  const [profileupdate, { isloading }] = useDoctorProfileUpdateMutation();

  console.log(doctor, "doctor");

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const data = await uploadImageCloudinary(file);

    setPhoto(data.url);
  };
  const handleCertificate = async (e) => {
    console.log("iiiiiiiiiii");
    try {
      const filee = e.target.files[0];
      console.log(filee, "iiiiiiiiiillllllllluuuuuu");
      const dataa = await uploadImageCloudinary(filee);
      console.log(dataa);
      console.log(dataa.url, "certificateeee");
      setCertificate(dataa.url);
    } catch (error) {
      console.log(error, "while uploading");
    }
  };

  console.log(certificate, "certificate");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await profileupdate({
        doctorJwt,
        doctor: doctor,
        certificate: certificate,
        image: photo,
      });
      if (result.data.success) {
        toast.success(result.data.message);
      } else {
        toast.error("server error");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    console.log(doctorInfo, "herrr");
    if (doctorInfo) {
      const getprofile = async () => {
        try {
          const response = await profile({ doctorJwt });

          setDoctor(response.data.doctor);
        } catch (error) {
          toast.error("Server Error");
        }
      };

      getprofile({ doctorJwt });
    }
  }, [doctorInfo]);

  //   console.log(doctor.name,'jjj')
  return (
    <>
      {doctorInfo ? (
        isLoading ? (
          <div className="flex justify-center ">
            <Loader />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] h-[500px] ">
              <div className="text-center mt-4 flex-row space-y-3 ">
                <button
                  onClick={() => setTab("overview")}
                  className={`  ${
                    tab === "overview" &&
                    "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                  } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setTab("profile-settings")}
                  className={`  ${
                    tab === "profile-settings" &&
                    "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                  } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
                >
                  Profile Settings
                </button>

                <button
                  onClick={() => setTab("timeslot")}
                  className={`  ${
                    tab === "timeslot" &&
                    "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                  } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
                >
                  Time Slots
                </button>
                {/* <button onClick={()=>setTab('time-management')} className={`  ${tab==='time-management' && 'bg-gradient-to-r from-blue-300 to-cyan-200 text-white'} py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}>Time Management</button> */}
              </div>
            </div>
            <div className="md:col-span-2 md:px[30px]">
              {tab === "overview" && (
                <section>
                  <div className="max-w-[1170px] px-5 mx-auto">
                    <div className="grid md:grid-cols-3 gap-[50px]">
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-5">
                          <figure className="max-w-[200px] max-h-[200px]">
                            <img src={doctorimg} alt="" />
                          </figure>

                          <div className="">
                            <span className="bg-gradient-to-r from-blue-300 to-cyan-200 py-1 px-6 lg:py-2 lg:px-7  text-[12px] leading-4 lg:text-[16px]  lg:leading-7 font-semibold rounded">
                              surgeon
                            </span>
                            <h2 className=" text-headingColor font-semibold mt-4 leading-7">
                              Dr.{doctor.name}
                            </h2>
                            <div className="flex items-center gap-1 md:gap-3">
                              <span className="w-4 h-4 leading-5 ">
                                <img src={staricon} alt="" />
                              </span>
                              <span className="text-sm md:text-[14px] font-semibold text-headingColor">
                                4.2
                              </span>
                              <span className="text-sm md:text-[14px] text-headingColor">
                                (256)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="border-b mt-5 border-solid  flex ">
                          <button
                            onClick={() => setTab("about")}
                            className={` ${
                              tab === "about" &&
                              "border-b border-black border-7 "
                            }py-2 px-5 mr-7  text-textColor font-[400]`}
                          >
                            About
                          </button>
                        </div>
                        <About doctor={doctor} />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {tab === "profile-settings" && (
                <section className="px-5 mt-[-200px] md:mt-0  md:py-0 lg:px-0">
                  <div className="w-full  mx-auto rounded-lg   ">
                    <form onSubmit={handleSubmit} className="  md:py-0">
                      <div className=" relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your Full Name"
                          value={doctor.name}
                          onChange={(e) =>
                            setDoctor((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-[80%] md:w-[60%]  ml-9  px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md  cursor-pointer"
                        />
                      </div>

                      <div className="py-5 relative">
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter Your Email"
                          value={doctor.email}
                          onChange={(e) =>
                            setDoctor(prev)({ ...prev, email: e.target.value })
                          }
                          className="w-[80%] md:w-[60%]  ml-9 px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                          required
                        />
                      </div>

                      <div className="py-5 relative">
                        <input
                          type="text"
                          name="blood-group"
                          placeholder="Enter Your Bio"
                          value={doctor.bio}
                          onChange={(e) =>
                            setDoctor((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          className="w-[80%] md:w-[60%]  ml-9  px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                        />
                      </div>

                      <div className="py-5 relative">
                        <input
                          type="text"
                          name="age"
                          placeholder="Enter Your age"
                          value={doctor.age}
                          onChange={(e) =>
                            setDoctor((prev) => ({
                              ...prev,
                              age: Number(e.target.value),
                            }))
                          }
                          className="w-full overflow-scroll- md:w-[60%] ml-9  px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                        />
                      </div>
                      <div className="py-5 relative">
                        <label htmlFor="Mobile">
                          <input
                            type="text"
                            name="mobile"
                            placeholder="Enter Your mobile"
                            value={doctor.mobile}
                            onChange={(e) =>
                              setDoctor((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-[80%] md:w-[60%]  ml-9 px-3  py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] font-bold text-headingColor placeholder:text-textColor  placeholder:text-sm rounded-md cursor-pointer"
                          />
                        </label>
                      </div>

                      <div className="py-2 px-5  space-y-7 ">
                        <div className="py-5  ml- ">
                          <label className="" htmlFor="Mobile"></label>

                          <select
                            name=""
                            id=""
                            onChange={(e) =>
                              setDoctor((prev) => ({
                                ...prev,
                                specialization: e.target.value,
                              }))
                            }
                            value={doctor.specialization}
                            className=' className="w-[80%] md:w-[30%]   px-3  py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer   "
           '
                          >
                            <option
                              className="text-[12px] font-bold text-headingColor"
                              value=""
                            >
                              Specialisation
                            </option>

                            <option
                              className="text-[12px] font-bold text-headingColor"
                              value="Neurology"
                            >
                              Neurology
                            </option>
                            <option
                              className="text-[12px] font-bold text-headingColor"
                              value="Orthology"
                            >
                              Orthology
                            </option>
                            <option
                              className="text-[12px] font-bold text-headingColor"
                              value="Pediatrics"
                            >
                              Pediatrics
                            </option>

                            <option
                              className="text-[12px] font-bold text-headingColor"
                              value="Surgeon"
                            >
                              Surgeon
                            </option>
                          </select>

                          <input
                            type="text"
                            name="fee"
                            placeholder="Fee"
                            value={doctor.fee}
                            onChange={(e) =>
                              setDoctor((prev) => ({
                                ...prev,
                                fee: Number(e.target.value),
                              }))
                            }
                            className="w-[80%] md:w-[30%]  md:ml-9 px-3  py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] sm:mt-16 md:mt-0 font-bold text-headingColor  focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center  ">
                          <label className="text-textColor md:text-md text-start  text-sm ">
                            Select Gender
                          </label>
                          <div className="flex ml-2">
                            <input
                              type="radio"
                              id="male"
                              value={doctor.gender}
                              onChange={() =>
                                setDoctor((prev) => ({
                                  ...prev,
                                  gender: "male",
                                }))
                              }
                              className="focus:outline-none text-textColor md:text-md text-sm mr-2"
                            />
                            <label
                              htmlFor="male"
                              className="text-black font-semibold md:text-md text-sm mr-4"
                            >
                              Male
                            </label>

                            <input
                              type="radio"
                              id="female"
                              value={doctor.gender}
                              onChange={() =>
                                setDoctor((prev) => ({
                                  ...prev,
                                  gender: "female",
                                }))
                              }
                              name="gender"
                              className="focus:outline-none text-textColor md:text-md text-sm mr-2"
                            />
                            <label
                              htmlFor="female"
                              className="text-black font-semibold md:text-md text-sm"
                            >
                              Female
                            </label>
                          </div>
                        </div>

                        <div className="mt-10">
                          <div className="mt-11">
                            <h3 className="text-[20px] md:text-[26px] leading-[30px] text-headingColor font-semibold">
                              Education
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                              {doctor.qualification.map((data, index) => (
                                <li
                                  key={index}
                                  className="p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100"
                                >
                                  <div className="flex flex-col gap-3">
                                    <span className="text-primaryColor leading-6 font-semibold">
                                      24-12-2010 - 21-7-2013
                                    </span>
                                    <p className="text-sm leadiing-6 font-medium ">
                                      {data.Degree}
                                    </p>
                                    <p className="text-sm leading-6 font-medium ">
                                      New Appolo Hostpital,New York{" "}
                                    </p>
                                  </div>
                                </li>
                              ))}
                              <div className="mt-10">
                                <Experience
                                  data={"Education"}
                                  doctor={doctor}
                                  setDoctor={setDoctor}
                                  jobexperience={false}
                                />
                              </div>

                            </ul>
                          </div>

                          <div className="mt-11">
                            <h3 className="text-[20px] md:text-[26px] leading-[30px] text-headingColor font-semibold">
                              Experience
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                              {doctor.experience.length > 0 &&
                                doctor.experience.map((data) => (
                                  <li className="p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100">
                                    <div className="flex flex-col gap-3">
                                      <span className="text-primaryColor leading-6 font-semibold">
                                        24-12-2010 - 21-7-2013
                                      </span>
                                      <p className="text-sm leadiing-6 font-medium ">
                                        {data.position}
                                      </p>
                                      <p className="text-sm leading-6 font-medium ">
                                        New Appolo Hostpital,New York{" "}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-10">
                            <Experience
                              data={"Experience"}
                              doctor={doctor}
                              setDoctor={setDoctor}
                              jobexperience={true}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row gap-4 md:gap-20">
                          <div className="relative w-[130px] mt-10 h-[50px]">
                            <input
                              type="file"
                              name="photo"
                              id="customFile"
                              onChange={handleImage}
                              accept=".jpg, .png"
                              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <label
                              htmlFor="customFile"
                              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                            >
                              Upload Image
                            </label>
                          </div>
                          <div className="relative w-[160px] mt-10 h-[50px]">
                            <input
                              type="file"
                              name="photoo"
                              id="customFilee"
                              onChange={handleCertificate}
                              accept=".jpg, .png"
                              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <label
                              htmlFor="customFilee"
                              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                            >
                              Upload Certificate
                            </label>
                          </div>
                        </div>

                        {/* {isLoading&&<Loader/>} */}

                        <div className="py-5 mt-5 relative">
                          <label
                            className="font-semibold text-[14px] absolute top-0   left-4"
                            htmlFor="Mobile"
                          >
                            About
                          </label>
                          <textarea
                            className="border px-3 w-[80%] py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] sm:mt-16 md:mt-0 font-bold text-headingColor  focus:placeholder:transform focus:placeholder:translate-y-[-10px] focus:placeholder:text-[10px] placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                            name=""
                            id=""
                            cols="50"
                            value={doctor.about}
                            placeholder=""
                            onChange={(e) =>
                              setDoctor((prev) => ({
                                ...prev,
                                about: e.target.value,
                              }))
                            }
                            rows="5"
                          ></textarea>
      
                        </div>

                        <div className="flex justify-start my-4">
                          <button className="btn " type="submit">
                            Update
                          </button>
                        </div>
                      </div>
                   
                    </form>
                  </div>
                  <ToastContainer style={{ zIndex: 999 }} />
                </section>
              )}
              {tab === "timeslot" && <Timeslot />}
            </div>
          </div>
        )
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] h-[500px] ">
            <div className="text-center mt-4 flex-row space-y-3 ">
              <button
                onClick={() => setTab("overview")}
                className={`  ${
                  tab === "overview" &&
                  "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
              >
                Overview
              </button>
              <button
                onClick={() => setTab("profile-settings")}
                className={`  ${
                  tab === "profile-settings" &&
                  "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
              >
                Profile Settings
              </button>

              <button
                onClick={() => setTab("timeslot")}
                className={`  ${
                  tab === "timeslot" &&
                  "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
              >
                Time Slots
              </button>
              <button
                onClick={() => setTab("time-management")}
                className={`  ${
                  tab === "time-management" &&
                  "bg-gradient-to-r from-blue-300 to-cyan-200 text-white"
                } py-3  px-5 w-full rounded-md text-headingColor font-semibold border border-solid bg-gray-100 text-[20px]`}
              >
                Time Management
              </button>
            </div>
          </div>
          <div className="md:col-span-2 md:px[30px]">
            {tab === "overview" && (
              <section>
                <div className="max-w-[1170px] px-5 mx-auto">
                  <div className="grid md:grid-cols-3 gap-[50px]">
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-5">
                        <figure className="max-w-[200px] max-h-[200px]">
                          <img src={doctorimg} alt="" />
                        </figure>

                        <div className="">
                          <span className="bg-gradient-to-r from-blue-300 to-cyan-200 py-1 px-6 lg:py-2 lg:px-7  text-[12px] leading-4 lg:text-[16px]  lg:leading-7 font-semibold rounded">
                            surgeon
                          </span>
                          <h2 className=" text-headingColor font-semibold mt-4 leading-7">
                            Dr.{doctor.name}
                          </h2>
                          <div className="flex items-center gap-1 md:gap-3">
                            <span className="w-4 h-4 leading-5 ">
                              <img src={staricon} alt="" />
                            </span>
                            <span className="text-sm md:text-[14px] font-semibold text-headingColor">
                              4.2
                            </span>
                            <span className="text-sm md:text-[14px] text-headingColor">
                              (256)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-b mt-5 border-solid  flex ">
                        <button
                          onClick={() => setTab("about")}
                          className={` ${
                            tab === "about" && "border-b border-black border-7 "
                          }py-2 px-5 mr-7  text-textColor font-[400]`}
                        >
                          About
                        </button>
                      </div>
                      <About doctor={doctor} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {tab === "profile-settings" && (
              <section className="px-5 mt-[-200px] md:mt-0  md:py-0 lg:px-0">
                <div className="w-full  mx-auto rounded-lg   ">
                  <form onSubmit={handleSubmit} className="  md:py-0">
                    <div className=" relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[80%] md:w-[60%]  ml-9  px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md  cursor-pointer"
                      />
                    </div>

                    <div className="py-5 relative">
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[80%] md:w-[60%]  ml-9 px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                        required
                      />
                    </div>

                    <div className="py-5 relative">
                      <input
                        type="text"
                        name="blood-group"
                        placeholder="Enter Your Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-[80%] md:w-[60%]  ml-9  px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                      />
                    </div>

                    <div className="py-5 relative">
                      <input
                        type="text"
                        name="age"
                        placeholder="Enter Your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full overflow-scroll- md:w-[60%] ml-9  px-3 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                      />
                    </div>
                    <div className="py-5 relative">
                      <label htmlFor="Mobile">
                        <input
                          type="text"
                          name="mobile"
                          placeholder="Enter Your mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-[80%] md:w-[60%]  ml-9 px-3  py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor  placeholder:text-sm rounded-md cursor-pointer"
                        />
                      </label>
                    </div>

                    <div className="py-2 px-5  space-y-7 ">
                      <div className="py-5   ">
                        <select
                          name=""
                          id=""
                          onChange={(e) => setSpecialisation(e.target.value)}
                          value={specialisation}
                          className=' className="w-[80%] md:w-[30%]   px-3  py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer   "
           '
                        >
                          <option
                            className="text-[12px] font-bold text-headingColor"
                            value=""
                          >
                            Specialisation
                          </option>

                          <option
                            className="text-[12px] font-bold text-headingColor"
                            value="Neurology"
                          >
                            Neurology
                          </option>
                          <option
                            className="text-[12px] font-bold text-headingColor"
                            value="Orthology"
                          >
                            Orthology
                          </option>
                          <option
                            className="text-[12px] font-bold text-headingColor"
                            value="Pediatrics"
                          >
                            Pediatrics
                          </option>

                          <option
                            className="text-[12px] font-bold text-headingColor"
                            value="Surgeon"
                          >
                            Surgeon
                          </option>
                        </select>
                      </div>
                      <div className="py-5 relative">
                        <input
                          type="text"
                          name="fee"
                          placeholder="Fee"
                          value={fee}
                          onChange={(e) => setfee(e.target.value)}
                          className="w-[80%] md:w-[30%]  sm:mt-2 mt-0 px-3  py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none
            focus:border-primaryColor text-[12px] font-bold text-headingColor placeholder:text-textColor placeholder:text-sm rounded-md cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center  ">
                      <label className="text-textColor md:text-md text-start  text-sm ">
                        Select Gender
                      </label>
                      <div className="flex ml-2">
                        <input
                          type="radio"
                          id="male"
                          value={gender}
                          onChange={() => setGender("male")}
                          name="gender"
                          className="focus:outline-none text-textColor md:text-md text-sm mr-2"
                        />
                        <label
                          htmlFor="male"
                          className="text-black font-semibold md:text-md text-sm mr-4"
                        >
                          Male
                        </label>

                        <input
                          type="radio"
                          id="female"
                          value={gender}
                          onChange={() => setGender("female")}
                          name="gender"
                          className="focus:outline-none text-textColor md:text-md text-sm mr-2"
                        />
                        <label
                          htmlFor="female"
                          className="text-black font-semibold md:text-md text-sm"
                        >
                          Female
                        </label>
                      </div>
                    </div>

                    <div className="mt-10">
                      <div className="mt-11">
                        <h3 className="text-[20px] md:text-[26px] leading-[30px] text-headingColor font-semibold">
                          Education
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                          {experience.map((data) => (
                            <li className="p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100">
                              <div className="flex flex-col gap-3">
                                <span className="text-primaryColor leading-6 font-semibold">
                                  24-12-2010 - 21-7-2013
                                </span>
                                <p className="text-sm leadiing-6 font-medium ">
                                  {data.Degree}
                                </p>
                                <p className="text-sm leading-6 font-medium ">
                                  New Appolo Hostpital,New York{" "}
                                </p>
                              </div>
                            </li>
                          ))}
                          <div className="mt-10">
                            <Experience
                              data={"Experience"}
                              doctor={doctor}
                              setDoctor={setDoctor}
                            />
                          </div>

                          <li className="p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100">
                            <div className="flex flex-col gap-3">
                              <span className="text-primaryColor leading-6 font-semibold">
                                24-12-2010 - 21-7-2013
                              </span>
                              <p className="text-sm leadiing-6 font-medium ">
                                PHD in surgeon
                              </p>
                              <p className="text-sm leading-6 font-medium ">
                                New Appolo Hostpital,New York{" "}
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-11">
                        <h3 className="text-[20px] md:text-[26px] leading-[30px] text-headingColor font-semibold">
                          Experience
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                          {experiencee.length > 0 &&
                            experiencee.map((data) => (
                              <li className="p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100">
                                <div className="flex flex-col gap-3">
                                  <span className="text-primaryColor leading-6 font-semibold">
                                    24-12-2010 - 21-7-2013
                                  </span>
                                  <p className="text-sm leadiing-6 font-medium ">
                                    {data.position}
                                  </p>
                                  <p className="text-sm leading-6 font-medium ">
                                    New Appolo Hostpital,New York{" "}
                                  </p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="mt-10">
                        <Experience
                          data={"Experience"}
                          experiencee={experiencee}
                          setExperiencee={setExperiencee}
                          setExperience={setExperience}
                          experience={experience}
                          jobexperience={true}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 md:gap-20">
                      <div className="relative w-[130px] mt-10 h-[50px]">
                        <input
                          type="file"
                          name="phot"
                          id="customFil"
                          onChange={handleFileInputChange}
                          accept=".jpg, .png"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                          htmlFor="customFile"
                          className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                        >
                          Upload Image
                        </label>
                      </div>
                      <div className="relative w-[160px] mt-10 h-[50px]">
                        <input
                          type="file"
                          name="pho"
                          id="customFi"
                          onChange={handleFileInputChange}
                          accept=".jpg, .png"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                          htmlFor="customFi"
                          className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                        >
                          Upload Certificate
                        </label>
                      </div>
                    </div>

                    {/* {isLoading&&<Loader/>} */}

                    <div className="flex justify-start">
                      {/* {isLoading?<Loader/>: */}
                      <button className="btn " type="submit">
                        Update
                      </button>
                    </div>

                    {/* <div className="flex justify-center mt-5 ">
          <span>Don't have an Account ?</span>{" "}
          <Link to={"/register"}>
            <span className="text-primaryColor">Sign up</span>
          </Link>
        </div> */}
                  </form>
                </div>
                <ToastContainer style={{ zIndex: 999 }} />
              </section>
            )}
          </div>
        </div>
      )}
    </>
  );
}
