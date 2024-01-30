import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import {AiFillYoutube,AiFillGithub,AiOutlineInstagram} from 'react-icons/ai'

const socialLinks = [
  {
    path:'#',
    icon:<AiFillGithub className='group-hover:text-white w-4 h-5' />
  },
  {
    path:'#',
    icon:<AiOutlineInstagram className='group-hover:text-white w-4 h-5' />
  }
  
]

const quickLinks = [
  {
    path: '/',
    display:"Home"
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/services',
    display:"Services"
  }
]

const quickLinks1 =[
{
  path:'/doctors',
  display:"Book An Appoinment"
},
{
  path:'/doctors',
  display:"Find A Doctor"
},
]
const contact =[
{
  path:'/contact',
  display:"Contact-Us"
}
]


function Afooter() {

  const year = new Date().getFullYear()
  return (

    <footer className='bg-gradient-to-r  from-blue-300 to-cyan-200 text-textColor py-10'>
      <div className='container'>
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-5">
          <div>
            <img src={logo} alt="" />
            <p className='text-[12px] text-textColor leading-5'>Copyright @ {year} developed by Albert Sebastian all right are reserved</p>
            <div className='flex items-center gap-3 mt-2'>
              {socialLinks.map((elem,index)=>{
                return(
                  <Link className=' group hover:bg-primaryColor rounded-full p-[3px]' key={index}
                   to={elem.path}>{elem.icon}</Link>
                )
              })}
                
            </div>
          </div>
           <div>
            <h2 className="text-md font-bold hover:underline text-black ">Quick Links</h2>
            <ul className='mt-4'>
              {quickLinks.map((link,index)=>{
                
                return  (
                  
                <Link className='mb-5 font-[400] hover:text-primaryColor' to={link.path} key={index}><li>{link.display}</li> </Link>
                )
                
              })}
            </ul>
           </div>
           <div>

            <h2 className="text-md font-bold hover:underline text-black">Bookings</h2>
            <ul className='mt-4'>
              {quickLinks1.map((link,index)=>{
                
                return  (
                  
                <Link className='mb-5 font-[400] hover:text-primaryColor' to={link.path} key={index}><li>{link.display}</li> </Link>
                )
                
              })}
            </ul>
           </div>
           <div>
            
            <h2 className="text-md font-bold hover:underline text-black">Contact-Us</h2>

            <ul className='mt-4'>

              {contact.map((link,index)=>{
                
                return  (
                  
                <Link className='mb-5 hover:text-primaryColor font-[400]' to={link.path} key={index}><li>{link.display}</li> </Link>
                )
                
              })}
            </ul>
           </div>
        </div>
      </div>
    </footer>
  )
}

export default Afooter