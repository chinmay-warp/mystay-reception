import React from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import DefaultProfilePicture from "../../common/DefaultProfilePicture/DefaultProfile";
import { UserContext } from "../../Context/AllContexts";
import PrimaryButton from "../../common/Buttons/PrimaryButton";

const UserProfile = () => {
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [showProfile, setShowProfile] = React.useState(true);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (!token && !accessToken) {
      navigate("/login");
    }
    if (!accessToken) {
      setAccessToken(token);
    }
    if (userData) {
      setData(userData.profile);
    } else {
      const getUserData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/partner/reception`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.success === true && data.data) {
          setData(data.data.profile);
          setUserData(data.data);
        }
      };
      getUserData();
    }
  }, []);

  const handleLogout = () => {
    setAccessToken(null);
    setUserData(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <>
      {showProfile === true && (
        <div
          className={`max-w-[1440px] px-[16px] w-full mx-auto min-h-[calc(100vh-58px)] md:w-[422px]`}
        >
          <div className="w-full h-[570px] mt-10">
            <p className="text-black text-opacity-50 pt-5 text-center">
              {data?.email}
            </p>
            <div className="mt-5">
              <hr />
            </div>

            <div className="flex items-center w-full md:w-[387px] h-[50px] mt-5">
              <DefaultProfilePicture
                firstName={data?.firstName}
                lastName={data?.lastName}
                style={{
                  height: "64px",
                  width: "64px",
                  borderRadius: "32px",
                }}
              />

              <div className="ml-5 w-full md:w-[259px] text-[14px]">
                <p className="font-semibold text-[17px] ">{`${
                  data?.firstName ? data?.firstName : " "
                } ${data?.lastName ? data?.lastName : " "}`}</p>
                <p className="text-black text-opacity-50 mt-[0px]">
                  {data?.mobile ? data?.mobile : " "}
                </p>
              </div>
              {/* <img
                  src="/images/Edit.svg"
                  alt="edit"
                  className="h-[23px] w-[23px] md:h-[18px] md:w-[18px] cursor-pointer relative -left-[25px] md:static"
                  onClick={() => setShowProfile("editProfile")}
                /> */}
            </div>
            <div className="mt-5">
              <hr />
            </div>
            <div className="w-full flex items-center justify-center mt-4">
              <PrimaryButton text="Logout" onClick={() => handleLogout()} />
            </div>
          </div>
        </div>
      )}

      {showProfile === "editProfile" && (
        <EditProfile
          setShowProfile={setShowProfile}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
};

export default UserProfile;
