import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Arrowleft from "../assets/img/fi_arrow-left.svg";
import NavigationBar from "../components/NavigationBar";
import Profile from "../assets/img/profile_infopenawar.png";
import Card from "../assets/img/card_infopenawar.png";
import ModalWhatsapp from "../components/ModalWhatsapp";
import { FaWhatsapp } from "react-icons/fa";
import ModalStatus from "../components/ModalStatus";
import moment from "moment";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerOfferDetail,
  getSellerOfferDetailData,
  getSellerOfferDetailStatus,
  sellerAcceptedOffer,
  getSellerAcceptedOfferStatus,
  sellerRejectedOffer,
  getSellerRejectedOfferStatus,
  clearStatusOffer,
} from "../features/offerSlice";
import {
  clearStatusProduct,
  getUpdateProductToSoldStatus,
  getDetailProduct,
  getDetailDataProducts,
} from "../features/productSlice";
import { getUserNotification } from "../features/notificationSlice";
import { SyncLoader } from "react-spinners";
import { Helmet } from "react-helmet";

function InfoPenawar() {
  const dispatch = useDispatch();
  // modal
  const [nav, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // offer data
  const { idProduk, idPenawaran } = useParams();
  console.log(idProduk, idPenawaran);

  // global state
  const detailOffer = useSelector(getSellerOfferDetailData);
  const getDetailOfferStatus = useSelector(getSellerOfferDetailStatus);
  const acceptedOfferStatus = useSelector(getSellerAcceptedOfferStatus);
  const rejectedOfferStatus = useSelector(getSellerRejectedOfferStatus);
  const updateProductSoldStatus = useSelector(getUpdateProductToSoldStatus);
  const detailProduct = useSelector(getDetailDataProducts);

  console.log(detailOffer.offerStatus);
  console.log(acceptedOfferStatus);
  console.log(rejectedOfferStatus);
  console.log(detailProduct);

  const handleAcceptedOffer = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sellerAcceptedOffer(idPenawaran));
      setNav(!nav);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectedOffer = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sellerRejectedOffer(idPenawaran));
    } catch (error) {
      console.log(error);
    }
  };

  function openModal() {
    setIsOpen(!isOpen);
  }

  const onClose = (e) => {};

  useEffect(() => {
    dispatch(clearStatusOffer());
    dispatch(clearStatusProduct());
    dispatch(
      getSellerOfferDetail({
        offerId: idPenawaran,
      })
    );

    dispatch(getUserNotification());
    dispatch(getDetailProduct(idProduk));
  }, [dispatch, idPenawaran, idProduk]);

  return (
    <div>
      <Helmet>
        <title>Secondpedia | Seller Penawaran</title>
      </Helmet>
      <NavigationBar />
      {updateProductSoldStatus === "success" ? (
        <Alert
          message={"Status produk berhasil diperbarui"}
          type="success"
          closable
          onClose={onClose}
          className="w-[340px] sm:w-[500px] flex text-center mx-auto mt-2 sm:-mt-3 rounded-xl bg-[#73CA5C] px-6 py-4  text-sm font-medium z-50 fixed left-[50%] -translate-x-[50%]"
        />
      ) : (
        ""
      )}
      {rejectedOfferStatus === "success" ? (
        <Alert
          message={"Transaksi berhasil dibatalkan"}
          type="success"
          closable
          onClose={onClose}
          className="w-[340px] sm:w-[500px] flex text-center mx-auto mt-2 sm:-mt-3 rounded-xl bg-[#73CA5C] px-6 py-4  text-sm font-medium z-50 fixed left-[50%] -translate-x-[50%]"
        />
      ) : (
        ""
      )}
      {detailOffer.length === 0 || getDetailOfferStatus === "loading" ? (
        <div className="flex mx-auto mt-32 justify-center">
          <SyncLoader color="#7126B5" margin={2} size={12} />
        </div>
      ) : (
        <section className="flex justify-center py-[16px] mt-8 sm:mt-28">
          <Link className="sm:block hidden" to="/daftarJual">
            <img src={Arrowleft} alt="img" />
          </Link>
          <div className="sm:w-[568px] sm:mx-[78px] duration-[1s] w-[328px]">
            <div className="h-[80px] border rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] flex items-center p-[16px] mb-[24px]">
              <div className="rounded-xl h-[48px] w-[58px]">
                <img
                  className="w-12 h-12 object-cover rounded-xl"
                  src={
                    detailOffer.length !== 0 && detailOffer.urlUser
                      ? detailOffer.urlUser
                      : Profile
                  }
                  alt="buyerProfile"
                  width={48}
                  height={48}
                />
              </div>
              <div className="h-full w-full px-[16px] py-[3px] flex flex-col justify-between">
                <p className="text-sm font-medium">
                  {detailOffer.length !== 0
                    ? detailOffer.username
                    : "Nama Pembeli"}
                </p>
                <p className="text-[10px] leading-[14px] text-gray-900">
                  {detailOffer.length !== 0 && detailOffer.city
                    ? detailOffer.city
                    : "Jogja"}
                </p>
              </div>
            </div>
            <p className="my-6 text-sm font-medium">
              Daftar Produkmu yang Ditawar
            </p>

            <div className="h-[155px] pb-4 flex flex-col justify-between border-b border-b-gray-700">
              <div className="flex">
                <div className="Profile rounded-xl h-[48px] w-[58px] overflow-hidden flex items-center justify-center">
                  {detailOffer.length !== 0 ? (
                    <img
                      src={detailOffer.url ? detailOffer.url : Card}
                      alt="img"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <img
                      src={Card}
                      alt="img"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  )}
                </div>
                <div className="duration-[1s] w-full pl-[16px]">
                  <div className="flex justify-between">
                    <p className="text-[10px] leading-[14px] font-normal text-gray-900">
                      Penawaran Produk
                    </p>
                    {detailOffer.length !== 0 ? (
                      <p className="text-[10px] leading-[14px] font-normal text-gray-900">
                        {" "}
                        {moment
                          .utc(detailOffer.localDateTime)
                          .local()
                          .format("MMMM DD, hh:mm")}
                      </p>
                    ) : (
                      <p className="text-[10px] leading-[14px] font-normal text-gray-900">
                        2 April, 14:04
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-normal mt-1">
                    {detailOffer.length !== 0
                      ? detailOffer.productName
                      : "Jam Tangan"}
                  </p>
                  <p className="text-sm font-normal mt-1">
                    Rp{" "}
                    {detailOffer.length !== 0
                      ? detailOffer.productPrice
                      : 200000}
                  </p>
                  <p className="text-sm font-normal mt-1">
                    Ditawar Rp{" "}
                    {detailOffer.length !== 0 ? detailOffer.offerPrice : 100000}
                  </p>
                </div>
              </div>
              <div>
                {acceptedOfferStatus === "success" ||
                detailOffer.offerStatus === "Diterima" ? (
                  <div
                    className={
                      updateProductSoldStatus === "success" ||
                      detailProduct.productStatus === "Sold"
                        ? `hidden`
                        : `sm:justify-end duration-[1s] flex justify-between`
                    }
                  >
                    <button
                      onClick={openModal}
                      className="w-[156px] h-[36px] border-2 rounded-2xl border-purple-700 hover:border-purple-900 flex justify-center items-center text-sm font-medium"
                    >
                      Status
                    </button>
                    <a href="https://wa.me/+085232723635" target="blank">
                      <button className="sm:ml-5 w-[156px] h-[36px] border-2 rounded-2xl bg-purple-700 hover:bg-purple-900 flex justify-center items-center text-sm font-medium text-white duration-[1s] ">
                        Hubungi di <FaWhatsapp className="ml-2" />
                      </button>
                    </a>

                    <ModalStatus
                      productId={idProduk}
                      offerId={idPenawaran}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                    <ModalWhatsapp
                      offerId={idPenawaran}
                      nav={nav}
                      setNav={setNav}
                      buyerImage={
                        detailOffer.urlUser ? detailOffer.urlUser : Profile
                      }
                      city={detailOffer.city ? detailOffer.city : "Jogja"}
                      username={detailOffer.username}
                      productName={detailOffer.productName}
                      productPrice={detailOffer.productPrice}
                      offerPrice={detailOffer.offerPrice}
                      productImage={detailOffer.url ? detailOffer.url : Card}
                    />
                  </div>
                ) : (
                  <div>
                    {rejectedOfferStatus === "success" ||
                    detailOffer.offerStatus === "Ditolak" ? (
                      <p className="italic text-gray-900 text-end mt-6 sm:mt-0">
                        Trasnsaksi Dibatalkan, <br /> Anda telah menolak tawaran
                        ini
                      </p>
                    ) : (
                      <div className="sm:justify-end duration-[1s] flex justify-between">
                        <button
                          onClick={handleRejectedOffer}
                          className="w-[156px] h-[36px] border-2 rounded-2xl border-purple-700 hover:border-purple-900 flex justify-center items-center text-sm font-medium"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={handleAcceptedOffer}
                          className="sm:ml-5 w-[156px] h-[36px] border-2 rounded-2xl bg-purple-700 hover:bg-purple-900 flex justify-center items-center text-sm font-medium text-white duration-[1s]"
                        >
                          Terima
                        </button>
                        <ModalWhatsapp
                          offerId={idPenawaran}
                          nav={nav}
                          setNav={setNav}
                          username={detailOffer.username}
                          productName={detailOffer.productName}
                          productPrice={detailOffer.productPrice}
                          offerPrice={detailOffer.offerPrice}
                          productImage={
                            detailOffer.url ? detailOffer.url : Card
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default InfoPenawar;
