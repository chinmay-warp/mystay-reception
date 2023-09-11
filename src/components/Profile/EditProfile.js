import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../common/inputs/TextInput";

const EditProfile = ({ setShowProfile, data , setData}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  console.log(data);

  React.useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
      });
    }
  },[data]);

  const onSubmit = async (data , error) => {
    console.log(error);
    // console.log(data);
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `http://localhost:5001/api/v1/customer/user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({user:{
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
        }}),
      }
    );

    const res = await response.json();
    if(res.success && res.code === 200){
      // setUserData(res.message.user);
      setData(res.message.user);
      setShowProfile(true);
      setIsSubmitting(false);
    }else{
      alert("Error updating user")
    }

    setIsSubmitting(false);

  };

  return (
    <div
      className={`max-w-[1440px] w-full mx-auto min-h-[calc(100vh_-_60px)] md:w-[375px] mt-[40px]`}
    >
      <div className="w-full -mt-[10px]">
        <div className="w-full md:w-full p-5 pt-2">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-[600] text-[23px]">Edit Profile</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[6px]">
              {/* <FileInput
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                    label="Profile picture (Recommended size - 500 X 500 pixels)"
                    mb="5"
                  /> */}
              <TextInput
                register={register}
                type="text"
                id={"firstName"}
                label="First Name"
              />
              <TextInput
                register={register}
                type="text"
                id={"lastName"}
                label="Last Name"
              />
              <TextInput
                register={register}
                type="text"
                id={"email"}
                label="Email Address"
                placeholder="Email Address"
                disabled={true}
              />
              <TextInput
                register={register}
                type="tel"
                id={"mobile"}
                label="Phone Number"
                minLength={10}
                maxLength={10}
              />
              <div className="-mt-[10px] w-full bg-primary p-2 flex items-center justify-center rounded-lg">
                <button
                  value={isSubmitting ? "Loading..." : "Save Changes"}
                  type="submit"
                  className=" text-white"
                  disabled={isSubmitting}
                >
                  Save Changes
                </button>
              </div>

              <div className="mt-[12px] w-full flex items-center gap-2 cursor-pointer text-primary justify-center" onClick={()=>setShowProfile(true)} disabled={isSubmitting}>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-primary"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
                Go Back
      </div>
              {/* <div className="spacer mb-[35px]"></div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
