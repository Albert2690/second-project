import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useGetBookingDetialsMutation } from '../../slices/adminApislice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaymentDetial from '../../components/Admin/PaymentDetial';
import PaymentDetial1 from '../../components/Admin/paymentDetial1';

function PaymentSuccessAdmin() {
const [booking,{isLoading}] = useGetBookingDetialsMutation()

const [result,setResult] = useState(null)
const [doctor,setDoctor] = useState(null)
console.log(doctor,'@result')
console.log(result,'@result')
// if(result.timeSlot){
//     console.log(result.timeSlot.date,'@result')

// }


    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get("session_id");
        const fetch = async () => {
          try {



            const bookingDetials = await JSON.parse(localStorage.getItem('Booking'))
            const response = await booking({bookingDetials,paymentId:sessionId });
            console.log(response,'@success')
            if(response.data.booking._id){
              console.log(response.data.doctor,"@success")
              console.log(response.data.doctor,'@success')

                setDoctor(response.data.doctor)
                setResult(response.data.booking)

            }
            
          } catch (error) {
            console.log(error)
            toast.error("Server Error");
          }
        };
        fetch();
      
      }, []);
  return (

    <section className='flex items-center justify-center' >
   
    <div className="bg-white p-6  md:mx-auto">
      <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
          </path>
      </svg>
      <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
          <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Have a great day!  </p>
          <div class="py-10 text-center">
           
            
            {/* <span class="px-12  text-white rounded-md font-semibold py-3">

              {result && doctor &&  <PaymentDetial1 booking={result} doctor={doctor} />}  
             </span> */}

          <Link to={'/admin'} >
            <button
              
              className="py-2 px-2 bg-primaryColor text-white min-w-[80px] font-semibold rounded-md"
            >
              Go Back
            </button>
          </Link>
             
          </div>
      </div>

</div>
    </section>

  )
}

export default PaymentSuccessAdmin