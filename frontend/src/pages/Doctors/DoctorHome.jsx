import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import heroimg1 from '../../assets/images/hero-img01.png'
import heroimg2 from '../../assets/images/hero-img02.png'
import heroimg3 from '../../assets/images/hero-img03.png'
import icon1 from '../../assets/images/icon01.png'
import icon2 from '../../assets/images/icon03.png'
import About from '../About.jsx'
import ServicesList from '../../components/Services/ServicesList.jsx'
import { useSelector } from 'react-redux'

import {Link} from 'react-router-dom'
import { CiCircleChevRight } from "react-icons/ci";

export default function DoctorHome() {
  const{userInfo} = useSelector((state)=>state.auth)
  
  const navigate = useNavigate()
 useEffect(()=>{
 if(userInfo && userInfo.result === null){
 navigate('/')
 }
 })

  return (
    <>
    
    {/* Hero Section */}
 
    <section className='hero_section pt-[60px] 2xl:h-[800px]'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
        {/*  hero content */}
        <div>
          <div className='lg:w-[578px]'>
            <h1 className='text-[36px] leading-[46px] text-headingColor font-bold md:text-5xl md:leading-[70px]  md:font-900'>
              We help patients live a healthy,longer life.
              </h1>
              <p className='text_para'>Contrary to popular belief,
                 Lorem Ipsum is not simply random text.
                  It has roots in a piece of classical Latin literature
                   from 45 BC, making it over 2000 years old. Richard McClintock, 
                   a Latin professor at Hampden-Sydney College in Virginia,
                    looked up one of the more obscure Latin words, consectetur,
                     from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                      discovered the undoubtable source.</p>
                      {/* <button className='btn  bg-gradient-to-r from-blue-300 to-cyan-200 hover:text-black '>Request an appoinment</button> */}
          </div>
          {/* heroo Counter */}
          <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-7'>

            <div className='flex flex-col gap-1'>
              <h2 className='text-[30px] pl-3 leading-[56px] lg:text-[30px] lg:leading-[54px] lg; font-[500] font-700 text-headingColor'>20+</h2>
              <span className='w-[80px] h-2 bg-yellow-400 rounded-full block '></span>
              <span className='text_para '>years of Experience</span>
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='text-[30px] pl-3 leading-[56px] lg:text-[30px] lg:leading-[54px] lg; font-[500] font-700 text-headingColor'>25+</h2>
              <span className='w-[80px] h-2 bg-yellow-400 rounded-full block '></span>
              <span className='text_para '>Clinic Location</span>
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='text-[30px] pl-3 leading-[56px] lg:text-[30px] lg:leading-[54px] lg; font-[500] font-700 text-headingColor'>100%</h2>
              <span className='w-[80px] h-2 bg-yellow-400 rounded-full block '></span>
              <span className='text_para'>Patient Satisfaction</span>
            </div>


          </div>
        </div>
        {/* heroo content */}
        <div className='flex gap-[30px] justify-end'>
          <div>
            <img className='w-full mt-4'  src={heroimg1} alt="" />
          </div>
          <div className='flex flex-col gap-4'>
            <img src={heroimg2} alt="" />
            <img src={heroimg3} alt="" />

          </div>

        </div>
        
        </div>

      </div>

    </section>

    {/* hero section end */}
    {/* <section >
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center font-[500]'>Providing the best

           medical services</h2>
          <p className='text_para text-center mt-7'>World class care for everyone.Our health
             system system offers unmatched,expert health care
             </p>
        </div>
           
        <div className='grid grid-cols-1 md:grid-cols-2  lg:gap-7 mt-[40px] lg:mt[55px]' >
          <div className='py-[30px] px-5'>
            <div className='flex itmes-center justify-center'>
            <img src={icon1} alt="" />
            </div>
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-7 text-textColor font-[700] text-center ' >Find a Doctor</h2>
              <p className='text_para text-center'>World class care for everyone.Our health
             system system offers unmatched,expert health care
             </p>
             <Link to='/login' className='w-8 h-8 mt-7 hover:bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full mx-auto my-auto flex   border-black  justify-center  hover:border-none ring-1 ring-black hover:ring-0'>
             <CiCircleChevRight className='hover:text-white w-8 h-8'  />
             </Link>
            </div>
          
          </div>
          
          <div className='py-[30px] px-5'>
            <div className='flex itmes-center justify-center'>
            <img src={icon2} alt="" />
            </div>
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-7 text-textColor font-[700] text-center ' >Find a Doctor</h2>
              <p className='text_para  text-center'>Secure Your Appoinment with us for seamless Healthcare Journey
             </p>
             <Link to='/login' className='w-8 h-8  hover:bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full mx-auto my-auto flex border  border-black  justify-center  hover:border-none mt-[55px]'>
             <CiCircleChevRight className='hover:text-white w-8 h-8'  />
             </Link>
            </div>
          
          </div>
         
        </div>
      </div>

    </section> */}
    {/* About Section here */}

    <About/>
    {/* About end */}

    {/* Service Section Start */}

    {/* <section>
      <div className='container'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'> Our Medical Services</h2>
          <p className='text_para text-center'>World class care for everyone.Our health
             system system offers unmatched,expert health care
             </p>
        </div>
        <ServicesList/>
      </div>
    </section> */}
    {/* Service Section End */}

    </>
  )
}
