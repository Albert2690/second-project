import React from 'react'
import formatdate from '../../utils/formatedata.js'


function About(doctor) {
    
  return (
   <div className="">
    <div>
        
        <h3 className="flex items-center mt-7">About of
        <span className=' ml-3 text-primaryColor leading-5'>Dr. {doctor.doctor.name}</span>
        
        
        </h3>
        <p className="text_para">
        {doctor.doctor.about}
        </p>
    </div>
    <div className="mt-11">
    <h3 className='text-[20px] md:text-[26px] leading-[30px] text-headingColor font-semibold'>Education</h3>
    <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
    <li className='p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100'>
                <div className='flex flex-col gap-3'>

                <span className="text-primaryColor leading-6 font-semibold">24-12-2010 - 21-7-2013</span>
            <p className="text-sm leadiing-6 font-medium ">PHD in surgeon</p>
            <p className="text-sm leading-6 font-medium ">New Appolo Hostpital,New York </p>

                </div>
           
        </li>
        <li className='p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100'>
            <div className='flex flex-col gap-3' >
                <span className='text-primaryColor leading-6 font-semibold'>12 Nov 2008</span>
                <p className="text-textColor mt-3 leading-5">PHD in Surgeon</p>
            </div>
            <p className="text-textColor mt-3 leading-5">Father Mullers Hospital, Manglore</p>
            

        </li>
    </ul>
    </div>
    <div className="mt-11">
    <h3 className='text-[20px] md:text-[26px] leading-[30px] text-headingColor font-semibold'>Experience</h3>
    <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
    <li className='p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100'>
                <div className='flex flex-col gap-3'>

                <span className="text-primaryColor leading-6 font-semibold">24-12-2010 - 21-7-2013</span>
            <p className="text-sm leadiing-6 font-medium ">Sr.Surgeon</p>
            <p className="text-sm leading-6 font-medium ">New Appolo Hostpital,New York </p>

                </div>
           
        </li>
        <li className='p-6 rounded-md hover:shadow-lg hover:transform hover:scale-110 hover:transition-transform hover:duration-500 bg-gray-100'>
                <div className='flex flex-col gap-3'>

                <span className="text-primaryColor leading-6 font-semibold">24-12-2010 - 21-7-2013</span>
            <p className="text-sm leadiing-6 font-medium ">Sr.Surgeon</p>
            <p className="text-sm leading-6 font-medium ">New Appolo Hostpital,New York </p>

                </div>
           
        </li>
    </ul>
    </div>
   </div>
  )
}

export default About