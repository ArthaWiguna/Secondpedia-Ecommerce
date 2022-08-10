import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/img/Loginimage.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  userRegister,
  getStatus,
  getErorrMessage,
  getSuccesMessage,
} from "../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusRegister = useSelector(getStatus);
  const errorMessage = useSelector(getErorrMessage);
  const succesMessage = useSelector(getSuccesMessage);
  console.log(errorMessage);

  const [passwordShow, setPasswordShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  console.log(name, email, password);

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(
        userRegister({
          username: name,
          email: email,
          password: password,
          role: ["SELLER", "BUYER"],
        })
      );
    }
    setSubmitted(true);
  };

  useEffect(() => {
    statusRegister === "successRegister"
      ? setTimeout(() => navigate("/login"), 3000)
      : navigate("/register");
  }, [statusRegister, navigate]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block bg-register bg-no-repeat">
        <img classname="w-full h-full object-cover" src={LoginImg} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleRegister}
          className="max-w-[450px] w-full mx-auto p-8 px-8 rounded-2xl"
        >
          <h2 className="text-black text-2xl font-bold py-4">Daftar</h2>
          {errorMessage ? (
            <div
              class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span class="font-medium">{errorMessage}!</span> Change to another
              username or email
            </div>
          ) : succesMessage ? (
            <div
              class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span class="font-medium">{succesMessage}!</span> Login for enter
              the page.
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col text-black py-2">
            <label className="text-xs">Nama</label>
            <input
              id="name"
              className="rounded-2xl px-4 py-3 mt-2 text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm focus:border-transparent focus:ring-purple-900"
              placeholder="Nama Lengkap"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            {submitted && !name ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Nama lengkap harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col text-black py-2">
            <label className="text-xs">Email</label>
            <input
              id="email"
              className="rounded-2xl px-4 py-3 mt-2 text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm focus:border-transparent focus:ring-purple-900"
              placeholder="Contoh: johndee@gmail.com"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            {submitted && !email ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Email harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col text-black py-2">
            <label className="text-xs">Password</label>
            <div className="relative">
              <input
                id="password"
                className="rounded-2xl w-full px-4 py-3 mt-2 text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm focus:border-transparent focus:ring-purple-900"
                placeholder="Masukkan Password"
                type={passwordShow ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute flex items-center right-5 top-5 cursor-pointer"
                onClick={(e) => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? (
                  <FiEye className=" w-[19px] h-[19px] text-gray-900" />
                ) : (
                  <FiEyeOff className=" w-[19px] h-[19px] text-gray-900" />
                )}
              </div>
              {submitted && !password ? (
                <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                  Password harus diisi !
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            type="submit"
            className="rounded-xl w-full my-5 py-3 bg-purple-700 font-bold  hover:bg-purple-900 text-white duration-[1s]"
          >
            Daftar
          </button>
          <div>
            <p className="text-black text-center p-4">
              Sudah punya akun?{" "}
              <Link to={"/login"}>
                <button className="text-purple-700 font-bold">
                  Masuk di sini
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
