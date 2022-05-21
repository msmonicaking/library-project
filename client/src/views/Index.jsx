import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
const Index = () => {
  return (
    <div className='text-center'>
      <Header></Header>
      <div className='d-flex'>
        <SideBar></SideBar>
        <div style={{width:'80vw', backgroundColor:'pink'}}>Main Area</div>
      </div>
    </div>
  )
}

export default Index