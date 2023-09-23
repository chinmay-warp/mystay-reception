import React from "react";
import { UserContext } from "../../../Context/AllContexts";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";

const Booking = () => {
  const navigate = useNavigate();
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [bookingData, setBookingData] = React.useState([]);
  const [day, setDay] = React.useState(new Date());
  const getUserData = async (token) => {
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
      setUserData(data.data);
    }
  };
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !accessToken) {
      navigate("/login");
    }
    if (!accessToken) {
      setAccessToken(token);
    }
    if (!userData) {
      
      getUserData(token);
    }
  }, []);

  React.useEffect(() => {
    if (userData) {
      const bookingArray = userData.roomBookingDetails.roomBookedDetails.filter(
        (booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);

          console.log("Check-in Date:", checkInDate);
          console.log("Check-out Date:", checkOutDate);
          console.log("Today:", day);
          console.log(
            "Comparison Result:",
            checkInDate <= day && checkOutDate >= day
          );

          return checkInDate <= day && checkOutDate >= day;
        }
      );

      const checkInArray =
        userData.roomBookingDetails.roomCheckedInDetails.filter((booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);

          return checkInDate <= day && checkOutDate >= day;
        });

      const completeArray =
        userData.roomBookingDetails.roomCompleteDetails.filter((booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);
          return checkInDate <= day && checkOutDate >= day;
        });

      console.log(bookingArray, checkInArray, completeArray);

      setBookingData([...bookingArray, ...checkInArray, ...completeArray]);
    }
  }, [userData, day]);


  return (
    <div className="w-full py-6 px-6">
      <div className="flex gap-2   text-lg items-center">
        <span className="font-bold text-primary">Bookings for</span>
        <div className="mt-1">
          <DatePicker
            onChange={(value) => setDay(value)}
            value={day}
            format="dMMMy"
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center py-6 gap-4">
        {bookingData.length > 0 ? (
          bookingData.map((booking, index) => {
            let amount = 0;
            if(booking.status === "CheckedIn"){
              fetch(`${process.env.REACT_APP_SERVER_URL}/partner/reception/getAmountRemaining`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": accessToken,
                  },
                  body: JSON.stringify({ roomNumbers: [booking.roomNumber], hotelId: booking.hotelId, }),
                  })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    if (data.success === true) {
                      amount = data.message.remainingBookingAmount + data.message.remainingFoodAmount;
                    }
                  });
            }
            const handleCheckIn = async () => {
              const roomNumbers = [booking.roomNumber];
              const hotelId= booking.hotelId;
              fetch(`${process.env.REACT_APP_SERVER_URL}/partner/reception/roomCheckin`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": accessToken,
                },
                body: JSON.stringify({ roomNumbers, hotelId }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.success === true) {
                    alert("Checked In");
                  }
                  getUserData(accessToken);
                }
                );

            };

            const handleCheckOut = async () => {
              const roomNumbers = [booking.roomNumber];
              const hotelId= booking.hotelId;
              const remainingAmount=amount;
              fetch(`${process.env.REACT_APP_SERVER_URL}/partner/reception/roomCheckout`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": accessToken,
                },
                body: JSON.stringify({ bookingRooms: roomNumbers, hotelId ,remainingAmount , amount }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.success === true) {
                    alert("Checked Out");
                  }
                  getUserData(accessToken);
                }
                );

            };
            
            return (
              <div
                key={index}
                className="w-[250px] flex flex-col items-center justify-center rounded-xl  border"
              >
                <div
                  className={`w-full flex flex-col items-center justify-around py-2  px-2 h-36 rounded-xl text-gray-600 
                    
                     `}
                >
                  <div className="">Room Booked: {booking.roomNumber}</div>
                  <div>
                    {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  { booking.status === "CheckedIn" &&
                    <div className="">Amount Remaining: {amount}</div>
                  }

                  <div className="">
                    { booking.status === "Booked" && 
                      <PrimaryButton  btnText={"Check In "} onClick={()=> handleCheckIn()}/>
                    }  
                     { booking.status === "CheckedIn" && 
                      <PrimaryButton  btnText={"Check Out "} onClick={()=>handleCheckOut()}/>
                    }     
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-red-400 bg-green-400 bg-blue-400"></div>
        )}
      </div>
    </div>
  );
};

export default Booking;


// ${booking.status === "Booked" && "bg-green-400"}
//                     ${booking.status === "Complete" && "bg-red-400"}
//                       ${booking.status === "CheckedIn" && "bg-blue-400"}