import React from "react";
import { UserContext } from "../../../Context/AllContexts";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";
import BookingTable from "../../../common/Tables/BookingTable";

const Booking = () => {
  const navigate = useNavigate();
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [bookingData, setBookingData] = React.useState([]);
  const [email, setEmail] = React.useState("");
  let yesterday = new Date(Date.now() + 24 * 60 * 60 * 1000);
  let today = new Date(yesterday.getTime() - 24 * 60 * 60 * 1000);
  var tomorrow = new Date(yesterday.getTime());
  const [dates, setDates] = React.useState();

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
            setBookingData(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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

    const selectElement = document.querySelectorAll(
      ".react-daterange-picker__inputGroup__month"
    );
    // console.log(selectElement);
    for (let i = 0; i < selectElement.length; i++) {
      selectElement[i].disabled = true;
    }
    // document.querySelector(
    //   ".react-date-picker__inputGroup__day"
    // ).disabled = true;
    // document.querySelector(
    //   ".react-date-picker__inputGroup__year"
    // ).disabled = true;

    // document
    //   .querySelector(".react-date-picker__inputGroup__month")
    //   .addEventListener("click", () => {
    //     document.querySelector(".react-date-picker__calendar-button").click();
    //   });
    // document
    //   .querySelector(".react-date-picker__inputGroup__day")
    //   .addEventListener("click", () => {
    //     document.querySelector(".react-date-picker__calendar-button").click();
    //   });
    // document
    //   .querySelector(".react-date-picker__inputGroup__year")
    //   .addEventListener("click", () => {
    //     document.querySelector(".react-date-picker__calendar-button").click();
    //   });
  }, []);

  React.useEffect(() => {
    if (!dates) {
      setDates([today, tomorrow]);
    }
  }, []);

  React.useEffect(() => {
    if (!email) {
      setDates([today, tomorrow]);
    }
  }, [email]);

  React.useEffect(() => {
    if (userData && dates) {
      const bookingArray = userData.roomBookingDetails.roomBookedDetails.filter(
        (booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);

          console.log("Check-in Date:", checkInDate);
          console.log("Check-out Date:", checkOutDate);
          console.log(
            "Comparison Result:",
            checkInDate <= dates[0] && checkOutDate >= dates[1]
          );

          return (
            (checkInDate >= dates[0] && checkOutDate <= dates[1]) ||
            (checkInDate <= dates[0] && checkOutDate >= dates[0]) ||
            (checkInDate <= dates[1] && checkOutDate >= dates[1])
          );
        }
      );

      const checkInArray =
        userData.roomBookingDetails.roomCheckedInDetails.filter((booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);

          return (
            (checkInDate >= dates[0] && checkOutDate <= dates[1]) ||
            (checkInDate <= dates[0] && checkOutDate >= dates[0]) ||
            (checkInDate <= dates[1] && checkOutDate >= dates[1])
          );
        });

      const completeArray =
        userData.roomBookingDetails.roomCompleteDetails.filter((booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);
          return (
            (checkInDate >= dates[0] && checkOutDate <= dates[1]) ||
            (checkInDate <= dates[0] && checkOutDate >= dates[0]) ||
            (checkInDate <= dates[1] && checkOutDate >= dates[1])
          );
        });

      setBookingData([...bookingArray, ...checkInArray, ...completeArray]);
    }
  }, [userData, dates]);

  React.useEffect(() => {
    console.log(bookingData, "yo");
  }, [bookingData]);

  const handleWeek = (week = 1) => {
    let yesterday = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const today = new Date(
      yesterday.getTime() - 7 * week * 24 * 60 * 60 * 1000
    );
    const tomorrow = new Date(yesterday.getTime());

    setDates([today, tomorrow]);
  };

  const handleMonths = (month = 1) => {
    let yesterday = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const today = new Date(
      yesterday.getTime() - month * 30 * 24 * 60 * 60 * 1000
    );
    const tomorrow = new Date(yesterday.getTime());

    setDates([today, tomorrow]);
  };

  return (
    <div className="w-full py-6 px-6">
      <div className="flex flex-col gap-2 text-lg ">
        <span className="font-semibold font-inter">Bookings</span>
        <div className="flex gap-4 ">
          <div className="relative">
            <input
              type="text"
              className="input input-bordered  border-[#D8D8D8] w-[450px]"
              placeholder="Search by email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div
              className="cursor-pointer absolute right-2 top-0 translate-y-1/2"
              onClick={() => {
                onSubmit({ email });
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.16667 16.5814C12.8486 16.5814 15.8333 13.5966 15.8333 9.91474C15.8333 6.23285 12.8486 3.24808 9.16667 3.24808C5.48477 3.24808 2.5 6.23285 2.5 9.91474C2.5 13.5966 5.48477 16.5814 9.16667 16.5814Z"
                  stroke="#7D7D7D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 18.2481L13.875 14.6231"
                  stroke="#7D7D7D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            className="p-[1.5px] border-[#D8D8D8] border rounded-md px-4 z-10 flex items-center gap-2 justify-center"
            onClick={() => {
              // document
              //   .querySelector(".react-daterange-picker__calendar-button")
              //   .click();
            }}
          >
            <DateRangePicker
              format="dMMMy"
              onChange={setDates}
              value={dates}
              rangeDivider={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              }
              className="flex items-center gap-2 justify-center"
            />
          </div>

          <select
            className="select select-bordered w-36 max-w-xs font-semibold text-[14px] p-2"
            onChange={(e) => {
              if (e.target.value === "week1") {
                handleWeek(1);
              } else if (e.target.value === "week2") {
                handleWeek(2);
              } else if (e.target.value === "month1") {
                handleMonths(1);
              } else if (e.target.value === "month3") {
                handleMonths(3);
              }
            }}
          >
            <option disabled selected>
              Custom range
            </option>
            <option value="week1">Last week</option>
            <option value="week2">Last 2 weeks</option>
            <option value="month1">Last month</option>
            <option value="month3">Last 3 month</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row flex-wrap  items-center py-6 gap-4">
        {bookingData.length > 0 ? (
          <BookingTable
            bookings={bookingData}
            accessToken={accessToken}
            getUserData={getUserData}
          />
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
