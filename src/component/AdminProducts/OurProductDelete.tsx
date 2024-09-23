import { FC, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancelIcon from "../../assets/cancelIcon.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OurProductDeleteProps {
  openDelete: boolean;
  setOpenDelete: (value: boolean) => void;
  deleteName: string | undefined;
  openDeletePopup: boolean;
  setOpenDeletePopup: (value: boolean) => void;
  isDelayOver: boolean;
  countdown: number;
  deleteId: string | undefined;
  handleourProduct: () => void;
}
const OurProductDelete: FC<OurProductDeleteProps> = ({
  openDelete,
  setOpenDelete,
  deleteName,
  openDeletePopup,
  setOpenDeletePopup,
  isDelayOver,
  countdown,
  deleteId,
  handleourProduct,
}) => {
  const cancelButtonRef = useRef(null);
  const token = localStorage.getItem("tokenLogin");

  const deletedata = {
    product_id: deleteId,
  };

  const handleDeleteApiCall = async () => {
    if (isDelayOver) {
      try {
        const apiUrl = `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/delete_product`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(deletedata),
        });

        const responseData = await response.json();

        if (responseData.status_code === 200) {
          setOpenDelete(false);
          setOpenDeletePopup(false);
          handleourProduct();
        } else if (responseData.status_code === 201) {
          toast.error(responseData.message, {});
        }
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };
  const handleDeletePopUp = () => {
    setOpenDeletePopup(true);
  };

  const handledeletePopupSecond = () => {
    window.location.reload();
    setOpenDeletePopup(true);
  };

  const handledeletePopupclose = () => {
    window.location.reload();
    setOpenDeletePopup(false);
  };

  return (
    <div>
      {openDelete && (
        <Transition.Root show={openDelete} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpenDelete}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   dialogmain">
                    <div className="bg-white px-9 py-6 dialogmain">
                      <div className="sm:flex sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end cursor-pointer"
                            onClick={() => setOpenDelete(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Delete
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              Are you sure you want to Delete? {deleteName}
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className="grid mr-2 text-left px-10 py-2 formLoginButton focus:outline-none"
                                onClick={handleDeletePopUp}
                              >
                                Yes
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={() => setOpenDelete(false)}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}

      {openDeletePopup && (
        <Transition.Root show={openDeletePopup} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={handledeletePopupSecond}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   dialogmain">
                    <div className="bg-white px-9 py-6 dialogmain">
                      <div className="sm:flex sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end cursor-pointer"
                            onClick={handledeletePopupSecond}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Delete
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              This will delete all the data related to{" "}
                              {deleteName} Product
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className={`grid mr-2 text-left px-10 py-2 ${
                                  !isDelayOver
                                    ? "formLoginButtondelete"
                                    : "formLoginButton"
                                }`}
                                onClick={handleDeleteApiCall}
                                disabled={!isDelayOver}
                              >
                                {isDelayOver
                                  ? "Yes"
                                  : `Wait ${countdown} seconds`}
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={handledeletePopupclose}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default OurProductDelete;
