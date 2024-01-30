import React from 'react'
import ServicesList from '../../components/Services/ServicesList'
import AddServices from '../../components/Admin/AddServices'

function ServicesManagment() {
  return (
    <section>
      <div className="container">
       <div className="flex justify-center ">
        <div className="btn bg-gray-200 text-black "><AddServices/></div>
        
        {/* <p className="text_para text-center">World class care for everyone.Our health
             system system offers unmatched,expert health care</p> */}
       </div>
       <ServicesList admin={true} />
      </div>
    </section>
  )
}

export default ServicesManagment
