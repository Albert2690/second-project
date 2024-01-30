import React from 'react'
import aboutimg from '../assets/images/about.png'
import aboutCard from '../assets/images/about-card.png'

function About() {
  return (
   <section>
    <div className='container' >
        <div className='flex items-center justify-between lg:gap-7 xl:gap-0 flex-col  lg:flex-row'>
            {/* About img */}
            <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 my-10 '>
                <img src={aboutimg} alt="" />
                <div className='absolute x-20 bottom-4 w-[200px] md:w-[300px] md:right[-7%] right-[-30%] lg:right-[-25%] xl:right-[20%]'>
                    <img src={aboutCard} alt="" />
                </div>
            </div>
            <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                <h2 className="heading font[500] w-[80%] text-center mt-[-20px] mx-11 ">Proud to be one
                 of the nation's best
                 </h2>
                 <p className="text_para text-justify mt-11">
                  Vcare offers a range of virtual healthcare services, allowing you to consult with certified medical professionals.
                   Whether you have a pressing health concern or simply need professional advice,
                    our team is here to provide personalized and confidential care.Our team of healthcare professionals includes experienced doctors, specialists, and wellness experts. With Vcare, you have access to a diverse range of medical expertise, ensuring that you receive the right guidance
                     for your unique health needs.
                  </p>
                 <p className="text_para mt-7 text-justify">Welcome to Vcare, your trusted online
                  healthcare companion. In a world where accessibility is key,
                   Vcare brings quality healthcare to your fingertips. Our platform 
                   is designed to provide you with seamless online consultations, connecting
                    you with experienced healthcare professionals
                  from the comfort of your home.</p>
                 <div className='flex justify-center'>
                 <button className='btn bg-gradient-to-r from-blue-300 to-cyan-200 hover:text-black justify-center'>Learn More</button>
 
                 </div>

            </div>
        </div>
    </div>
   </section>
  )
}

export default About