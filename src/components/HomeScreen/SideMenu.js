import React, { useEffect } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import Home from "../Svg/Home";
import Room from "../Svg/Room";
import { UserContext } from "../../Context/AllContexts";
function SideMenu({ property, owner }) {
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navbarContent = [
    {
      name: "Booking Info",
      imageUrl: (
        <Home
          color={searchParams.get("show") === "bookings" ? "#ff5500" : "#000"}
        />
      ),
      pathName: "bookings",
      comingSoon: false,
    },
    {
      name: "Search",
      imageUrl: (
        <Room
          color={searchParams.get("show") === "search" ? "#ff5500" : "#000"}
        />
      ),
      pathName: "search",
      comingSoon: false,
    },
    // {
    //   name: "Teams",
    //   imageUrl: (
    //     <Room color={searchParams.get("show") === "team" ? "#ff5500" : ""} />
    //   ),
    //   pathName: "team",
    //   comingSoon: false,
    //   role: "ADMIN",
    // },
    // {
    //   name: "Schedule",
    //   imageUrl: (
    //     <Schedule
    //       color={searchParams.get("show") === "schedule" ? "#ff5500" : ""}
    //     />
    //   ),
    //   pathName: "schedule",
    //   comingSoon: false,
    // },
    // {
    //   name: "Sponsors",
    //   imageUrl: (
    //     <Sponsors
    //       color={searchParams.get("show") === "sponsors" ? "#ff5500" : ""}
    //     />
    //   ),
    //   pathName: "sponsors",
    //   comingSoon: false,
    // },
    // {
    //   name: "Registrations",
    //   imageUrl: (
    //     <IDCard
    //       color={searchParams.get("show") === "registrations" ? "#ff5500" : ""}
    //     />
    //   ),
    //   pathName: "registrations",
    //   comingSoon: false,
    // },
    // {
    //   name: "Analytics",
    //   imageUrl: (
    //     <Form
    //       color={searchParams.get("show") === "analytics" ? "#ff5500" : ""}
    //     />
    //   ),
    //   pathName: "analytics",
    //   comingSoon: false,
    // },
    // {
    //   name: "Communications",
    //   imageUrl: (
    //     <Communication
    //       color={searchParams.get("show") === "communications" ? "#ff5500" : ""}
    //     />
    //   ),
    //   pathName: "communications",
    //   comingSoon: true,
    // },
    // // {
    // //   name: "Team",
    // //   imageUrl: <People color={"#ff5500"} />,
    // //   pathName: "team",
    // //   comingSoon: false,
    // // },
    // {
    //   name: "Settings",
    //   imageUrl: (
    //     <SettingsSvg
    //       color={searchParams.get("show") === "settings" ? "#ff5500" : ""}
    //     />
    //   ),
    //   pathName: "settings",
    //   comingSoon: true,
    // },
  ];
  // ${
  //     singleEvent.isMockEvent ? "h-[calc(100vh_-_98px)]" : " h-[calc(100vh_-_58px)]"
  // }

  return (
    <aside
      className={`hidden md:block w-[228px] fixed h-screen border-r border-[#C5C5C766] border-opacity-40 rounded bg-white aria-label=Sidebar md:h-[90%] overflow-y-scroll overflow-x-hidden scrollbar-hide md:pb-7`}
    >
      <div className="bg-white w-full">
        <div className="mt-4 w-full flex flex-row gap-2 items-center justify-center font-inter font-semibold text-base">
          {userData?.hotelDetails?.hotelName
            ? userData.hotelDetails.hotelName.charAt(0).toUpperCase() +
              userData.hotelDetails.hotelName.slice(
                1,
                userData.hotelDetails.hotelName.length
              )
            : null}
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.95831 12.0417L12.0416 4.95837"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.95831 4.95837H12.0416V12.0417"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        {/* <p className="">{}</p> */}
        <ul className="pt-6">
          {navbarContent &&
            userData &&
            navbarContent.length > 0 &&
            navbarContent.map((navbar, index) => {
              if (
                (navbar.role && userData.role === navbar.role) ||
                !navbar.role
              ) {
                return (
                  <li key={index} className="relative">
                    <div
                      onClick={() => {
                        navigate(`?show=${navbar.pathName}`);
                      }}
                      className={`flex cursor-pointer text-[#9a9a9a] items-center pl-5 py-3.5 text-[11px] font-[500] border-b border-[#C5C5C766] border-opacity-40 ${
                        searchParams.get("show") === navbar.pathName
                          ? "text-primary"
                          : ""
                      }`}
                    >
                      <>{navbar?.imageUrl}</>
                      <span
                        className={`pl-[7px] pt-[2px] font-[600] ${
                          searchParams.get("show") === navbar.pathName
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        {navbar.name}
                      </span>
                      {navbar.comingSoon ? (
                        <span className="absolute bottom-[4px] right-[0px] bg-[#83f5b2]  text-green-800 text-[9px] font-medium mr-2 px-2.5 py-0.5 rounded">
                          New
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              } else {
                return <></>;
              }
            })}
        </ul>
      </div>
    </aside>
  );
}

export default SideMenu;
