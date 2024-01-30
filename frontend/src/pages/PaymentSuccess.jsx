import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useBookingMutation,usePaymentDetialsMutation } from '../slices/userApislice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function PaymentSuccess() {
const [booking,{isLoading}] = useBookingMutation()
const [paymentDetials,{isloading}]= usePaymentDetialsMutation()

const { userInfo } = useSelector((state) => state.auth);

const { userJwt } = userInfo.result;
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get("session_id");
        const fetch = async () => {
          try {

            const result = await paymentDetials({sessionId,userJwt})


            const bookingDetials = await JSON.parse(localStorage.getItem('bookingDetials'))
            const response = await booking({bookingDetials,userJwt,paymentId:sessionId });
            
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
            <Link to={'/'} >
            
            <span class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-semibold py-3">
                  GO BACK 
             </span>
            </Link>
             
          </div>
      </div>

</div>
    </section>

  )
}

export default PaymentSuccess