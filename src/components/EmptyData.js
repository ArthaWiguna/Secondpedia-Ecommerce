import React from "react";
import emptyIcon from "../assets/img/empty-icon.svg";

const EmptyData = ({ message, imageWidth }) => {
  console.log(imageWidth);
  return (
    <div className="px-10 py-4">
      <img
        src={emptyIcon}
        alt="empty-icon"
        className={`block mx-auto sm:w-[${imageWidth}]`}
      />
      <p className="text-sm font-normal text-[#151515] text-center mt-6">
        {message}, <br /> sabar ya rejeki nggak kemana kok
      </p>
    </div>
  );
};

export default EmptyData;
