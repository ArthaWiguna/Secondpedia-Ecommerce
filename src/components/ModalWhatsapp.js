import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Close from "../assets/img/fi_x.svg";

import { FaWhatsapp } from "react-icons/fa";

const ModalWhatsapp = ({
  offerId,
  city,
  nav,
  setNav,
  username,
  buyerImage,
  productName,
  productPrice,
  offerPrice,
  productImage,
}) => {
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <Transition appear show={nav} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleNav}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
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
                <div className="sm:rounded-2xl sm:w-[360px] duration-[1s] bg-white w-full flex flex-col items-center rounded-t-[16px] shadow-sm">
                  <button
                    onClick={handleNav}
                    className=" sm:hidden w-full h-[38px] flex items-center justify-center"
                  >
                    <div className="w-[60px] h-[6px] rounded-[20px] bg-gray-900" />
                  </button>
                  <div className="sm:flex hidden justify-end w-full h-[38px] items-center pr-[16px] pt-[10px]">
                    <img
                      id="klik"
                      onClick={handleNav}
                      className="close sm:flex hidden cursor-pointer"
                      src={Close}
                      alt="img"
                    />
                  </div>
                  <div className="w-[360px] mt-4 flex flex-col items-center px-[32px]">
                    <p className="text-sm text-justify font-medium mb-[8px] w-full">
                      Yeay kamu berhasil mendapat harga yang sesuai
                    </p>
                    <p className="text-sm font-normal text-start text-gray-900 mb-[16px] w-full">
                      Segera hubungi pembeli melalui <br />
                      whatsapp untuk transaksi selanjutnya
                    </p>
                    <div className="p-[16px] flex flex-col border w-full rounded-2xl shadow-md mb-[24px]">
                      <p className="text-center font-medium text-sm mb-[16px]">
                        Product Match
                      </p>
                      <div className=" flex mb-[16px]">
                        <div>
                          <img
                            src={buyerImage}
                            className="rounded-xl h-[48px] w-[48px] object-cover"
                            alt="Profile"
                          />
                        </div>
                        <div className="pl-[16px] flex flex-col">
                          <p className="text-sm font-medium mb-[5px]">
                            {username}
                          </p>
                          <p className="text-[10px] leading-[14px] text-gray-900">
                            {city}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <img
                            src={productImage}
                            className="rounded-xl h-[48px] w-[48px] object-cover"
                            alt="Profile"
                          />
                        </div>
                        <div className="pl-[16px] flex flex-col">
                          <p className="text-sm font-normal">{productName}</p>
                          <p className="text-sm font-normal line-through">
                            Rp {productPrice}
                          </p>
                          <p className="text-sm font-normal">
                            Ditawar Rp {offerPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      href="https://wa.me/+085232723635"
                      target="blank"
                      className="w-full"
                    >
                      <button className="h-[48px] rounded-2xl w-full bg-purple-700 hover:bg-purple-900 text-white flex justify-center items-center mb-[20px] duration-[1s]">
                        <p className="justify-center font-medium text-sm mx-[40px]">
                          Hubungi via Whatsapp
                        </p>
                        <FaWhatsapp size={"20"} />
                      </button>
                    </a>
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

export default ModalWhatsapp;
