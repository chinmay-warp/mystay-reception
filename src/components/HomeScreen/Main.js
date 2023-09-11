import React from 'react'
import Navbar from '../../common/Navbar/Navbar'
import SideMenu from './SideMenu'
import Layout from './Layout'

const Main = () => {
  return (
    <div className="flex flex-col">
      <div className="header h-[58px] w-full">
        <Navbar />
      </div>
      <div className="w-full flex justify-center items-center flex-col ">
        <div className="w-full xl:w-[1440px] overflow-x-hidden">
          <div
            className={`grid grid-cols-[228px_1fr] ${" h-[calc(100vh_-_58px)]"}  `}
          >
            {/* <div className="sidebar md:w-[228px]"> */}
            <div className="sidebar md:w-[228px]">
              <SideMenu  />
            </div>
            <div
              className={`container ml-[30px] w-full ${" h-[calc(100vh_-_58px)]"}`}
            >
              <Layout />

              {/* {props.children} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main