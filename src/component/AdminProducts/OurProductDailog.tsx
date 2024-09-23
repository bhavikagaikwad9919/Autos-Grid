import { FC, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancelIcon from "../../assets/cancelIcon.png";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const initialState = {
  long_description: "",
  product_images: "",
  product_name: "",
  product_youtube_url: "",
  short_description: "",
  product_logo: "",
};

interface DropdownItem {
  id: number;
  status_name: string;
}

interface OurProductDailogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  HandleAddProductPop: () => void;
  setValidationPopup: (value: any) => void;
  validationpopup: any;
  productName: string;
  setProductName: (value: string) => void;
  launchStatusPopup: boolean;
  setLaunchStatusPopup: (value: boolean) => void;
  launchStatus: any;
  setLaunchStatus: (value: any) => void;
  dropDown: DropdownItem[];
  setDropdown: (value: DropdownItem[]) => void;
  productyoutubeurl: string;
  setproductyoutubeurl: (value: string) => void;
  shortDescription: string;
  setShortDescription: (value: string) => void;
  longDescription: string;
  setLongDescription: (value: string) => void;
  selectedImages: any[];
  setSelectedImages: (value: any[]) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showImageCount: boolean;
  setShowImageCount: (value: boolean) => void;
  productLogo: any;
  setProductLogo: (value: any) => void;
  handleFileChangeIcon: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowIconCount: (value: boolean) => void;
  showIconCount: boolean;
  handleourProduct: () => void;
}

