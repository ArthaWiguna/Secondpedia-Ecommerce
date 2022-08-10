import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/img/Loginimage.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, getStatus, getErorrMessage } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusLogin = useSelector(getStatus);
  const errorMessage = useSelector(getErorrMessage);

  console.log(statusLogin, "status");
  console.log(errorMessage, "error message");

  const [passwordShow, setPasswordShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  console.log(account);

  const handleInputAccount = (e) => {
    setAccount({
      ...account,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (account.email && account.password) {
      dispatch(userLogin(account));
    }
    setSubmitted(true);
  };

  useEffect(() => {
    statusLogin === "successLogin"
      ? navigate("/daftarJual")
      : navigate("/login");
  }, [statusLogin, navigate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block ">
        <img className="object-cover w-full h-full" alt="img" src={LoginImg} />
      </div>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleLogin}
          className="max-w-[450px] w-full mx-auto p-8 px-8 rounded-2xl"
        >
          <h2 className="text-black text-2xl font-bold py-4">Masuk</h2>
          {errorMessage ? (
            <div
              class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span class="font-medium">{errorMessage}!</span> Change to the
              correct email and password.
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col text-black py-2">
            <label className="text-xs">Email</label>
            <input
              id="email"
              className="rounded-2xl px-4 py-3 mt-2 text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm focus:border-transparent focus:ring-purple-900"
              placeholder="Contoh: johndee@gmail.com"
              type="text"
              value={account.email}
              onChange={handleInputAccount}
            />
            {submitted && !account.email ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Email harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col text-black py-2 ">
            <label className="text-xs">Password</label>
            <div className="relative">
              <input
                id="password"
                className="rounded-2xl w-full px-4 py-3 mt-2 text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm focus:border-transparent focus:ring-purple-900"
                placeholder="Masukkan Password"
                type={passwordShow ? "text" : "password"}
                value={account.password}
                onChange={handleInputAccount}
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
            </div>
            {submitted && !account.password ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Password harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="rounded-2xl w-full my-5 py-3 bg-purple-700 font-bold hover:bg-purple-900 text-white duration-[1s]"
          >
            Masuk
          </button>

          <div>
            <p className="text-black text-center p-4">
              Belum punya akun?{" "}
              <Link to={"/register"}>
                <button className="text-purple-700 font-bold">
                  Daftar di sini
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
