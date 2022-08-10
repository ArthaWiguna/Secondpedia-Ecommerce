import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Close from "../assets/img/fi_x.svg";
import { useDispatch } from "react-redux/es/exports";
import { addOffer } from "../features/offerSlice";

const ModalDetailProduk = ({
  isOpen,
  setIsOpen,
  productId,
  productImage,
  productName,
  productPrice,
}) => {
  const dispatch = useDispatch();
  console.log(JSON.parse(localStorage.getItem("token")));

  // Data Post Offer
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const [submitted, setSubmitted] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  console.log(parseInt(offerPrice));

  function closeModal() {
    setIsOpen(!isOpen);
  }

  const handleAddOffer = async (e) => {
    e.preventDefault();
    if (offerPrice !== "" && offerPrice < productPrice) {
      await dispatch(
        addOffer({
          path: {
            userId: parseInt(user.userId),
            productId: parseInt(productId),
          },
          data: {
            offer_price: Number(offerPrice),
            offerStatus: "Diminati",
          },
        })
      );
      setIsOpen(!isOpen);
    }
    setSubmitted(true);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="sm:static sm:opacity-0 fixed bottom-[-200%]"
              enterTo="sm:static sm:opacity-100 fixed bottom-0"
              leave="ease-in-out duration-300"
              leaveFrom="sm:static sm:opacity-100 fixed bottom-0"
              leaveTo="sm:static sm:opacity-0 fixed bottom-[-200%]"
            >
              <Dialog.Panel className="w-full h-full sm:items-center justify-center items-end flex">
                <div
                  className={
                    isOpen
                      ? "bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
                      : "hidden"
                  }
                />
                <div
                  className={
                    isOpen
                      ? "w-full h-[100vh] sm:items-center sm:justify-center items-end flex fixed bottom-[0] ease-in-out duration-[1s]"
                      : "w-full h-[100vh] sm:items-center sm:justify-center items-end flex fixed bottom-[-100%] ease-in-out duration-[1s] z-50"
                  }
                >
                  <div className="sm:rounded-2xl sm:w-[360px] duration-[1s] bg-white w-full flex flex-col items-center rounded-t-[16px] shadow-sm">
                    <button
                      onClick={closeModal}
                      className="sm:hidden w-full h-[38px] flex items-center justify-center"
                    >
                      <div className="w-[60px] h-[6px] rounded-[20px] bg-gray-900" />
                    </button>
                    <div className="sm:flex hidden justify-end w-full h-[38px] items-center pr-[16px] pt-[10px]">
                      <img
                        id="klik"
                        onClick={closeModal}
                        className="close sm:flex hidden cursor-pointer"
                        src={Close}
                        alt="img"
                      />
                    </div>
                    <div className="w-[360px] flex flex-col items-center px-[32px]">
                      <p className="text-sm text-justify font-semibold mb-[8px] w-full">
                        Masukkan Harga Tawarmu
                      </p>
                      <p className="text-sm mt-2 text-start font-normal text-gray-900 mb-[16px] w-full">
                        Harga tawaranmu akan diketahui penjual, jika penjual
                        cocok kamu akan segera dihubungi penjual.
                      </p>
                      <div className="p-[16px] flex flex-col w-full rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] mb-[24px] bg-gray-200">
                        <div className="flex">
                          <div>
                            <img
                              src={productImage}
                              alt=""
                              className="rounded-xl h-[48px] w-[48px] object-cover"
                            />
                          </div>
                          <div className="pl-[16px] flex flex-col">
                            <p className="text-sm font-semibold ">
                              {productName}
                            </p>
                            <p className="text-sm font-normal mt-1">
                              {productPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="flex mr-auto mb-1 text-sm font-normal">
                        Harga Tawar
                      </p>
                      <div className="flex flex-col w-full mt-1 mb-[24px]">
                        <form onSubmit={handleAddOffer}>
                          <input
                            type="text"
                            placeholder="Rp 0,00"
                            className="w-full border solid border-gray-700 shadow-[0_0_4px_rgba(0,0,0,0.15)] rounded-2xl px-4 py-3 placeholder:text-sm placeholder:text-gray-900 focus:border-transparent focus:ring-purple-900"
                            onChange={(e) => setOfferPrice(e.target.value)}
                          />
                          {submitted && offerPrice >= productPrice ? (
                            <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                              Harga tawar harus lebih kecil dari harga asli !
                            </p>
                          ) : submitted && offerPrice === "" ? (
                            <p className="text-[#FA2C5A] text-xs mt-1 ml-3">
                              Harga tawaran berum diisi !
                            </p>
                          ) : (
                            ""
                          )}
                          <button
                            type="submit"
                            className="h-[48px] mt-6 rounded-2xl w-full bg-purple-700 hover:bg-purple-900 text-white hover:text-white flex justify-center items-center mb-[20px] duration-[1s]"
                          >
                            <p className="justify-center font-medium text-sm mx-[40px] hover:text-white">
                              Kirim
                            </p>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDetailProduk;
