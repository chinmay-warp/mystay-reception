import React from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AllContexts";

const VerifyLogin = ({ setVerify }) => {
  const {setUserData , setAccessToken} = React.useContext(UserContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submit, setSubmit] = React.useState(false);
  let token = localStorage.getItem("token");
  let user;
  user = JSON.parse(localStorage.getItem("userData"));

  const email = user?.email;

  if (!token && !email) {
    setVerify(false);
  }

  const onSubmit = async (data) => {
    setSubmit(true);
    const response = await fetch(
      `http://localhost:5001/api/v1/admin/verifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: parseInt(data.otp),
          email: user.email,
          token: token,
        }),
      }
    );
    const data1 = await response.json();
    console.log(data1);

    if (data1.success === true && data1.data.jwt) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.setItem("accessToken", data1.data.jwt);
      localStorage.setItem("role", data1.data.role);
      setAccessToken(data1.data.jwt);
      
        const response = await fetch(`http://localhost:5001/api/v1/${data1.data.role.toLowerCase()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": data1.data.jwt,
          },
        });

        const data2 = await response.json();
        console.log(data2);
        if (data2.success === true && data2.data) {
          setUserData(data2.data);
          navigate("/");
        
      }
    } else {
      reset({
        otp: "",
      });
      alert("Invalid OTP");
    }

    setSubmit(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="text-gray-700 text-2xl md:text-4xl font-normal">
          Email Verification
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col shadow-lg p-6 rounded-lg w-max gap-2 md:gap-6 justify-center items-center"
        >
          <label className="text-gray-600 text-sm md:text-normal font-normal">
            We have a verification code to {email}
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-40 md:w-full  h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
            {...register("otp", { required: " otp is required" })}
          />
          <button
            type="submit"
            className="w-40 md:w-full h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-bold"
            disabled={submit}
          >
            Verify
          </button>
          <div
            className="text-blue-600 cursor-pointer"
            //   onClick={() => resendOtp()}
            onClick={()=>{setVerify(false)}}
          >
            Resend code?
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyLogin;
