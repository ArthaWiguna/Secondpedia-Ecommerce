import React, { useState } from "react";
import { Link } from "react-router-dom";
import Arrowleft from "../assets/img/fi_arrow-left.svg";
import NavigationBar from "../components/NavigationBar";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SettingAccount = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [newPassword, setNewPassword] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const handleInputPassword = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.id]: e.target.value,
    });
  };

  console.log(newPassword);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div>
      <NavigationBar />
      <section className="flex justify-center mt-8 sm:mt-28 ">
        <Link className="sm:block hidden" to="/">
          <img src={Arrowleft} alt="img" />
        </Link>
        <form
          onSubmit={handleChangePassword}
          className="sm:mx-[78px] sm:w-[568px] w-[328px] flex flex-col justify-between duration-[1s] "
        >
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">Password Lama*</label>
            <div className="relative">
              <input
                id="passwordLama"
                type={passwordShow ? "text" : "password"}
                className="w-full text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
                placeholder="Masukan Passsword Lama"
                onChange={handleInputPassword}
              />
              <div
                className="absolute flex items-center right-5 top-4 cursor-pointer"
                onClick={(e) => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? (
                  <FiEye className=" w-[19px] h-[19px] text-gray-900" />
                ) : (
                  <FiEyeOff className=" w-[19px] h-[19px] text-gray-900" />
                )}
              </div>
            </div>
            {submitted && !newPassword.passwordLama ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Password lama harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">Password Baru*</label>
            <div className="relative">
              <input
                id="passwordBaru"
                type={passwordShow ? "text" : "password"}
                className="w-full text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
                placeholder="Masukan Passsword Baru"
                onChange={handleInputPassword}
              />
              <div
                className="absolute flex items-center right-5 top-4 cursor-pointer"
                onClick={(e) => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? (
                  <FiEye className=" w-[19px] h-[19px] text-gray-900" />
                ) : (
                  <FiEyeOff className=" w-[19px] h-[19px] text-gray-900" />
                )}
              </div>
            </div>
            {submitted && !newPassword.passwordBaru ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Password baru harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">
              Konfirmasi Password Baru*
            </label>
            <div className="relative">
              <input
                id="konfirmasiPassword"
                type={passwordShow ? "text" : "password"}
                className="w-full text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
                placeholder="Masukan Konfirmasi Password Baru"
                onChange={handleInputPassword}
              />
              <div
                className="absolute flex items-center right-5 top-4 cursor-pointer"
                onClick={(e) => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? (
                  <FiEye className=" w-[19px] h-[19px] text-gray-900" />
                ) : (
                  <FiEyeOff className=" w-[19px] h-[19px] text-gray-900" />
                )}
              </div>
            </div>
            {submitted && !newPassword.konfirmasiPassword ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Konfirmasi password baru harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="h-[48px] bg-purple-700 hover:bg-purple-900 text-white rounded-2xl mt-5 font-medium duration-[1s]"
          >
            Simpan Perubahan
          </button>
        </form>
        <div className="sm:w-[24px] w-0" />
      </section>
    </div>
  );
};

export default SettingAccount;
