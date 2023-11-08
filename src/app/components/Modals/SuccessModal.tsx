import Image from "next/image";
import { SetStateAction, useState } from "react";

export const SuccessModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (p: boolean) => void;
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-center items-center w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {/*body*/}
                <Image
                  src="/successanimation.gif"
                  alt=""
                  width={150}
                  height={1}
                ></Image>
                <div
                  className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div className="flex">
                    <div>
                      <p className="text-3xl m-10 text-center font-bold">
                        E-mail enviado com sucesso
                      </p>
                      <p className="text-l text-center m-10">
                        Você será contatado nas próximas horas
                      </p>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
