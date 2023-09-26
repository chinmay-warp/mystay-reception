import React from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../Context/AllContexts";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [bookings, setBookings] = React.useState([]);
  const [email, setEmail] = React.useState("");

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setEmail(data.email);
    try {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/partner/reception/getBookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
          },
          body: JSON.stringify({
            email: data.email,
            hotelId: userData.hotelDetails.hotelId,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success === true) {
            setBookings(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full w-full p-6">
      <div className="text-primary text-xl font-bold">
        Search for User Bookings
      </div>
      <form
        className=" flex mt-8 gap-[10px] items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
            className="input input-bordered md:w-96 w-72  font-semibold"
          />
        </div>
        <div className="w-24">
          <PrimaryButton
            type="submit"
            classes=" !w-24"
            // disabled={loading}
            text="Search"
          />
        </div>
      </form>

      <div className="flex flex-wrap gap-3 items-center">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
            let amount = 0;
            if (booking.status === "CheckedIn") {
              fetch(
                `${process.env.REACT_APP_SERVER_URL}/partner/reception/getAmountRemaining`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token": accessToken,
                  },
                  body: JSON.stringify({
                    roomNumbers: [booking.roomNumber],
                    hotelId: booking.hotelId,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.success === true) {
                    amount =
                      data.message.remainingBookingAmount +
                      data.message.remainingFoodAmount;
                  }
                });
            }
            const handleCheckIn = async () => {
              const roomNumbers = [booking.roomNumber];
              const hotelId = booking.hotelId;
              fetch(
                `${process.env.REACT_APP_SERVER_URL}/partner/reception/roomCheckin`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token": accessToken,
                  },
                  body: JSON.stringify({ roomNumbers, hotelId }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.success === true) {
                    alert("Checked In");
                  }
                  onSubmit({ email: email });
                });
            };

            const handleCheckOut = async () => {
              const roomNumbers = [booking.roomNumber];
              const hotelId = booking.hotelId;
              const remainingAmount = amount;
              fetch(
                `${process.env.REACT_APP_SERVER_URL}/partner/reception/roomCheckout`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token": accessToken,
                  },
                  body: JSON.stringify({
                    bookingRooms: roomNumbers,
                    hotelId,
                    remainingAmount,
                    amount,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.success === true) {
                    alert("Checked Out");
                  }
                  onSubmit({ email: email });
                });
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
                    {new Date(booking.checkIn).toLocaleDateString()} to{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  {booking.status === "CheckedIn" && (
                    <div className="">Amount Remaining: {amount}</div>
                  )}

                  <div className="">
                    {booking.status === "Booked" && (
                      <PrimaryButton
                        btnText={"Check In "}
                        onClick={() => handleCheckIn()}
                      />
                    )}
                    {booking.status === "CheckedIn" && (
                      <PrimaryButton
                        btnText={"Check Out "}
                        onClick={() => handleCheckOut()}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="pl-4 pt-4">No Bookings for the user</div>
        )}
      </div>
    </div>
  );
};

export default Search;
