import { useState, useEffect } from "react";
import ServicesCard from "../../components/Services/ServicesCard.jsx";
import { services } from "../../assets/data/services.js";
import { useGetServicesMutation } from "../../slices/adminApislice.js";
import { toast } from "react-toastify";

export default function ServicesList({ admin }) {
  const [list, setList] = useState(false);
  const [Services, setServices] = useState([]);
  const [userServices, setuserServices] = useState([]);
  const [loadService, { isloading }] = useGetServicesMutation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await loadService({ list });
        setServices(response.data.services);
        setuserServices(
          response.data.services.filter((item) => item.is_listed === true)
        );
      } catch (error) {
        console.log(error);
        toast.error("Server Error");
      }
    };
    fetchServices();
  }, [list]);

  console.log(list, "servicess");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-11 lg:mt-[55px] mt-[35px]">
      {admin
        ? Services.map((items, index) => (
            <ServicesCard
              items={items}
              admin={true}
              index={index}
              setList={setList}
            />
          ))
        : userServices.map((items, index) => (
            <ServicesCard items={items} index={index} />
          ))}
    </div>
  );
}
