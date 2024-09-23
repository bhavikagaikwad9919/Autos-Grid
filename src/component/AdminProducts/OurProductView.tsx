import { FC, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancelIcon from "../../assets/cancelIcon.png";
import "react-toastify/dist/ReactToastify.css";
import { Carousel, IconButton } from "@material-tailwind/react";
import parse from "html-react-parser";

interface Productid {
  id: number;
  product_name: string;
  status_id: number;
  short_description: string;
  long_description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  status_name: string;
  product_youtube_url: string;
  product_images: string[];
  product_logo: string;
}

interface OurProductViewProps {
  openView: boolean;
  setOpenView: (value: boolean) => void;
  ourProductView: Productid | null;
  setOurProductView: (value: Productid | null) => void;
}
const OurProductView: FC<OurProductViewProps> = ({
  setOpenView,
  openView,
  ourProductView,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <div>
      {openView && (
        <Transition.Root show={openView} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpenView}
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
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  dialogmain">
                    <div className="bg-white px-3 py-3 dialogmain">
                      <div className="sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end cursor-pointer"
                            onClick={() => setOpenView(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle mt-2"
                          >
                            {ourProductView?.product_name}
                          </Dialog.Title>
                          <div className="px-3">
                            {ourProductView?.product_images.length === 1 ? (
                              <div>
                                <div className="carousel-container">
                                  {ourProductView?.product_images.map(
                                    (item: any) => (
                                      <img
                                        src={item}
                                        className="w-80 object-cover"
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="carousel-container">
                                <Carousel
                                  placeholder="arrow"
                                  className="w-80"
                                  prevArrow={({ handlePrev }) => (
                                    <IconButton
                                      placeholder="arrow"
                                      variant="text"
                                      color="white"
                                      size="lg"
                                      onClick={handlePrev}
                                      className="!absolute Carouselbgcolor top-2/4 left-4 -translate-y-2/4 rounded-full select-none carousel-arrow"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                      </svg>
                                    </IconButton>
                                  )}
                                  nextArrow={({ handleNext }) => (
                                    <IconButton
                                      variant="text"
                                      placeholder="arrow"
                                      color="white"
                                      size="lg"
                                      onClick={handleNext}
                                      className="!absolute Carouselbgcolor top-2/4 !right-4 -translate-y-2/4 rounded-full select-none carousel-arrow"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                      </svg>
                                    </IconButton>
                                  )}
                                >
                                  {ourProductView?.product_images.map(
                                    (item: any) => (
                                      <img
                                        key={item}
                                        src={item}
                                        className="w-80  object-cover carousel-slide"
                                      />
                                    )
                                  )}
                                </Carousel>
                              </div>
                            )}

                            <div className="viewOurProducts">
                              <div className="w-72 ml-4">
                                <div className="font-medium mx-5 mt-3">
                                  <div className="mb-2 text-lg font-semibold">
                                    {" "}
                                    {ourProductView?.product_name}
                                  </div>

                                  <div className="mb-4 font-medium text-sm">
                                    {" "}
                                    {ourProductView?.short_description}
                                  </div>

                                  <div className="mt-6 text-lg">
                                    Product Icon:
                                  </div>
                                  <div className="mt-4">
                                    <img
                                      src={ourProductView?.product_logo}
                                    ></img>
                                  </div>

                                  <div className="mt-6 text-lg">
                                    Long Description:
                                  </div>
                                  <div className="mb-4 font-medium text-sm">
                                    {ourProductView?.long_description
                                      ? parse(ourProductView.long_description)
                                      : "No description available"}
                                  </div>
                                </div>
                              </div>
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

export default OurProductView;