const OurProductDailog: FC<OurProductDailogProps> = ({
  open,
  setOpen,
  HandleAddProductPop,
  setValidationPopup,
  validationpopup,
  productName,
  setProductName,
  launchStatusPopup,
  setLaunchStatusPopup,
  launchStatus,
  setLaunchStatus,
  dropDown,
  productyoutubeurl,
  setproductyoutubeurl,
  setShortDescription,
  shortDescription,
  setLongDescription,
  longDescription,
  selectedImages,
  setSelectedImages,
  handleFileChange,
  showImageCount,
  productLogo,
  setProductLogo,
  handleFileChangeIcon,
  showIconCount,
  handleourProduct,
}) => {
  const cancelButtonRef = useRef(null);

  const token = localStorage.getItem("tokenLogin");

  const handleSaveProducts = () => {
    handleAddProductApi();
  };

  const handleImageCancelIcon = () => {
    setProductLogo({});
  };

  const handleAddProductApi = async () => {
    try {
      let formData = new FormData();
      selectedImages.forEach((image: any, index: any) => {
        formData.append(`product_images[${index}]`, image.file);
      });

      formData.append("product_name", productName);
      formData.append("status_id", launchStatus);
      formData.append("short_description", shortDescription);
      formData.append("long_description", longDescription);
      formData.append("product_youtube_url", productyoutubeurl);

      if (productLogo && productLogo.file) {
        formData.append("product_logo", productLogo.file);
      }
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/add_product`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.status_code === 200) {
        setLaunchStatusPopup(false);
        setOpen(false);
        handleourProduct();
        setSelectedImages([]);
        setProductName("");
        setShortDescription("");
        setproductyoutubeurl("");
        setLongDescription("");
        setLaunchStatus([]);
        setProductLogo("");
      } else if (responseData.status_code === 201) {
        const errormsg = {
          long_description:
            responseData?.message?.long_description &&
            responseData?.message?.long_description[0],
          product_images:
            responseData?.message?.product_images &&
            responseData?.message?.product_images[0],
          product_name:
            responseData?.message?.product_name &&
            responseData?.message?.product_name[0],
          product_youtube_url:
            responseData?.message?.product_youtube_url &&
            responseData?.message?.product_youtube_url[0],
          short_description:
            responseData?.message?.short_description &&
            responseData?.message?.short_description[0],
          product_logo:
            responseData?.message?.product_logo &&
            responseData?.message?.product_logo[0],
        };
        setValidationPopup(initialState);

        setValidationPopup(errormsg);
        if (launchStatus) {
          setLaunchStatusPopup(false);
        } else {
          setLaunchStatusPopup(true);
        }
        toast.error("ALL feild our Required", {});
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleImageCancel = (index: any) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  return (
    <div>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   dialogmain">
                    <div className="bg-white px-3 py-3 dialogmain">
                      <div className="sm:flex sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end cursor-pointer"
                            onClick={HandleAddProductPop}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Add Product
                          </Dialog.Title>
                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 mr-4 w-3/6 relative">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Name
                              </label>
                              <input
                                className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                  validationpopup.product_name
                                    ? "redFocusBorder"
                                    : ""
                                }`}
                                placeholder="Enter"
                                value={productName}
                                onChange={(e) => {
                                  setProductName(e.target.value);
                                  setValidationPopup(initialState);
                                  setLaunchStatusPopup(false);
                                }}
                              ></input>
                              {validationpopup.product_name && (
                                <p className="mt-2 text-pink-600 text-xs absolute bottomPosition ">
                                  {validationpopup.product_name || null}
                                </p>
                              )}
                            </div>

                            <div className="grid mt-3.5 w-3/6 relative">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Launch Status
                              </label>

                              <Menu as="div" className="relative inline-block">
                                <div>
                                  <Menu.Button
                                    className={`inline-flex px-2 py-2 w-full rounded-md font-normal dropdown dialogInput bg-white ${
                                      launchStatusPopup && "menuFocusBorder"
                                    }`}
                                  >
                                    {launchStatus !== 0
                                      ? dropDown.find(
                                          (item: any) =>
                                            item.id === launchStatus
                                        )?.status_name || "Enter"
                                      : "Enter"}
                                    <ChevronDownIcon
                                      className="ml-60 h-5 w-5 text-gray-400 absolute selectArrow"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items
                                    className="absolute right-0 z-10 mt-2 w-full origin-top-right 
          rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 
          focus:outline-none "
                                  >
                                    <div className="py-1">
                                      {dropDown.map((item: any) => (
                                        <Menu.Item key={item.id}>
                                          {({ active }) => (
                                            <a
                                              onClick={() => {
                                                setLaunchStatus(item.id);
                                                setLaunchStatusPopup(false);
                                              }}
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-hover-blue"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                              )}
                                            >
                                              {item.status_name}
                                            </a>
                                          )}
                                        </Menu.Item>
                                      ))}
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                              {launchStatusPopup && (
                                <p className="mt-2 absolute bottomPosition text-pink-600 text-xs">
                                  Product Launch Status is required
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product youtube url
                              </label>
                              <input
                                className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                  validationpopup.product_youtube_url
                                    ? "redFocusBorder"
                                    : ""
                                }`}
                                placeholder="Enter"
                                value={productyoutubeurl}
                                onChange={(e) => {
                                  setproductyoutubeurl(e.target.value);
                                  setValidationPopup(initialState);
                                  setLaunchStatusPopup(false);
                                }}
                              ></input>
                            </div>
                          </div>
                          {validationpopup.product_youtube_url && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              {validationpopup.product_youtube_url || null}
                            </p>
                          )}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Short Description
                              </label>
                              <input
                                className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                  validationpopup.short_description
                                    ? "redFocusBorder"
                                    : ""
                                }`}
                                placeholder="Enter"
                                value={shortDescription}
                                onChange={(e) => {
                                  setShortDescription(e.target.value);
                                  setValidationPopup(initialState);
                                  setLaunchStatusPopup(false);
                                }}
                              ></input>
                            </div>
                          </div>
                          {validationpopup.short_description && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              {validationpopup.short_description || null}
                            </p>
                          )}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 DescriptionWidth">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Long Description
                              </label>
                              <div
                                className={`rounded-md ${
                                  validationpopup.long_description
                                    ? "ckEditorWrapper"
                                    : ""
                                }`}
                              >
                                <CKEditor
                                  editor={ClassicEditor}
                                  config={{
                                    toolbar: {
                                      items: ["undo", "redo", "|", "|", "link"],
                                      shouldNotGroupWhenFull: false,
                                    },
                                  }}
                                  data={longDescription}
                                  onChange={(event: any, editor: any) => {
                                    console.log({ event, editor });
                                    const data = editor.getData();
                                    setLongDescription(data);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {validationpopup.long_description && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              {validationpopup.long_description || null}
                            </p>
                          )}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Images{" "}
                                <span className="productIconOption">
                                  (Minimum Size 1500*1500, JPG, PNG)
                                </span>
                              </label>
                              <div className="flex">
                                <input
                                  className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                    validationpopup.product_images
                                      ? "redFocusBorder"
                                      : ""
                                  }`}
                                  placeholder="Select image"
                                  value={selectedImages
                                    .map((image: any) => image.name)
                                    .join("\n")}
                                  readOnly
                                  style={{
                                    whiteSpace: "pre-line",
                                    lineBreak: "auto",
                                  }}
                                ></input>

                                <input
                                  className="opacity-0 w-0"
                                  id="file_input"
                                  type="file"
                                  onChange={handleFileChange}
                                  multiple
                                />

                                <div className="rounded-md p-2 px-9 formLoginButton ml-2">
                                  <label
                                    className="text-sm font-medium text-center formLoginBtnname cursor-pointer"
                                    htmlFor="file_input"
                                  >
                                    Upload
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {validationpopup.product_images && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              {" "}
                              {validationpopup.product_images || null}
                            </p>
                          )}

                          {showImageCount && (
                            <div className="mt-2 flex overflow-x-auto">
                              <div
                                className="grid pl-2"
                                style={{ width: "calc(7 * 84px)" }}
                              >
                                {selectedImages.length > 0 && (
                                  <div className="mt-3 flex">
                                    {selectedImages.map(
                                      (image: any, index: number) => (
                                        <div key={index} className="flex">
                                          <div>
                                            <div className="relative inline-block	m-2 w-20 h-20 items-center">
                                              <img
                                                src={image.imageUrl}
                                                alt={image.name}
                                                className="w-full h-full"
                                              />
                                              <div className="absolute p-2 bottom-11 right-0">
                                                <i
                                                  className="fa fa-times"
                                                  aria-hidden="true"
                                                  onClick={handleImageCancel}
                                                ></i>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Icon{" "}
                                <span className="productIconOption">
                                  (Minimum Size 500*500, JPG, PNG, SVG)
                                </span>
                              </label>
                              <div className="flex">
                                <input
                                  className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                    validationpopup.product_logo
                                      ? "redFocusBorder"
                                      : ""
                                  }`}
                                  placeholder="Select image"
                                  value={productLogo.imageUrl}
                                  readOnly
                                  style={{
                                    whiteSpace: "pre-line",
                                    lineBreak: "auto",
                                  }}
                                ></input>

                                <input
                                  className="opacity-0 w-0"
                                  id="file_input1"
                                  type="file"
                                  onChange={handleFileChangeIcon}
                                  multiple
                                />

                                <div className="rounded-md p-2 px-9 formLoginButton ml-2">
                                  <label
                                    className="text-sm font-medium text-center formLoginBtnname cursor-pointer"
                                    htmlFor="file_input1"
                                  >
                                    Upload
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {validationpopup.product_logo && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              {" "}
                              {validationpopup.product_logo || null}
                            </p>
                          )}

                          {showIconCount && (
                            <div className="mt-2 flex overflow-x-auto">
                              <div
                                className="grid pl-2"
                                style={{ width: "calc(7 * 84px)" }}
                              >
                                {productLogo.imageUrl && (
                                  <div className="mt-3 flex">
                                    <div className="flex">
                                      <div>
                                        <div className="relative inline-block	m-2 w-20 h-20 items-center">
                                          <img
                                            src={productLogo.imageUrl}
                                            className="w-full h-full"
                                          />
                                          <div className="absolute p-2 bottom-11 right-0">
                                            <i
                                              className="fa fa-times"
                                              aria-hidden="true"
                                              onClick={handleImageCancelIcon}
                                            ></i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          <ToastContainer />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <button
                        className="px-12 py-3 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButton"
                        onClick={handleSaveProducts}
                      >
                        Save
                      </button>
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

export default OurProductDailog;
