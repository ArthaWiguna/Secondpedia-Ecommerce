import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Arrowleft from "../assets/img/fi_arrow-left.svg";
import plus from "../assets/img/fi_plus.svg";
import NavigationBar from "../components/NavigationBar";
import { addProduct, getAddProductStatus } from "../features/productSlice";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const InfoProduk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataProduct = useLocation();
  console.log(dataProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  const imagesFile = [];
  console.log(imagesFile);
  console.log(images);

  const addProductStatus = useSelector(getAddProductStatus);

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex, "list image");
    setImages(imageList);
  };

  images.forEach(function (item) {
    imagesFile.push(item.file);
    console.log(item.file);
  });

  const handlePreview = () => {
    let objImage = [];
    for (let i = 0; i < imagesFile.length; i++) {
      objImage.push({ image: URL.createObjectURL(imagesFile[i]) });
    }
    console.log(objImage, "obj image");
    localStorage.setItem("imagePreview", JSON.stringify(objImage));
  };

  // https://stackoverflow.com/questions/55596514/handling-multiple-image-upload-with-react-js-laravel
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    imagesFile.forEach(function (file) {
      data.append("files", file);
    });
    data.append(
      "product_name",
      name === "" && dataProduct && dataProduct.state !== null
        ? dataProduct.state.productName
        : name
    );
    data.append(
      "product_description",
      description === "" && dataProduct && dataProduct.state !== null
        ? dataProduct.state.productDescription
        : description
    );
    data.append(
      "product_price",
      price === "" && dataProduct && dataProduct.state !== null
        ? dataProduct.state.productPrice
        : parseInt(price)
    );
    data.append(
      "product_category",
      category === "" && dataProduct && dataProduct.state !== null
        ? dataProduct.state.productCategory
        : category
    );
    data.append("productStatus", "Available");

    if (
      (name !== "" &&
        description !== "" &&
        price !== "" &&
        category !== "" &&
        images.length !== 0) ||
      (dataProduct && dataProduct.state !== null && images.length !== 0)
    ) {
      await dispatch(addProduct({ id: user.userId, dataProduct: data }));
      navigate("/daftarJual");
    }
    setSubmitted(true);
  };

  return (
    <div>
      <Helmet>
        <title>Secondpedia | Seller Produk </title>
      </Helmet>
      <NavigationBar />
      <section className="py-6 flex justify-center mt-8 sm:mt-28">
        <Link className="sm:block hidden" to="/">
          <img src={Arrowleft} alt="img" />
        </Link>
        <div className="sm:w-[568px] sm:mx-[78px] h-[568px] w-[328px] flex flex-col justify-between duration-[1s]">
          <form onSubmit={handleAddProduct}>
            <div className="flex flex-col mb-3">
              <label className="mb-1 font-medium text-xs">Nama Produk</label>
              <input
                type="text"
                defaultValue={
                  dataProduct.state && dataProduct.state.productName
                    ? dataProduct.state.productName
                    : ""
                }
                className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
                placeholder="Nama Produk"
                onChange={(e) => setName(e.target.value)}
              />
              {submitted &&
              name === "" &&
              dataProduct &&
              dataProduct.state === null ? (
                <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                  Email harus diisi !
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-1 font-medium text-xs">Harga Produk</label>
              <input
                type="number"
                defaultValue={
                  dataProduct.state && dataProduct.state.productPrice
                    ? dataProduct.state.productPrice
                    : ""
                }
                className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
                placeholder="Rp 0,00"
                onChange={(e) => setPrice(e.target.value)}
              />
              {submitted &&
              price === "" &&
              dataProduct &&
              dataProduct.state === null ? (
                <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                  Harga produk harus diisi !
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-1 font-medium text-xs">Kategori</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[48px] px-4 text-xs focus:border-transparent focus:ring-purple-900"
              >
                <option value="none" hidden>
                  {dataProduct.state && dataProduct.state.productCategory
                    ? dataProduct.state.productCategory
                    : "Pilih Kategori"}
                </option>
                <option value="Hobi">Hobi</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Fashion">Fashion</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
              {submitted &&
              category === "" &&
              dataProduct &&
              dataProduct.state === null ? (
                <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                  Kategori produk harus dipilih !
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-1 font-medium text-xs">Deskripsi</label>
              <textarea
                type="textarea"
                defaultValue={
                  dataProduct.state && dataProduct.state.productDescription
                }
                className="text-black border border-solid border-[#D0D0D0] placeholder:text-gray-900 placeholder:text-sm rounded-2xl h-[80px] py-2 px-4 resize-none text-xs focus:border-transparent focus:ring-purple-900"
                placeholder="Contoh: Masih mulus"
                onChange={(e) => setDescription(e.target.value)}
              />
              {submitted &&
              description === "" &&
              dataProduct &&
              dataProduct.state === null ? (
                <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                  Deskripsi produk harus diisi !
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-1 font-medium text-xs">Foto Produk</label>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={4}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="sm:flex gap-1">
                    <div
                      className={
                        isDragging
                          ? "w-[96px] h-[96px] border-2 border-red-700 rounded-xl border-dashed flex items-center justify-center mb-3"
                          : "w-[96px] h-[96px] border-2 rounded-xl border-dashed flex items-center justify-center mb-3"
                      }
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <img className="-z-50" src={plus} alt="plus" />
                    </div>
                    <div className="flex">
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
                          <img src={image["data_url"]} alt="" width="100" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
              {submitted && images.length === 0 ? (
                <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                  Foto produk harus diisi !
                </p>
              ) : (
                ""
              )}
            </div>
          </form>
          <div className="flex justify-between">
            {(name === "" && dataProduct && dataProduct.state === null) ||
            (description === "" && dataProduct && dataProduct.state === null) ||
            (price === "" && dataProduct && dataProduct.state === null) ||
            (category === "" && dataProduct && dataProduct.state === null) ||
            images.length === 0 ? (
              <button
                className="sm:w-[276px] w-[156px] h-[48px] rounded-2xl border-2 border-purple-700 hover:border-purple-900 text-black font-medium text-xs duration-[1s]"
                onClick={() => setSubmitted(true)}
              >
                Preview
              </button>
            ) : (
              <Link
                to="/previewproduk"
                state={{
                  image: imagesFile,
                  name:
                    name === "" && dataProduct.state
                      ? dataProduct.state.productName
                      : name,
                  description:
                    description === "" && dataProduct.state
                      ? dataProduct.state.productDescription
                      : description,
                  price:
                    price === "" && dataProduct.state
                      ? dataProduct.state.productPrice
                      : price,
                  category:
                    category === "" && dataProduct.state
                      ? dataProduct.state.productCategory
                      : category,
                  // productId: productId,
                }}
              >
                <button
                  type="submit"
                  className="sm:w-[276px] w-[156px] h-[48px] rounded-2xl border-2 border-purple-700 hover:border-purple-900 text-black font-medium text-xs duration-[1s]"
                  onClick={handlePreview}
                >
                  Preview
                </button>
              </Link>
            )}

            <button
              type="submit"
              onClick={handleAddProduct}
              className="sm:w-[276px] w-[156px] h-[48px] rounded-2xl bg-purple-700 hover:bg-purple-900 text-white font-medium text-xs duration-[1s]"
            >
              {addProductStatus === "loading" ? (
                <div className="flex mx-auto justify-center">
                  <BeatLoader color="#ffffff" margin={4} size={12} />
                </div>
              ) : (
                "Terbitkan"
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoProduk;
