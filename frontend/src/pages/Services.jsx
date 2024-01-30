import React from 'react'
import ServicesList from '../components/Services/ServicesList.jsx'

function Services() {
  return (
    <section>
      <div className="container">
       <div className="mx-auto lg:w-[33%]">
        <h2 className="heading text-center">Our Services</h2>
        <p className="text_para text-center">World class care for everyone.Our health
             system system offers unmatched,expert health care</p>
       </div>
       <ServicesList/>
      </div>
    </section>
  )
}

export default Services