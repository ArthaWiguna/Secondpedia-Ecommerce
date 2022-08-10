import React from "react";
import { FiEdit3, FiDownload } from "react-icons/fi";
import { BiStoreAlt } from "react-icons/bi";
import profilePicture from "../assets/img/fi_camera.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DropdownAccount = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(true);
    navigate("/");
  };

  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  return (
    <div>
      <img
        src={user ? user.urlUser : profilePicture}
        alt="profilePicture"
        className="block md:hidden m-auto mt-6 md:mt-0 rounded-xl"
        width={96}
        height={96}
      />
      <div className="py-4 bg-white md:shadow-[0_0_4px_rgba(0,0,0,0.15)] rounded-2xl [&>div:last-child>div>div]:border-none">
        <Link to="/daftarJual">
          <div className="hover:bg-gray-500 cursor-pointer">
            <div className="px-4 pt-4">
              <div className="pb-4 flex gap-5 border-b border-gray-500">
                <BiStoreAlt className="text-purple-900 text-lg" />{" "}
                <h3 className="text-sm font-normal text-black">Daftar Jual</h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to={`/infoprofile/${user.userId}`}>
          <div className="hover:bg-gray-500 cursor-pointer">
            <div className="px-4 pt-4">
              <div className="pb-4 flex gap-5 border-b border-gray-500">
                <FiEdit3 className="text-purple-900 text-lg" />{" "}
                <h3 className="text-sm font-normal text-black">Info Profile</h3>
              </div>
            </div>
          </div>
        </Link>
        <div
          className="hover:bg-gray-500 cursor-pointer"
          onClick={handleLogout}
        >
          <div className="px-4 pt-4">
            <div className="pb-4 flex gap-5 border-b border-gray-500">
              <FiDownload className="text-purple-900 text-lg -rotate-90" />{" "}
              <h3>Keluar</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownAccount;
