import React from 'react'
import { UserContext } from '../../Context/AllContexts';
import { useSearchParams } from "react-router-dom";
import Booking from './Bookings/Booking';
const Layout = ({hotelData , setHotelData}) => {
  const { userData , setUserData , accessToken , setAccessToken } = React.useContext(UserContext);
    const [searchParams] = useSearchParams();
    switch (searchParams.get("show")) {
      case "propertyInfo":
        return <Booking />
      
      default:
        return <Booking />
    }
}

export default Layout