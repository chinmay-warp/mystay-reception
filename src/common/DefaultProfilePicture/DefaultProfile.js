import React from "react";
// import profileImageColor from "../../utils/profileImageColor.json";

const DefaultProfilePicture = ({ firstName = "my", lastName = "stay", style }) => {
  //   console.log(profileImageColor[firstName.toUpperCase()[0]], "firstName");
  return firstName ? (
    <div
      style={{
        backgroundColor: `${
          "#FF5500"
        }`,
        color: "white",
        fontWeight: "600",
        display: "grid",
        placeItems: "center",
        fontSize: "20px",
        ...style,
      }}
      className="w-10 h-10 rounded-full"
    >
      {firstName[0].toUpperCase()}
      {lastName[0].toUpperCase()}
    </div>
  ) : (
    []
  );
};

export default DefaultProfilePicture;
