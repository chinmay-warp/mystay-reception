import React from "react";
import Navbar from "../../Navbar/Navbar";

const Layout = (props) => {
  return (
    <div className="max-w-screen min-h-screen">
      <div className="header h-[58px] w-full">
        <Navbar />
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
