import React from 'react'
import Footer from '../components/Admin/footer'
import Header from '../components/Admin/header'
import Router from '../routes/Router'

function AdminLayout() {
  return (
    <>
    <Header />
    <Router />
    <Footer/>
    </>
    
    
  )
}

export default AdminLayout