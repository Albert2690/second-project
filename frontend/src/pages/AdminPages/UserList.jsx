import React from 'react'
import { useEffect,useState } from 'react'
import { useUserBlockMutation,useUsersFetchMutation } from '../../slices/adminApislice'
import Pagination from '../../components/Pagination.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserTable } from '../../components/Admin/UserTable'

function UserList() {
  const [postPerPage,setPostPerPage] = useState(5)
  const [currentPage,setCurrentPage] = useState(1)
  const [userchange,setUserChange] = useState(false)
  const [users,setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const adminInfo = useSelector((state)=>state.admin)
  const [userFetch,{isLoading}] = useUsersFetchMutation()
  const [search,setSearch]= useState('')

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const responseUsers = await userFetch()
        
        if(responseUsers.data.success){
        
          // const usersArray = responseUsers.data.users
          setUsers(responseUsers.data.users)
         
        }
        
  
      }catch(error){
        toast.error("Internal Server Error")
      }
    }
    fetchData();
    console.log(users) 
   
  },[userchange])

  const handlefilter =  (e)=>{
    console.log(e.target.value)
    setSearch(e.target.value)
  }
  
  const lastindex = currentPage * postPerPage

    const startIndex = lastindex-postPerPage

    let filteredUsers = users.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase())||user.email.toLowerCase().includes(search.toLowerCase()))
    const Users = filteredUsers.slice(startIndex,lastindex)
  console.log(filteredUsers,'hii')
  return (
    <section>
        <div className="md:container px-2">
            <div className='flex-col '>
              <form action=""className='w-full flex justify-center mb-7' >
              <input  type="text" onChange={(e)=>handlefilter(e)} placeholder='Search by name or email... ' className='border   rounded-full text-sm text-center w-[200px] md:w-[400px] h-[45px] border-textColor focus:border-blue-400'/>

              </form>
                <h2 className="font-bold flex justify-center items-start text-textColor mb-7 text-[40px]  ">Users List</h2>
              <UserTable users={Users} setUserChange={setUserChange} userchange={userchange} />
              
               
            </div>
            <div>
              <Pagination totalPosts={filteredUsers.length}
              postPerPage={postPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              
              
              
              />
            </div>
        </div>
    </section>
  )
}

export default UserList