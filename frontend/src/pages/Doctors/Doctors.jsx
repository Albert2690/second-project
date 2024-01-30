import {useEffect,useState} from 'react'
import DocotrList from '../../components/DocotrList'
import { useGetDoctorsMutation } from '../../slices/userApislice'
import { toast } from 'react-toastify'
import SortAndFilter from '../../components/SortandFilter'
import Pagination from '../../components/Pagination'
function Doctors() {

  const [postPerPage,setPostPerPage] = useState(5)
  const [currentPage,setCurrentPage] = useState(1)
  const [doctors,setDoctors] =useState([])
  const [doctorsFetch,{isLoading}] = useGetDoctorsMutation()
  const [search,setSearch]= useState('')
  const [filter,setFilter]= useState('')
  const [sortted,setSortted]= useState('')


  useEffect(()=>{
    const fetch = async()=>{
      try{
       const response = await  doctorsFetch()
       setDoctors(response.data.doctors)

      }catch(error){
        toast.error("Error occured while fetching doctors")
      }
    }
    fetch()

  },[doctorsFetch])
  const handlefilter =  (e)=>{
    setSearch(e.target.value)
  }
 


    let filteredDoctors = doctors.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase())||user.specialization.toLowerCase().includes(search.toLowerCase()))
    if(sortted !=='' ){
    filteredDoctors = filteredDoctors.sort((a,b)=>a.fee-b.fee)
    }
    if(filter!==''){
      filteredDoctors = filteredDoctors.filter((item)=>item.specialization === filter)

    }
    const lastindex = currentPage * postPerPage

    const startIndex = lastindex-postPerPage

    const Doctorss= filteredDoctors.slice(startIndex,lastindex)
   
 
  return (
    <section className='py-4'>
      <div className='container'>
        <div className='flex md:mt-10 justify-center'>
          <form action="" className=''>
            
            <input  type="search" onChange={(e)=>handlefilter(e)}  placeholder='Search ' className='border rounded-full text-sm text-center w-[200px] md:w-[400px] h-[45px] border-textColor focus:border-blue-400'/>
  
            
          </form>
        </div>
        <SortAndFilter  setSortted={setSortted} setFilter={setFilter} />
        <DocotrList doctors={Doctorss} isLoading={isLoading} />       
         </div>
         <div>
         <div>
          <Pagination
            totalPosts={filteredDoctors.length}
            postPerPage={postPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
         </div>
    </section>
  )
}

export default Doctors