import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSellerProductSold,
  getSellerProductSoldData,
  getSellerProductSoldStatus,
} from "../features/productSlice";
import { SyncLoader } from "react-spinners";
import EmptyData from "../components/EmptyData";
import { Link } from "react-router-dom";

export const ProdukTerjual = () => {
  const dispatch = useDispatch();

  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const sellerProductSold = useSelector(getSellerProductSoldData);
  console.log(sellerProductSold);
  const sellerProductSoldStatus = useSelector(getSellerProductSoldStatus);
  console.log(sellerProductSoldStatus);

  useEffect(() => {
    dispatch(getSellerProductSold({ userId: user.userId }));
  }, [dispatch, user.userId]);

  return (
    <div>
      {sellerProductSoldStatus === "loading" ? (
        <div className="flex mx-auto mt-32 justify-center">
          <SyncLoader color="#7126B5" margin={2} size={12} />
        </div>
      ) : sellerProductSold.length === 0 ? (
        <div>
          <EmptyData message="Belum ada produkmu yang terjual nih" />
        </div>
      ) : (
        <div className="px-4 pt-4 mb-4">
          {sellerProductSold &&
            sellerProductSold.map((item) => (
              <Link to={`/detailproduk/${item.productId}`}>
                <div
                  className={`flex gap-12 w-full justify-between border-b border-gray-500 pb-4 mb-4 cursor-pointer`}
                >
                  <div className="flex gap-6">
                    <div>
                      <img
                        src={item.url}
                        alt="productImage"
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-900">
                        Transaksi produk
                      </p>
                      <h3 className="mt-1 text-sm font-normal text-black">
                        {item.productName}
                      </h3>
                      <h3 className="mt-1 text-sm font-normal text-black">
                        Rp {item.productPrice}
                      </h3>
                      {/* <h3 className="mt-1 text-sm font-normal text-black">
                      Ditawar Rp {item.offerPrice}
                    </h3> */}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <p className="text-[10px] text-gray-900">
                      Berhasil terjual
                    </p>
                    <div className="w-2 h-2 rounded bg-purple-700 mt-1"></div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};
