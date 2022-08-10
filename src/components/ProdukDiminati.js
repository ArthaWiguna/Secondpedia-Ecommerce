import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerOfferHistory,
  getSellerOfferHistoryStatus,
  getSellerOfferHistoryData,
} from "../features/offerSlice";
import productImage from "../assets/img/notifImage.png";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import EmptyData from "../components/EmptyData";

const ProdukDiminati = (
  width,
  position,
  shadow,
  rounded,
  paddingX,
  marginT
) => {
  const dispatch = useDispatch();

  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const sellerOfferHistory = useSelector(getSellerOfferHistoryData);
  const sellerOfferHistoryStatus = useSelector(getSellerOfferHistoryStatus);

  useEffect(() => {
    dispatch(getSellerOfferHistory({ userId: user.userId }));
  }, [dispatch, user.userId]);

  return (
    <div
      className={`py-4 bg-white md:px-[${paddingX}] md:mt-[${marginT}] rounded-${rounded} shadow-[${shadow}] [&>div:last-child>div>div]:border-none`}
    >
      {sellerOfferHistoryStatus === "loading" ? (
        <div className="flex mx-auto mt-32 justify-center">
          <SyncLoader color="#7126B5" margin={2} size={12} />
        </div>
      ) : sellerOfferHistory.length === 0 ? (
        <div>
          <EmptyData message="Belum ada produkmu yang diminati nih" />
        </div>
      ) : (
        sellerOfferHistory &&
        sellerOfferHistory.map((item) => (
          <div className={item.userId === user.userId ? "hidden" : "block"}>
            <div className="cursor-pointer">
              <div className="px-4 pt-4">
                <div
                  className={`flex sm:gap-12 w-${width} justify-between border-b border-gray-500 pb-4`}
                >
                  <div className="flex gap-2 sm:gap-6">
                    <div>
                      {item.url ? (
                        <img
                          src={item.url}
                          alt="productImage"
                          className="w-12 sm:w-28 h-12 sm:h-full object-cover rounded-xl"
                        />
                      ) : (
                        <img
                          src={productImage}
                          alt="productImage"
                          className="w-12 sm:w-28 h-12 sm:h-full object-cover rounded-xl"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-900">
                        Penawaran produk
                      </p>
                      <h3 className="mt-1 text-sm font-normal text-black">
                        {item.productName}
                      </h3>
                      <h3 className="mt-1 text-sm font-normal text-black">
                        Rp {item.productPrice}
                      </h3>
                      <h3 className="mt-1 text-sm font-normal text-black">
                        Ditawar Rp {item.offerPrice}
                      </h3>
                    </div>
                  </div>
                  <div className="hidden sm:block hover:text-purple-700">
                    <p className="text-sm hover:text-purple-700">
                      {item.offerStatus === "Diminati"
                        ? "Menunggu Respon"
                        : item.offerStatus === "Diterima"
                        ? "Penawaran Diterima"
                        : "Penawaran Ditolak"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <div className="flex gap-2">
                      <p className="text-[10px] text-gray-900">
                        {" "}
                        {moment
                          .utc(item.localDateTime)
                          .local()
                          .format("MMMM DD, hh:mm")}
                      </p>
                    </div>
                    <Link to={`/infopenawar/${item.productId}/${item.offerId}`}>
                      <button className="bg-purple-700 hover:bg-purple-900 px-4 py-2 text-white text-sm rounded-2xl duration-[1s]">
                        Lihat Rincian
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProdukDiminati;
