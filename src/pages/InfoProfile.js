import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  detailUser,
  userEdit,
  getuserUpdateStatus,
  clearStatusUpdateProfile,
} from "../features/userSlice";
import { Link, useParams } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { AiOutlineCamera } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import { Alert } from "antd";
import { Helmet } from "react-helmet";
import Arrowleft from "../assets/img/fi_arrow-left.svg";
import NavigationBar from "../components/NavigationBar";

const InfoProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  let nama = null;
  const getUser = useSelector(detailUser);
  const userUpdateStatus = useSelector(getuserUpdateStatus);
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const maxNumber = 1;

  console.log(getUser);
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id, userUpdateStatus]);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  if (getUser.fullNameUser == null || undefined) {
    nama = getUser.username;
  } else {
    nama = getUser.fullNameUser;
  }

  const onClose = (e) => {
    dispatch(clearStatusUpdateProfile());
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = new FormData();
    data.append("userId", id);
    data.append(
      "full_name_user",
      username === "" ? getUser.username : username
    );
    data.append("address", address === "" ? getUser.address : address);
    data.append("city", city === "" ? getUser.city : city);
    data.append("phone", phone === "" ? getUser.phone : phone);
    data.append("users_image", images.length === 0 ? "" : images[0].file);

    try {
      if (
        (username || getUser.username || getUser.fullNameUser) &&
        (address || getUser.address) &&
        (city || getUser.city) &&
        (phone || getUser.phone) &&
        images.length !== 0
      ) {
        let response = await dispatch(
          userEdit({
            data: data,
          })
        );
        console.log(response, "berhasil");
      }
    } catch (error) {
      console.error(error.message, "gagal");
    }
  };

  // option
  let render;
  if (getUser.city) {
    render = (
      <option defaultValue={getUser.city} selected>
        {getUser.city}
      </option>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Secondpedia | Profile </title>
      </Helmet>
      <NavigationBar />
      {userUpdateStatus === "success" ? (
        <Alert
          message="Data pengguna berhasil diperbarui"
          type="success"
          closable
          onClose={onClose}
          className="w-[340px] sm:w-[500px] flex text-center mx-auto mt-2 sm:-mt-3 rounded-xl bg-[#73CA5C] px-6 py-4  text-sm font-medium z-50 fixed left-[50%] -translate-x-[50%]"
        />
      ) : (
        ""
      )}

      <section className="flex justify-center py-6 mt-8 sm:mt-28">
        <Link className="sm:block hidden" to="/">
          <img src={Arrowleft} alt="img" />
        </Link>
        <form
          className="sm:mx-[78px] sm:w-[568px] w-[328px] flex flex-col justify-between duration-[1s] "
          onSubmit={handleEditProfile}
        >
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
              <div>
                <div className="w-full flex items-center justify-center ">
                  <div
                    className="w-[96px] h-[96px] bg-purple-100 rounded-xl flex items-center justify-center mb-3 cursor-pointer overflow-hidden"
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {getUser.urlUser !== null ? (
                      <img src={getUser.urlUser} alt="" />
                    ) : (
                      <AiOutlineCamera className="text-purple-700 text-2xl" />
                    )}
                  </div>
                </div>
                {submitted && images.length === 0 ? (
                  <p className="text-[#FA2C5A] text-xs mt-1 text-center">
                    Foto harus diisi kembali !
                  </p>
                ) : (
                  ""
                )}
                <div className="flex mb-3">
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="w-[96px] h-[96px] overflow-hidden flex items-center justify-center cursor-pointer mr-3"
                    >
                      <div
                        onClick={() => onImageRemove(index)}
                        className="absolute hover:bg-black opacity-30 w-[96px] h-[96px]"
                      />
                      <img
                        src={image["data_url"]}
                        alt=""
                        width="100"
                        className="rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">Nama*</label>
            <input
              type="text"
              className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
              defaultValue={nama}
              name="full_name_user"
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
            {submitted &&
            username === "" &&
            getUser.username === null &&
            getUser.fullNameUser === null ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Username harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">Kota*</label>
            <select
              className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
              defaultValue={getUser.city}
              onChange={(e) => setCity(e.target.value)}
              id="city"
            >
              {render}
              <option selected hidden>
                Pilih kota
              </option>
              <option defaultValue="jakarta">Jakarta</option>
              <option defaultValue="bandung">Bandung</option>
              <option defaultValue="surabaya">Surabaya</option>
              <option defaultValue="bali">Semarang</option>
              <option defaultValue="jakarta">Bali</option>
              <option defaultValue="bandung">Yogyakarta</option>
              <option defaultValue="surabaya">Medan</option>
              <option defaultValue="bali">Palembang</option>
              <option defaultValue="jakarta">Padang</option>
              <option defaultValue="bandung">Lampung</option>
              <option defaultValue="surabaya">Pontianak</option>
              <option defaultValue="bali">Banjarmasin</option>
            </select>
            {submitted && city === "" && getUser.city === null ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Kota harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">Alamat*</label>
            <textarea
              type="textarea"
              placeholder="Contoh Jl Ikan Hiu 33"
              className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[80px] px-4 text-xs pt-3 focus:border-transparent focus:ring-purple-900"
              defaultValue={getUser.address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
            />
            {submitted && address === "" && getUser.address === null ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                Alamat harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 font-medium">No Handphone*</label>
            <input
              type="text"
              placeholder="Contoh: +628123456789"
              className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
              defaultValue={getUser.phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
            />
            {submitted && phone === "" && getUser.phone === null ? (
              <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                No handphone harus diisi !
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="h-[48px]  bg-purple-700 hover:bg-purple-900 text-white rounded-2xl mt-5 font-medium"
          >
            {userUpdateStatus === "loading" ? (
              <div className="flex mx-auto justify-center">
                <BeatLoader color="#ffffff" margin={4} size={12} />
              </div>
            ) : (
              "Simpan"
            )}
          </button>
        </form>
        <div className="sm:w-[24px] w-0" />
      </section>
    </div>
  );
};

export default InfoProfile;
