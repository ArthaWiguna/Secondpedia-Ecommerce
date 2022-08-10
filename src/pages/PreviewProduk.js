import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ProdukImage from "../components/ProdukImage";
import Arrowleft from "../assets/img/fi_arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  getAddProductStatus,
  getUpdateProductStatus,
} from "../features/productSlice";
import { getUserById, detailUser } from "../features/userSlice";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const PreviewProduk = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  const dataProduct = useLocation();
  console.log(dataProduct);

  const addProductStatus = useSelector(getAddProductStatus);
  const updateProductStatus = useSelector(getUpdateProductStatus);
  const gettDetailUser = useSelector(detailUser);
  console.log(gettDetailUser);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    dataProduct.state.image.forEach(function (file) {
      data.append("files", file);
    });
    data.append("product_name", dataProduct.state.name);
    data.append("product_description", dataProduct.state.description);
    data.append("product_price", parseInt(dataProduct.state.price));
    data.append("product_category", dataProduct.state.category);
    data.append("productStatus", "Available");

    try {
      dataProduct.state.productId
        ? await dispatch(
            updateProduct({
              userId: user.userId,
              productId: dataProduct.state.productId,
              dataProduct: data,
            })
          )
        : await dispatch(addProduct({ id: user.userId, dataProduct: data }));

      navigate("/daftarJual");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getUserById(user.userId));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Secondpedia | Seller Produk</title>
      </Helmet>
      <NavigationBar />
      <div className="sm:flex sm:px-[236px] gap-[32px] mt-[-88px] sm:mt-32 relative">
        <Link
          className="absolute top-[44px] left-[16px] z-50 bg-white rounded-full sm:hidden"
          to={
            dataProduct.state.productId
              ? {
                  pathname: `/updateproduk/${dataProduct.state.productId}`,
                }
              : "/infoproduk"
          }
          state={{
            productName: dataProduct.state.name,
            productPrice: dataProduct.state.price,
            productCategory: dataProduct.state.category,
            productDescription: dataProduct.state.description,
          }}
        >
          <img src={Arrowleft} alt="Arrowleft" />
        </Link>

        <div className="sm:w-[600px]">
          <ProdukImage />
          <div className="container hidden sm:block ">
            <div className="rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.15)] p-5 mt-10 ">
              <h1 className="pb-3 font-bold">Deskripsi</h1>
              <p>{dataProduct.state.description}</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[336px] px-4 sm:px-0 absolute sm:static top-[320px] z-20 sm:z-0">
          <div className="container flex w-full -mt-10 z-50 sm:mt-0 static bg-white rounded-2xl">
            <div className="rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.15)] p-5 w-full sm:w-auto">
              <p className="font-semibold">{dataProduct.state.name}</p>
              <p className="font-thin pt-2 text-gray-900">
                {dataProduct.state.category}
              </p>
              <p className="text-sm font-semibold pt-4 sm:pb-8 ">
                {dataProduct.state.price}
              </p>
              <button
                onClick={handleAddProduct}
                className="duration-[1s] w-[300px] h-[40px] rounded-2xl bg-purple-700 hover:bg-purple-900 items-center text-white hidden sm:block "
              >
                {addProductStatus === "loading" ||
                updateProductStatus === "loading" ? (
                  <div className="flex mx-auto justify-center">
                    <BeatLoader color="#ffffff" margin={4} size={12} />
                  </div>
                ) : (
                  "Terbitkan"
                )}
              </button>
              <Link
                to={
                  dataProduct.state.productId
                    ? {
                        pathname: `/updateproduk/${dataProduct.state.productId}`,
                      }
                    : "/infoproduk"
                }
                state={{
                  productName: dataProduct.state.name,
                  productPrice: dataProduct.state.price,
                  productCategory: dataProduct.state.category,
                  productDescription: dataProduct.state.description,
                }}
              >
                <button className="w-[300px] h-[40px] mt-4 border-2 text-black rounded-2xl border-purple-700 hover:border-purple-900 justify-center items-center font-medium hidden sm:block hover:text-black">
                  Edit
                </button>
              </Link>
            </div>
          </div>
          <div className="container sm:mt-6 w-full">
            <div className="w-full bg-white h-[90px] mt-3 sm:mt-0 flex gap-1 mb-10 p-5 rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] sm:max-w-md">
              <div className="rounded-xl h-[48px] w-[58px] object-cover">
                <img
                  src={gettDetailUser.urlUser}
                  className="w-12 h-12 rounded-xl object-cover"
                  alt="#"
                />
              </div>
              <div className="">
                <p className="font-semibold">{user.username}</p>
                <p className="text-[10px] font-normal text-gray-900 pt-2">
                  {user.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container block sm:hidden mt-[220px] sm:mt-0 px-4 ">
        <div className="border rounded-xl shadow-lg p-5 mt-10 ">
          <h1 className="pb-3 font-bold">Deskripsi</h1>
          <p>{dataProduct.state.description}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleAddProduct}
          className=" duration-[1s] w-[350px] px-6 py-[14px] rounded-2xl 
            bg-purple-700 hover:bg-purple-900 items-center text-white fixed bottom-5 sm:hidden z-50"
        >
          {addProductStatus === "loading" ||
          updateProductStatus === "loading" ? (
            <div className="flex mx-auto justify-center">
              <BeatLoader color="#ffffff" margin={4} size={12} />
            </div>
          ) : (
            "Terbitkan"
          )}
        </button>
      </div>
    </div>
  );
};

export default PreviewProduk;
