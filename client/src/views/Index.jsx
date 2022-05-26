import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import SearchBar from '../components/SearchBar'
import Table from '../components/Table'
const Index = () => {
  return (
    <div className='text-center'>
      <Header></Header>
      <div className='d-flex bg-light'>
        <SideBar></SideBar>
        <div style={{width:'80vw'}} className='bg-light'>
          <SearchBar></SearchBar>
          <Table></Table>
        </div>
      </div>
    </div>
  )
}

export default Index