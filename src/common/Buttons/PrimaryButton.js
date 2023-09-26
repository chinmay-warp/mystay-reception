import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      className={`btn ${props.small && "btn-sm"} ${
        props.tiny && "btn-xs"
      } bg-primary text-white hover:bg-white hover:text-primary  ${
        props.classes
      } ${props.disabled && "bg-gray-600 hover:bg-gray-600"} capitalize`}
      onClick={props.onClick}
      {...props}
    >
      {props.text}
    </button>
  );
};

export default PrimaryButton;

// bg-primary rounded-xl text-[18px] xl:text-md grid place-items-center font-semibold w-36 md:w-48 lg:w-60 hover:text-primary hover:bg-white hover:border hover:border-primary text-white cursor-pointer h-12
