import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/footer/Footer'
import Header from '../component/header/Header'
import SideBar from '../pages/sideBar/SideBar'
import axios from "axios";
import { useEffect } from 'react'
import { baseApi } from '../api/apiInstance'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'

export const Layout = () => {
  const dispatch = useDispatch();
  const getUser = useSelector(state=> state.user);

  useEffect(()=>{
    dispatch(fetchUser());
    // console.log("user from Header:",user)
  },[]);
  
  console.log("getUser::::",getUser.user?.data);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]'>
          {/* Sidebar - spans both rows */}
          <aside className='row-span-2'>
            <SideBar/>
          </aside>
          
          {/* Header - spans across the top */}
          <header className='col-start-2'>
            <Header/>
          </header>
          
          {/* Main Content - below header */}
          <main className='col-start-2 overflow-auto bg-gray-50'>
            <Outlet/>
          </main>
        </div>
      </Suspense>
    </>    
  )
}