import React from "react";
import { UserContext } from "../../Context/AllContexts";
import { useSearchParams } from "react-router-dom";
import Booking from "./Bookings/Booking";
import Search from "./Search/Search";
const Layout = ({ hotelData, setHotelData }) => {
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [searchParams] = useSearchParams();
  switch (searchParams.get("show")) {
    case "bookings":
      return <Booking />;
    case "search":
      return <Search />;
    default:
      return <Booking />;
  }
};

export default Layout;
