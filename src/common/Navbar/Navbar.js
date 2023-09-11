import React from 'react'
import { useNavigate , useSearchParams, useMatch , useLocation } from 'react-router-dom';
// import EditProfile from './EditProfile';
// import DefaultProfilePicture from '../../common/DefaultProfilePicture/DefaultProfile';
import TopMenu from './TopMenu';


const Navbar = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    let regex = /\blogin\b/i;
  
    // if (checkinpage) {
    //   return null;
    // }
    return (
      <>
          <div className="w-full fixed z-20 bg-white md:border-b-[1px] border-[#efefef] hidden md:block">
            <div
              className={`px-4 md:px-6 w-full md:max-w-[1440px] md:h-[58px] h-[60px] mx-auto flex items-center justify-between`}
            >
              <div className="flex gap-x-[50px]">
                <div
                  className={"flex items-center gap-x-[3px] cursor-pointer "}
                  onClick={() => navigate("/")}
                >
                  <div className='text-xl font-bold text-primary'>MyStay</div>
                  {/* <p className="text-[22px] font-[500] md:text-[23px] md:font-[600] relative">
                    
                    <span className="inline-flex absolute -right-[28px] -top-[2px] h-[14px] justify-center items-center px-[6px] py-[2px] ml-3 text-[6px] font-medium text-gray-800 bg-gray-200 rounded-[2px] dark:bg-gray-700 dark:text-gray-300">
                      Beta
                    </span>
                  </p> */}
                </div>
  
                
              </div>
  
              {!regex.test(location.pathname) ? (
                <div className="absolute right-0">
                  <TopMenu />
                </div>
              ) : null}
              <div className="flex items-center md:hidden">
                <img
                  src="/svgs/Ticket.svg"
                  className="w-[20px] h-[20px] object-cover cursor-pointer"
                  alt=""
                />
                <img
                  src="/svgs/Notifications.svg"
                  className="w-[19px] h-[19px] object-cover cursor-pointer mx-[20px]"
                  alt=""
                />
                <div
                  className={`sm:w-[40px] sm:h-[40px] w-[24px] h-[24px] rounded-full bg-${
                    ["red", "green", "blue", "yellow", "indigo"][
                      Math.floor(Math.random() * 5)
                    ]
                  }-500 flex items-center justify-center text-white text-sm font-medium uppercase`}
                >
                  PT
                  {/* {speakerData.firstName.slice(0, 1)}
                      {speakerData.lastName.slice(0, 1)} */}
                </div>
              </div>
              {/* <div
          className={`text-[30px] cursor-pointer visible md:invisible`}
          onClick={() => setShowSideMenu(!showSideMenu)}
        >
          <i className="fa-solid fa-bars"></i>
        </div> */}
            </div>
          </div>
        
      </>
    );
  };

export default Navbar