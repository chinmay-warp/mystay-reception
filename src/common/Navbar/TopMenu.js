import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../DefaultProfilePicture/DefaultProfile";
import { UserContext } from "../../Context/AllContexts";

const topMenu = [
  {
    name: "Profile",
    icon: "fa-regular fa-face-smile",
    path: "profile",
  },
];

function TopMenu() {
  const [idx, setIdx] = useState("All Events");
  const { userData } = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [savedUserConfig, setSavedUserConfig] = useState(undefined);
  useEffect(() => {
    if (userData?.profile) {
      setSavedUserConfig(userData?.profile);
    }
  }, [savedUserConfig?._id, userData]);
  return (
    <ul className="hidden md:flex w-[320px] justify-end items-center text-[#C5C5C7] sticky top-[10px] pr-[30px] ">
      {topMenu.map((menu, index) => (
        <li
          className={`cursor-pointer grid place-items-center  ${
            location.pathname === `/${menu.path}` ? "text-primary" : ""
          }`}
          key={index}
          onClick={() => {
            setIdx(menu.name);
            navigate(`/${menu.path}`.toLowerCase());
          }}
        >
          <>
            <i className={`${menu.icon} mb-1`}></i>
            <span className="font-medium text-[10px]">{menu.name}</span>
          </>
        </li>
      ))}
    </ul>
  );
}

export default TopMenu;
