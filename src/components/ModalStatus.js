import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductToSold } from "../features/productSlice";
import { sellerRejectedOffer } from "../features/offerSlice";

import Close from "../assets/img/fi_x.svg";

const ModalStatus = ({ productId, offerId, isOpen, setIsOpen }) => {
  console.log(productId, offerId);
  const dispatch = useDispatch();
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const [isSOld, setIsSold] = useState(false);
  console.log(isSOld);

  function closeModal() {
    setIsOpen(!isOpen);
  }

  const handleUpdateProductStatus = async (e) => {
    e.preventDefault();
    try {
      if (isSOld === true) {
        await dispatch(
          updateProductToSold({ userId: user.userId, productId: productId })
        );
      } else if (isSOld === false) {
        await dispatch(sellerRejectedOffer(offerId));
      }
    } catch (error) {
      console.log(error);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="sm:w-[360px] sm:rounded-2xl justify-center items-end flex w-full rounded-t-2xl bg-white duration-[1s]">
                  <div className="w-[360px] flex flex-col p-[32px]">
                    <div className="justify-end flex">
                      <div
                        className="sm:hidden cursor-pointer w-full h-[20px] flex justify-center"
                        onClick={closeModal}
                      >
                        <div className="w-[60px] h-[6px] bg-gray-700 rounded-[20px]" />
                      </div>
                      <img
                        src={Close}
                        alt="img"
                        onClick={closeModal}
                        className="sm:block cursor-pointer hidden"
                      />
                    </div>
                    <div className="font-medium text-sm mb-[24px]">
                      Perbarui status penjualan produkmu
                    </div>
                    <form>
                      <div className="mb-[24px]">
                        <input
                          className="bg-gray-900 hover:bg-purple-700 checked:bg-purple-700 mt-1 transition duration-200 align-top cursor-pointer mr-[16px]"
                          onClick={() => setIsSold(true)}
                          type="radio"
                          value="sold"
                          name="radio"
                        />
                        <label className="font-normal text-sm">
                          Berhasil terjual
                        </label>
                        <p className="font-normal text-sm text-gray-900 ml-[32px]">
                          Kamu telah sepakat menjual produk ini kepada pembeli
                        </p>
                      </div>
                      <div className="mb-[24px]">
                        <input
                          className="bg-gray-900 hover:bg-purple-700 checked:bg-purple-700 outline-none ring-purple-900 mt-1 transition duration-200 align-top cursor-pointer mr-[16px]"
                          onClick={() => setIsSold(false)}
                          type="radio"
                          value="rejected"
                          name="radio"
                        />
                        <label className="font-normal text-sm">
                          Batalkan transaksi
                        </label>
                        <p className="font-normal text-sm text-gray-900 ml-[32px]">
                          Kamu membatalkan transaksi produk ini dengan pembeli
                        </p>
                      </div>
                      <button
                        type="submit"
                        onClick={handleUpdateProductStatus}
                        className="h-[48px] w-full rounded-2xl text-white bg-purple-700 hover:bg-purple-900 duration-[1s]"
                      >
                        Kirim
                      </button>
                    </form>
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

export default ModalStatus;
