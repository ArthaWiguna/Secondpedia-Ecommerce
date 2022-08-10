import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAllNotificationRead,
  getUserNotification,
  getUserNotificationData,
  updateUserNotification,
} from "../features/notificationSlice";

import moment from "moment";
import EmptyData from "./EmptyData";

const ModalNotifikasi = ({
  width,
  position,
  shadow,
  rounded,
  paddingX,
  marginT,
}) => {
  const dispatch = useDispatch();

  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const [trigerNotification, setTrigerNotification] = useState(false);
  const userNotification = useSelector(getUserNotificationData);

  console.log(userNotification);

  const handleUpdateReadStatus = async (notifId) => {
    console.log(notifId);
    try {
      await dispatch(updateUserNotification({ notifId: notifId }));
      setTrigerNotification(!trigerNotification);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getUserNotification({ userId: user.userId }));
    dispatch(checkAllNotificationRead());
  }, [dispatch, user.userId, trigerNotification]);

  return (
    <div
      className={`notification py-4 sm:max-h-[271px] sm:w-[414px] bg-white md:px-[${paddingX}] md:mt-[${marginT}] rounded-${rounded} shadow-[${shadow}]  sm:overflow-scroll`}
    >
      {userNotification.length === 0 ? (
        <div>
          <EmptyData message="Belum ada notifikasi nih" imageWidth={"100px"} />
        </div>
      ) : (
        <div className="[&>div:last-child]:border-none">
          {userNotification &&
            userNotification.map((item) => (
              <div onClick={() => handleUpdateReadStatus(item.notifId)}>
                <Link
                  to={
                    item.title.includes("Anda mendapat tawaran")
                      ? `/infopenawar/${item.productId}/${item.offerId}`
                      : `/detailproduk/${item.productId}`
                  }
                >
                  <div className="hover:bg-gray-500 cursor-pointer">
                    <div className="px-4 pt-4">
                      <div
                        className={`flex gap-12 sm:gap-4 w-${width} justify-between border-b border-gray-500 pb-4`}
                      >
                        <div className="flex gap-4">
                          <div>
                            <img
                              src={item.url}
                              alt="productImage"
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-900">
                              {item.title.includes("Anda mendapat tawaran")
                                ? "Penawaran produk"
                                : item.title.includes("Product Diterbitkan")
                                ? "Berhasil di terbitkan"
                                : item.title.includes("Tawaran Product")
                                ? "Penawaran anda"
                                : ""}
                            </p>
                            <h3 className="mt-1 text-sm font-normal text-black">
                              {item.productName}
                            </h3>
                            {/* Buyer Notif */}
                            {item.title.includes("Tawaran Product") &&
                            item.offerStatus &&
                            item.offerStatus === "Diterima" ? (
                              <div>
                                <h3 className="mt-1 text-sm font-normal text-black line-through">
                                  Rp {item.productPrice}
                                </h3>
                                <div>
                                  <h3 className="mt-1 text-sm font-normal text-black">
                                    Berhasil Ditawar Rp {item.offerPrice}
                                  </h3>
                                  <p className="text-[10px] text-gray-900">
                                    Kamu akan dihubungi penjual via whatsapp
                                  </p>
                                </div>
                              </div>
                            ) : item.title.includes("Tawaran Product") &&
                              item.offerStatus &&
                              item.offerStatus === "Ditolak" ? (
                              <div>
                                <h3 className="mt-1 text-sm font-normal text-black">
                                  Rp {item.productPrice}
                                </h3>
                                <div>
                                  <h3 className="mt-1 text-sm font-normal text-black">
                                    Penawaran Rp {item.offerPrice} ditolak
                                  </h3>
                                </div>
                              </div>
                            ) : item.title.includes("Tawaran Product") &&
                              item.offerStatus &&
                              item.offerStatus === "Diminati" ? (
                              <div>
                                <h3 className="mt-1 text-sm font-normal text-black">
                                  Rp {item.productPrice}
                                </h3>
                                <div>
                                  <h3 className="mt-1 text-sm font-normal text-black">
                                    Ditawar Rp {item.offerPrice}
                                  </h3>
                                </div>
                              </div>
                            ) : // Seller Notif
                            item.title.includes("Product Diterbitkan") ? (
                              <div>
                                <h3 className="mt-1 text-sm font-normal text-black">
                                  Rp {item.productPrice}
                                </h3>
                              </div>
                            ) : item.title.includes("Anda mendapat tawaran") ? (
                              <div>
                                <h3 className="mt-1 text-sm font-normal text-black">
                                  Rp {item.productPrice}
                                </h3>
                                <div>
                                  <h3 className="mt-1 text-sm font-normal text-black">
                                    Ditawar Rp {item.offerPrice}
                                  </h3>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <p className="text-[10px] text-gray-900">
                            {" "}
                            {moment
                              .utc(item.localDateTime)
                              .local()
                              .format("MMMM DD, hh:mm")}
                          </p>
                          {item.isRead === false ? (
                            <div className="w-2 h-2 rounded bg-[#FA2C5A] mt-1"></div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ModalNotifikasi;
