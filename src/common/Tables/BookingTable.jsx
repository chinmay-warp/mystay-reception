import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

const BookingTable = ({ bookings, getUserData, accessToken }) => {
  const [total, setTotal] = React.useState(bookings.length);
  const [current, setCurrent] = React.useState(1);
  const [tickets, setTickets] = React.useState([]);
  const [sort, setSort] = React.useState(null);
  const [triggerLabel, setTriggerLabel] = React.useState(false);

  const totalPagesMemo = React.useMemo(() => {
    let totalPages = total / 10;
    totalPages = Math.floor(totalPages);
    if (total % 10 > 0) totalPages++;
    return totalPages;
  }, [total]);

  const totalPages = totalPagesMemo;
  const pagination = React.useMemo(() => {
    const previous = current - 1 > 0 ? current - 1 : null;
    const next = current + 1 <= totalPages ? current + 1 : null;
    return {
      current,
      previous,
      next,
      totalPages,
    };
  }, [current, totalPages]);

  const { previous, next } = pagination;

  function formatTicketTime(inputString) {
    if (inputString) {
      const utcDate = new Date(inputString);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      };

      const formatter = new Intl.DateTimeFormat("en-IN", options);
      const dateString = formatter.format(utcDate);
      return dateString;
    }
    return null;
  }

  React.useEffect(() => {
    const bookingDetails = bookings.slice((current - 1) * 10, current * 10);
    setTickets(bookingDetails);
    setTotal(bookings.length);
  }, [current, sort, bookings]);

  const handlePrevious = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  return (
    <div className="flex-grow overflow-auto max-w-[100%] mt-4 font-inter">
      {/* <div> */}
      {tickets?.length > 0 ? (
        <>
          <table className="table-auto mb-[30px]">
            <thead className="bg-[#E8F7FF]">
              <tr className="">
                <th className="text-[12px] font-[600] text-center leading-[45px] w-[100px]">
                  Booking Id
                </th>
                <th className="text-[12px] font-[600] text-center leading-[45px] w-[250px]">
                  Contact Info
                </th>
                <th className="text-[12px] font-[600] text-center leading-[45px] w-[100px]">
                  Guests
                </th>
                <th className="text-[12px] font-[600] text-center leading-[45px] w-[100px]">
                  Room
                </th>
                <th className="text-[12px] font-[600] text-center leading-[45px] w-[150px]">
                  Booking Date
                </th>
                <th className="text-[12px] font-[600] text-center leading-[45px] w-[150px]">
                  Reservation
                </th>
                <th className="text-[12px] font-[600] text-center  leading-[45px] w-[200px] ">
                  <span>Status</span>
                  {/* <div
                    className="cursor-pointer"
                    onMouseEnter={() => setTriggerLabel(true)}
                    onMouseLeave={() => setTriggerLabel(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      className="w-5 h-5 stroke-gray-400"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                      />
                    </svg>
                  </div>

                  {triggerLabel && (
                    <div
                      className="absolute w-[90px] top-6 left-4 pt-4 bg-transparent z-20"
                      onMouseEnter={() => setTriggerLabel(true)}
                      onMouseLeave={() => {
                        setTriggerLabel(false);
                      }}
                    >
                      <div
                        className="bg-white border h-[75px] flex flex-col gap-4 justify-center items-center p-2 rounded-lg overflow-y-scroll"
                        style={{
                          boxShadow: "0px 0px 14px rgba(165, 94, 234, 0.2)",
                        }}
                      >
                        <div
                          className="cursor-pointer flex items-center justify-between leading-tight font-medium"
                          onClick={() => {
                            if (sort != "asc") setSort("asc");
                            setTriggerLabel(false);
                          }}
                        >
                          Oldest
                          <img
                            src="/svgs/arrow.svg"
                            alt="arrow"
                            className="w-[15px] font-[600] ml-[5px] cursor-pointer rotate-180"
                          />
                        </div>
                        <div
                          className="cursor-pointer leading-tight flex  items-center justify-between font-medium"
                          onClick={() => {
                            if (sort != "desc") setSort("desc");
                            setTriggerLabel(false);
                          }}
                        >
                          Newest
                          <img
                            src="/svgs/arrow.svg"
                            alt="arrow"
                            className="w-[15px] font-[600] ml-[5px] cursor-pointer rotate-0"
                          />
                        </div>
                      </div>
                    </div>
                  )} */}
                </th>
                {/* <th className="text-[12px] font-[600] text-left leading-[45px] w-[100px]">
                    Receipt
                  </th> */}
              </tr>
            </thead>

            <tbody className="md:w-[1020px] max-h-[100px] overflow-y-scroll">
              {tickets.map((booking, index) => {
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
                      console.log(data);
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
                      getUserData(accessToken);
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
                      getUserData(accessToken);
                    });
                };
                return (
                  <React.Fragment key={index}>
                    <tr className="h-[55px] border-b">
                      <td className="text-[12px] text-center font-[600]">
                        {booking._id.slice(0, 12)}
                      </td>
                      <td className="text-[12px] text-center font-[400] flex flex-col gap-1 items-center justify-center">
                        <span className="font-bold">
                          {booking.customerId?.firstName +
                            " " +
                            booking.customerId?.lastName}
                        </span>
                        {booking.customerId?.email && (
                          <p className="text-[12px] text-center font-[400]">
                            {booking.customerId?.email}
                          </p>
                        )}
                      </td>
                      <td className="text-[12px] text-center font-[400]">2</td>
                      <td className="text-[12px] text-center font-[400]">1</td>

                      <td className="text-[12px] text-center font-[600]">
                        {formatTicketTime(booking.createdAt)}
                      </td>
                      <td className="text-[12px] text-center  font-[400]">
                        <p className="font-semibold">
                          {formatTicketTime(booking.checkIn)}{" "}
                          <span className="font-normal">To</span>{" "}
                        </p>
                        <p className="font-semibold">
                          {formatTicketTime(booking.checkOut)}
                        </p>
                      </td>
                      <td className="text-[12px] text-center font-[400]">
                        {booking.status === "Booked" && (
                          <PrimaryButton
                            text={"Check In "}
                            onClick={() => handleCheckIn()}
                            tiny={true}
                          />
                        )}
                        {booking.status === "CheckedIn" && (
                          <PrimaryButton
                            text={"Check Out "}
                            onClick={() => handleCheckOut()}
                            tiny={true}
                          />
                        )}
                        {booking.status === "Complete" && (
                          <PrimaryButton
                            text={"Complete"}
                            onClick={() => alert("Already Checked Out")}
                            tiny={true}
                          />
                        )}
                      </td>
                      {/* <td className="text-[12px] text-center font-[400] w-[100px]">
                          <a href={booking.payment.receiptUrl} target="_blank" className="rounded-[12px] p-[4px] text-white flex items-center justify-center bg-primary">View</a>
                        </td>  */}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {/* {tab === "Registered" ? ( */}

          <div className="flex items-center ml-0  rounded-lg w-full mx-auto mt-[10px]">
            <div className="text-[13px] mr-2">
              <span className="font-semibold text-[14px]">
                {tickets?.length}
              </span>{" "}
              of <span className="font-semibold text-[14px]">{total}</span>{" "}
              results
            </div>

            <button
              className={`text-center cursor-pointer text-${
                previous === null ? "gray-300" : "primary"
              } text-[23px]`}
              disabled={previous === null ? true : false}
              onClick={() => handlePrevious()}
            >
              {"<"}
            </button>

            <div className="mx-3 cursor-pointer">
              <select
                id="title"
                name="title"
                // {...register("gender")}
                required
                value={current}
                onChange={(e) => {
                  handlePageChange(e.target.value);
                  // await getAllEventbookings(next);
                }}
                className={`
              w-[75px]
              peer bg-white border-2 border-primary rounded-[5px] text-gray-900 text-[12px] placeholder-transparent focus:ring-transparent py-0 1.5rem cursor-pointer
              bg-center `}
              >
                {Array.from({ length: totalPages }).map((_, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                    className="hover:bg-gray-300 border-primary rounded-[5px] overflow-scroll max-h-[50px]"
                  >
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={next === null ? true : false}
              className={`text-center cursor-pointer text-${
                next === null ? "gray-300" : "primary"
              } text-[23px]`}
              onClick={() => handleNext()}
            >
              {">"}
            </button>
          </div>
          {/* ) : (
            <></>
          )} */}
        </>
      ) : (
        <div className="grid w-full place-items-center h-[350px] mt-[40px]">
          <div>
            {/* <img
              src="/svgs/nullState.svg"
              alt=""
              className="w-[500px] h-[300px]"
            /> */}
            <p className="text-4xl font-[500] text-[#717171] text-center mt-[15px]">
              Nothing here...
            </p>
          </div>
        </div>
      )}
      <div className="text-gray-300 text-primary"></div>
    </div>
  );
};

export default BookingTable;
