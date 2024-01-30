import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Router from '../routes/Router'
import AHeader from '../components/Admin/header'
import Afooter from '../components/Admin/footer'
import DoctorHeader from '../components/Doctors/DoctorHeader'

import { useLocation } from 'react-router-dom'

export default function Layout() {

  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const doctor =location.pathname.startsWith('/doctor')
  return (
    <>
    {
      isAdmin?<AHeader/>:doctor?<DoctorHeader /> :<Header />
    }
    
    <main>
        <Router/>
    </main>
    {isAdmin? <Afooter/>:<Footer/>}
    
    </>
  )
}
