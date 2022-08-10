import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ProdukImage from "../components/ProdukImage";
import produkimage from "../assets/img/detailproduk-image.png";
import Image from "../assets/img/image_detailproduk.png";
import ModalDetailProduk from "../components/ModalDetailProduk";
import Arrowleft from "../assets/img/fi_arrow-left.svg";
import { Alert } from "antd";
import {
  getDetailProduct,
  getDetailProductStatus,
  getDetailDataProducts,
} from "../features/productSlice";
import {
  getAddOfferStatus,
  getBuyerOfferHistory,
  getBuyerOfferHistoryData,
  clearStatusOffer,
} from "../features/offerSlice";

import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { Helmet } from "react-helmet";

function DetailProduk() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  const { id } = useParams();
  const detailProduct = useSelector(getDetailDataProducts);
  const detailProductStatus = useSelector(getDetailProductStatus);
  const addOfferStatus = useSelector(getAddOfferStatus);
  const buyerOfferHistory = useSelector(getBuyerOfferHistoryData);
  console.log(addOfferStatus, "add offer status");
  console.log(detailProduct, "detail produk");
  console.log(buyerOfferHistory, "buyer offer");
  console.log(buyerOfferHistory);

  const [hasOffered, setHasOffered] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = () => {
    setIsOpen(!isOpen);
  };

  const onClose = (e) => {};

  //Mengecek jika buyer ini sudah pernah menawar produk ini
  const checkHasOffered = () => {
    let productOffered = buyerOfferHistory.filter(
      (item) =>
        item.productId === parseInt(id) &&
        (item.offerStatus === "Diminati" || item.offerStatus === "Diterima")
    );
    productOffered.length !== 0 ? setHasOffered(true) : setHasOffered(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearStatusOffer());
    if (user) {
      dispatch(getBuyerOfferHistory(user.userId));
      checkHasOffered();
    }
    dispatch(getDetailProduct(id));
  }, [dispatch, id]);

  console.log(hasOffered, "hasoffered");

  return (
    <div onLoad={checkHasOffered}>
      <Helmet>
        <title>Secondpedia | Jual Beli Bekas Berkualitas</title>
      </Helmet>
      <div className="hidden md:block">
        <NavigationBar />
      </div>

      {addOfferStatus === "success" ? (
        <Alert
          message="Harga tawaranmu berhasil dikirim ke penjual"
          type="success"
          closable
          onClose={onClose}
          className="w-[340px] sm:w-[520px] flex mx-auto text-center mt-24 sm:-mt-3 rounded-xl bg-[#73CA5C] px-6 py-4  text-sm font-medium z-50 fixed left-[50%] -translate-x-[50%]"
        />
      ) : (
        ""
      )}

      {detailProductStatus === "loading" ? (
        <div className="flex mx-auto mt-32 justify-center">
          <SyncLoader color="#7126B5" margin={2} size={12} />
        </div>
      ) : (
        <div>
          <div className="sm:flex sm:px-[236px] gap-[32px] mt-12 sm:mt-32 relative">
            <Link
              className="absolute top-[44px] left-[16px] z-50 bg-white rounded-full sm:hidden"
              to="/"
            >
              <img src={Arrowleft} alt="Arrowleft" />
            </Link>
            <div className="sm:w-[600px]">
              {detailProduct ? (
                <ProdukImage
                  imageDetail={[
                    detailProduct.url ? detailProduct.url : produkimage,
                    detailProduct.url2 ? detailProduct.url2 : produkimage,
                    detailProduct.url3 ? detailProduct.url3 : produkimage,
                    detailProduct.url4 ? detailProduct.url4 : produkimage,
                  ]}
                  idProduct={id}
                />
              ) : (
                <ProdukImage
                  imageDetail={[
                    produkimage,
                    produkimage,
                    produkimage,
                    produkimage,
                  ]}
                  idProduct={id}
                />
              )}
              <div className="container hidden sm:block ">
                <div className="rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.15)] p-5 mt-10 ">
                  <h1 className="pb-3 font-bold">Deskripsi</h1>
                  <p>
                    {detailProduct
                      ? detailProduct.productDescription
                      : "Deskripsi kosong"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[336px] px-4 sm:px-0 absolute sm:static top-[316px] z-20 sm:z-0">
              <div className="container flex w-full -mt-10 z-50 sm:mt-0 static bg-white rounded-2xl">
                <div className="rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.15)] p-5 w-full sm:w-auto">
                  <p className="font-semibold">
                    {detailProduct
                      ? detailProduct.productName
                      : "Produk name kosong"}
                  </p>
                  <p className="font-thin pt-2 text-gray-900">
                    {detailProduct
                      ? detailProduct.productCategory
                      : "Category kosong"}
                  </p>
                  <p className="text-sm font-semibold pt-4 sm:pb-8 ">
                    Rp{" "}
                    {detailProduct
                      ? detailProduct.productPrice
                      : "Price kosong"}
                  </p>
                  {/* ketika user login dan data user lengkap */}
                  {detailProduct &&
                  user &&
                  user.fullNameUser &&
                  user.fullNameUser !== null &&
                  user.address &&
                  user.address !== null &&
                  user.city &&
                  user.city !== null &&
                  user.phone &&
                  user.phone !== null &&
                  user.urlUser &&
                  user.urlUser !== null ? (
                    addOfferStatus === "success" ||
                    hasOffered ||
                    user.userId === detailProduct.userId ? (
                      <button
                        onClick={handleNav}
                        className="duration-[1s] w-[300px] rounded-2xl px-6 py-[14px] bg-gray-700 items-center text-white hidden sm:block "
                        disabled
                      >
                        {user.userId === detailProduct.userId
                          ? "Saya tertarik dan ingin nego"
                          : detailProduct.productStatus === "Sold"
                          ? "Produk sudah terjual"
                          : "Menunggu respon penjual"}
                      </button>
                    ) : (
                      <button
                        onClick={handleNav}
                        className="duration-[1s] w-[300px] rounded-2xl px-6 py-[14px] bg-purple-700 hover:bg-purple-900 items-center text-white hidden sm:block "
                      >
                        Saya tertarik dan ingin nego
                      </button>
                    )
                  ) : // ketika user login tapi data belum lengkap
                  detailProduct &&
                    user &&
                    (user.fullNameUser === null ||
                      user.address === null ||
                      user.city === null ||
                      user.phone === null ||
                      user.urlUser === null) ? (
                    <Link to={`/infoprofile/${user.userId}`}>
                      <button className="duration-[1s] w-[300px] rounded-2xl px-6 py-[14px] bg-purple-700 hover:bg-purple-900 items-center text-white hidden sm:block ">
                        Saya tertarik dan ingin nego
                      </button>
                    </Link>
                  ) : (
                    // ketika user belum login
                    <Link to={"/login"}>
                      <button className="duration-[1s] w-[300px] rounded-2xl px-6 py-[14px] bg-purple-700 hover:bg-purple-900 items-center text-white hidden sm:block ">
                        Saya tertarik dan ingin nego
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="container sm:mt-6 w-full">
                <div className="w-full bg-white h-[90px] mt-3 sm:mt-0 flex gap-1 mb-10 p-5 rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] sm:max-w-md">
                  <div className="rounded-xl h-[48px] w-[58px] overflow-hidden">
                    <img
                      src={detailProduct ? detailProduct.urlSeller : Image}
                      className="w-12 h-12 rounded-xl object-cover"
                      alt="sellerImage"
                    />
                  </div>
                  <div className="">
                    <p className="font-semibold">
                      {detailProduct ? detailProduct.username : "Nama Penjual"}
                    </p>
                    <p className="text-[10px] font-normal text-gray-900 pt-2">
                      {detailProduct ? detailProduct.city : "Jogja"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container block sm:hidden mt-[216px] sm:mt-0 px-4 ">
            <div className="border rounded-xl shadow-lg p-5 mt-10 ">
              <h1 className="pb-3 font-bold">Deskripsi</h1>
              <p>
                {detailProduct
                  ? detailProduct.productDescription
                  : "Deskrkipsi kosong"}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* ketika user login dan data sudah lengkap */}
            {detailProduct &&
            user &&
            user.fullNameUser &&
            user.fullNameUser !== null &&
            user.address &&
            user.address !== null &&
            user.city &&
            user.city !== null &&
            user.phone &&
            user.phone !== null &&
            user.urlUser &&
            user.urlUser !== null ? (
              addOfferStatus === "success" ||
              hasOffered ||
              user.userId === detailProduct.userId ? (
                <button
                  onClick={handleNav}
                  className="sm:ml-20 duration-[1s] w-[350px] rounded-2xl px-6 py-[14px] bg-gray-700 items-center text-white fixed bottom-5 sm:hidden z-40"
                  disabled
                >
                  {user.userId === detailProduct.userId
                    ? "Saya tertarik dan ingin nego"
                    : detailProduct.productStatus === "Sold"
                    ? "Produk sudah terjual"
                    : "Menunggu respon penjual"}
                </button>
              ) : (
                <button
                  onClick={handleNav}
                  className="sm:ml-20 duration-[1s] w-[350px] rounded-2xl px-6 py-[14px] bg-purple-700 hover:bg-purple-900 items-center text-white fixed bottom-5 sm:hidden z-40"
                >
                  Saya Tertarik dan ingin nego
                </button>
              )
            ) : // ketika user login dan data user belum lengkap
            detailProduct &&
              user &&
              (user.fullNameUser === null ||
                user.address === null ||
                user.city === null ||
                user.phone === null ||
                user.urlUser === null) ? (
              <button
                onClick={() => navigate(`/infoprofile/${user.userId}`)}
                className="sm:ml-20 duration-[1s] w-[350px] rounded-2xl px-6 py-[14px] bg-purple-700 hover:bg-purple-900 items-center text-white fixed bottom-5 sm:hidden z-40"
              >
                Saya Tertarik dan ingin nego
              </button>
            ) : (
              // ketika user belum login
              <button
                onClick={() => navigate("/login")}
                className="sm:ml-20 duration-[1s] w-[350px] rounded-2xl px-6 py-[14px] bg-purple-700 hover:bg-purple-900 items-center text-white fixed bottom-5 sm:hidden z-40"
              >
                Saya Tertarik dan ingin nego
              </button>
            )}
          </div>
          <ModalDetailProduk
            checkHasOffered={checkHasOffered}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            productId={detailProduct ? detailProduct.productId : "Id kosong"}
            productImage={detailProduct ? detailProduct.url : produkimage}
            productName={
              detailProduct ? detailProduct.productName : "Name kosong"
            }
            productPrice={
              detailProduct ? detailProduct.productPrice : "Price kosong"
            }
          />
        </div>
      )}
    </div>
  );
}

export default DetailProduk;
