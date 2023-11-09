export const StripeModal = ({
  showModal,
  setShowModal,
  children,
}: {
  showModal: boolean;
  setShowModal: (p: boolean) => void;
  children?: React.ReactNode;
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center w-screen flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full md:w-80% my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-center items-center w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <header className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Stripe</h3>
                </header>
                {/*body*/}
                {children}
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
