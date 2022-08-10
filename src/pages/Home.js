import React, { useEffect } from "react";
import "../assets/css/home.css";
import { Tabs } from "antd";
import Banner from "../components/Banner";
import CardProduct from "../components/CardProduct";
import { FiSearch, FiPlus } from "react-icons/fi";
import { Pagination } from "antd";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getTotalPages,
  getCurrentPage,
  handleCurrentPage,
  handleSearchQuery,
  getSearchQuery,
  getAllDataProducts,
  getAllProductStatus,
  getProductBySeller,
  getSellerProducts,
} from "../features/productSlice";

import { SyncLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const { TabPane } = Tabs;

const Home = () => {
  // filter page home
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("");
  console.log(category, page);

  // golabal state
  const dispatch = useDispatch();
  const allProducts = useSelector(getAllDataProducts);
  console.log(allProducts, "di home");
  const getProductStatus = useSelector(getAllProductStatus);
  console.log(getProductStatus);
  const totalPages = useSelector(getTotalPages);
  console.log(totalPages);
  const currentPage = useSelector(getCurrentPage);
  console.log(currentPage);
  const searchQuery = useSelector(getSearchQuery);
  console.log(searchQuery);
  const sellerProducts = useSelector(getSellerProducts);
  console.log(sellerProducts);

  // data user setelah login
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  console.log(user);

  // mengambil value tab kategori active
  const onChange = (key) => {
    dispatch(handleSearchQuery(""));
    setCategory(key);
    setPage(1);
  };

  // mengambil value dari pagination yang active
  const handlePaginationChange = (page) => {
    setPage(page);
    dispatch(handleCurrentPage(page));
  };

  useEffect(() => {
    if (searchQuery === "") {
      dispatch(
        getAllProducts({
          productName: "",
          productCategory: category,
          page: page,
          size: 18,
        })
      );
    } else {
      dispatch(
        getAllProducts({
          productName: searchQuery,
          productCategory: "",
          page: page,
          size: 18,
        })
      );
    }
    dispatch(getProductBySeller(user.userId));
  }, [dispatch, category, page]);

  return (
    <div>
      <Helmet>
        <title>Secondpedia | Jual Beli Bekas Berkualitas</title>
      </Helmet>
      <NavigationBar />
      <div className="banner">
        <Banner />
      </div>
      <div className="w-full md:px-[136px] mt-10 min-h-screen">
        <div className="px-4 mt-[228px] md:mt-2">
          <div className="category-product">
            <h3 className="text-base font-bold -mb-5 md:mb-4">
              Telusuri Category
            </h3>

            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane
                tab={
                  <span className="flex gap-2">
                    <FiSearch />
                    Semua
                  </span>
                }
                key=""
              >
                {getProductStatus === "loading" ? (
                  <div className="flex sm:mt-7 mx-auto justify-center">
                    <SyncLoader color="#7126B5" margin={2} size={12} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 justify-between gap-3 md:mt-2">
                    {allProducts &&
                      allProducts.map((item) => (
                        <CardProduct
                          cardWidth={"182px"}
                          key={item.productId}
                          data={item}
                        />
                      ))}
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={
                  <span className="flex gap-2">
                    <FiSearch />
                    Hobi
                  </span>
                }
                key="Hobi"
              >
                {getProductStatus === "loading" ? (
                  <div className="flex sm:mt-7 mx-auto justify-center">
                    <SyncLoader color="#7126B5" margin={2} size={12} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 justify-between gap-3 md:mt-2">
                    {allProducts &&
                      allProducts.map((item) => (
                        <CardProduct
                          cardWidth={"182px"}
                          key={item.productId}
                          data={item}
                        />
                      ))}
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={
                  <span className="flex gap-2">
                    <FiSearch />
                    Kendaraan
                  </span>
                }
                key="Kendaraan"
              >
                {getProductStatus === "loading" ? (
                  <div className="flex sm:mt-7 mx-auto justify-center">
                    <SyncLoader color="#7126B5" margin={2} size={12} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 justify-between gap-3 md:mt-2">
                    {allProducts &&
                      allProducts.map((item) => (
                        <CardProduct
                          cardWidth={"182px"}
                          key={item.productId}
                          data={item}
                        />
                      ))}
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={
                  <span className="flex gap-2">
                    <FiSearch />
                    Fashion
                  </span>
                }
                key="Fashion"
              >
                {getProductStatus === "loading" ? (
                  <div className="flex sm:mt-7 mx-auto justify-center">
                    <SyncLoader color="#7126B5" margin={2} size={12} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 justify-between gap-3 md:mt-2">
                    {allProducts &&
                      allProducts.map((item) => (
                        <CardProduct
                          cardWidth={"182px"}
                          key={item.productId}
                          data={item}
                        />
                      ))}
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={
                  <span className="flex gap-2">
                    <FiSearch />
                    Elektronik
                  </span>
                }
                key="Elektronik"
              >
                {getProductStatus === "loading" ? (
                  <div className="flex sm:mt-7 mx-auto justify-center">
                    <SyncLoader color="#7126B5" margin={2} size={12} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 justify-between gap-3 md:mt-2">
                    {allProducts &&
                      allProducts.map((item) => (
                        <CardProduct
                          cardWidth={"182px"}
                          key={item.productId}
                          data={item}
                        />
                      ))}
                  </div>
                )}
              </TabPane>
              <TabPane
                tab={
                  <span className="flex gap-2">
                    <FiSearch />
                    Kesehatan
                  </span>
                }
                key="Kesehatan"
              >
                {getProductStatus === "loading" ? (
                  <div className="flex sm:mt-7 mx-auto justify-center">
                    <SyncLoader color="#7126B5" margin={2} size={12} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 justify-between gap-3 md:mt-2">
                    {allProducts &&
                      allProducts.map((item) => (
                        <CardProduct
                          cardWidth={"182px"}
                          key={item.productId}
                          data={item}
                        />
                      ))}
                  </div>
                )}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <Pagination
        className="mt-12 pb-28 flex justify-center"
        defaultCurrent={currentPage}
        current={currentPage}
        total={totalPages + "0"}
        onChange={handlePaginationChange}
      />

      {sellerProducts && sellerProducts.length >= 4 ? (
        <button className="bg-purple-500 pointer-events-none px-7 py-4 flex items-center gap-2 rounded-xl text-white text-sm font-normal mt-4 mx-auto fixed bottom-7 left-[50%] -translate-x-[50%] shadow-lg shadow-purple-500/50 hover:shadow-purple/40]">
          <FiPlus className="text-white text-xl font-bold" />
          Jual
        </button>
      ) : user ? (
        <Link
          to={
            user.fullNameUser &&
            user.fullNameUser !== "" &&
            user.address &&
            user.address !== "" &&
            user.city &&
            user.city !== "" &&
            user.phone &&
            user.phone !== "" &&
            user.urlUser &&
            user.urlUser !== ""
              ? `/infoproduk`
              : `/infoprofile/${user.userId}`
          }
        >
          <button className="bg-purple-700 px-7 py-4 flex items-center gap-2 rounded-xl text-white text-sm font-normal mt-4 mx-auto fixed bottom-7 left-[50%] -translate-x-[50%] shadow-lg shadow-purple-500/50 hover:bg-purple-900 duration-[0.5s]">
            <FiPlus className="text-white text-xl font-bold" />
            Jual
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
