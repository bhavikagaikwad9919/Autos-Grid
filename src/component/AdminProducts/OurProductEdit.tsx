import { ChangeEvent, FC, Fragment, useRef, useState } from "react";
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

interface ValidationPopupState {
  long_description: string;
  product_images: string;
  product_name: string;
  product_youtube_url: string;
  short_description: string;
  product_logo: string;
}

interface OurProductEditProps {
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void;
  setShowIconCountUpload: (value: boolean) => void;
  showIconCountUpload: boolean;
  setValidationPopup: (value: ValidationPopupState) => void;
  productLogo: any;
  setProductLogo: (value: any) => void;
  ourProductEdit: any;
  setOurProductEdit: (value: any) => void;
  launchStatus: any;
  dropDown: DropdownItem[];
  statusID: any;
  setStatusId: (value: any) => void;
  validationpopup: ValidationPopupState;
  isFormEmpty: boolean;
  setIsFormEmpty: (value: boolean) => void;
  showImageCount: boolean;
  setShowImageCount: (value: boolean) => void;
  handleFileChangeIcon: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showIconCount: boolean;
  setShowIconCount: (value: boolean) => void;
  handleourProduct: () => Promise<void>;
}

const OurProductEdit: FC<OurProductEditProps> = ({
  setOpenEdit,
  openEdit,
  showIconCountUpload,
  setShowIconCountUpload,
  setValidationPopup,
  productLogo,
  setProductLogo,
  ourProductEdit,
  setOurProductEdit,
  launchStatus,
  dropDown,
  statusID,
  setStatusId,
  validationpopup,
  isFormEmpty,
  setIsFormEmpty,
  showImageCount,
  setShowImageCount,
  handleFileChangeIcon,
  setShowIconCount,
  showIconCount,
  handleourProduct,
}) => {
  const [selectedImages, setSelectedImages] = useState<any>([]);

  const cancelButtonRef = useRef(null);

  const handleUpdateProducts = () => {
    handleUpdateApiCall();
  };

  const handleUpdateApiCall = async () => {
    try {
      let formData = new FormData();

      selectedImages.forEach((image: any) => {
        formData.append(`product_images[${Math.random()}]`, image.file);
      });
      formData.append("product_name", ourProductEdit?.product_name);
      if (productLogo && productLogo.file) {
        formData.append("product_logo", productLogo.file);
      }
      formData.append(
        "product_youtube_url",
        ourProductEdit?.product_youtube_url
      );
      formData.append("status_id", statusID);
      formData.append("short_description", ourProductEdit?.short_description);
      formData.append("long_description", ourProductEdit?.long_description);
      formData.append("product_id", ourProductEdit?.id);

      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/update_product`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        setOpenEdit(false);
        handleourProduct();
        setSelectedImages([]);
        setValidationPopup(initialState);
        setProductLogo({});
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
        toast.error(responseData.message, {});
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const token = localStorage.getItem("tokenLogin");

  const handlesetOpenEdit = () => {
    setOpenEdit(false);
    setSelectedImages([]);
    setShowIconCountUpload(false);
    setValidationPopup(initialState);
    setProductLogo({});
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOurProductEdit((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));

    setIsFormEmpty(name === "product_images" && value.length === 0);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => {
        const imageUrl = URL.createObjectURL(file);
        const imageObject = {
          name: file.name,
          file,
          imageUrl: imageUrl,
        };
        return imageObject;
      });
      setSelectedImages((prevImages: any) => [...prevImages, ...newImages]);
      setShowImageCount(true);
    } else {
      setSelectedImages([]);
    }
  };

  const handleImageCancel = (index: any) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleDeleteImageApiCall = async (imageUrl: any) => {
    try {
      const deletedataImage = {
        product_id: ourProductEdit.id,
        product_image_url: imageUrl,
      };
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/delete_product_image`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(deletedataImage),
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        handleEditProductApi(ourProductEdit.id);
        toast.success(responseData.message, {});
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleEditProductApi = async (id: any) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/get_product_list?product_id=${id}`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (data.status_code === 200) {
        setOurProductEdit(data.data);
        console.log(data.data, "ourproductdata");
        setShowIconCount(true);
        setShowIconCountUpload(false);
        setStatusId(data.data.status_id);
      } else {
        setShowIconCount(false);
        setShowIconCountUpload(true);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  return (
    <div>
      {openEdit && (
        <Transition.Root show={openEdit} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={handlesetOpenEdit}
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
                            onClick={handlesetOpenEdit}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Edit Product
                          </Dialog.Title>
                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 mr-4 w-3/6">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Name
                              </label>
                              <input
                                className="px-2 py-2 w-full rounded-md ... dialogInput"
                                placeholder="Product Name"
                                name="product_name"
                                value={ourProductEdit?.product_name || ""}
                                onChange={(e) => {
                                  setOurProductEdit((prevData: any) => ({
                                    ...prevData,
                                    product_name: e.target.value,
                                  }));
                                }}
                              ></input>
                            </div>

                            <div className="grid mt-3.5 w-3/6">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Launch Status
                              </label>

                              <Menu as="div" className="relative inline-block">
                                <div>
                                  <Menu.Button className="inline-flex px-2 py-2 w-full rounded-md font-normal dropdown dialogInput bg-white">
                                    {ourProductEdit?.id && launchStatus !== 0
                                      ? dropDown.find(
                                          (item: any) => item.id === statusID
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
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      {dropDown.map((item: any) => (
                                        <Menu.Item key={item.id}>
                                          {({ active }) => (
                                            <a
                                              onClick={() => {
                                                setStatusId(item.id);
                                                setOurProductEdit(
                                                  (prev: any) => ({
                                                    ...prev,
                                                    status_name:
                                                      item.status_name,
                                                  })
                                                );
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
                                placeholder="Product Youtube URL"
                                name="product_youtube_url"
                                value={
                                  ourProductEdit?.product_youtube_url || ""
                                }
                                onChange={(e) => {
                                  setOurProductEdit((prevData: any) => ({
                                    ...prevData,
                                    product_youtube_url: e.target.value,
                                  }));
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
                                className="px-2 py-2 w-full rounded-md ... dialogInput"
                                placeholder="Short Description"
                                name="short_description"
                                value={ourProductEdit?.short_description || ""}
                                onChange={(e) => {
                                  setOurProductEdit((prevData: any) => ({
                                    ...prevData,
                                    short_description: e.target.value,
                                  }));
                                }}
                              ></input>
                            </div>
                          </div>

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 DescriptionWidth">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Long Description
                              </label>
                              <CKEditor
                                editor={ClassicEditor}
                                config={{
                                  toolbar: {
                                    items: [
                                      "undo",
                                      "redo",
                                      "|",
                                      "bold",
                                      "link",
                                    ],
                                    shouldNotGroupWhenFull: false,
                                  },
                                }}
                                data={ourProductEdit?.long_description || ""}
                                onReady={(editor: any) => {
                                  console.log(
                                    "CKEditor React Component is ready to use!",
                                    editor
                                  );
                                }}
                                onChange={(event: any, editor: any) => {
                                  const data = editor.getData();
                                  console.log({ event, editor, data });
                                  setOurProductEdit({
                                    ...ourProductEdit,
                                    long_description: data,
                                  });
                                }}
                              />
                            </div>
                          </div>

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Images
                                <span className="productIconOption">
                                  (Minimum Size 1500*1500, JPG, PNG)
                                </span>
                              </label>
                              <div className="flex">
                                <input
                                  className="px-2 py-2 w-full rounded-md ... dialogInput"
                                  value={
                                    selectedImages.length > 0
                                      ? selectedImages
                                          .map((image: any) => image.name)
                                          .join("\n")
                                      : ourProductEdit.product_images &&
                                        ourProductEdit.product_images.length > 0
                                      ? ourProductEdit.product_images.join("\n")
                                      : ""
                                  }
                                  name="product_images"
                                  readOnly
                                  onChange={handleInputChange}
                                  style={{
                                    whiteSpace: "pre-line",
                                    lineBreak: "auto",
                                  }}
                                />
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
                          <div
                            className="grid pl-2"
                            style={{ width: "calc(7 * 100px)" }}
                          >
                            <div className="mt-2 flex overflow-x-auto">
                              {ourProductEdit.product_images &&
                                ourProductEdit.product_images.map(
                                  (imageUrl: string, index: number) => (
                                    <div key={index}>
                                      <div className="relative inline-block	m-2 w-20 h-20 items-center">
                                        <img
                                          src={imageUrl}
                                          alt={`Image ${index + 1}`}
                                          className="w-20 h-20 m-2"
                                        />
                                        <div className="absolute p-2 bottom-10 right-0 left-16">
                                          <i
                                            className="fa fa-times"
                                            aria-hidden="true"
                                            onClick={() =>
                                              handleDeleteImageApiCall(imageUrl)
                                            }
                                          ></i>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Product Icon
                                <span className="productIconOption">
                                  (Minimum Size 500*500, JPG, PNG, SVG)
                                </span>
                              </label>
                              <div className="flex">
                                <input
                                  className="px-2 py-2 w-full rounded-md ... dialogInput"
                                  value={ourProductEdit?.product_logo}
                                  readOnly
                                  style={{
                                    whiteSpace: "pre-line",
                                    lineBreak: "auto",
                                  }}
                                />
                                <input
                                  className="opacity-0 w-0"
                                  id="file_input2"
                                  type="file"
                                  onChange={handleFileChangeIcon}
                                  multiple
                                />

                                <div className="rounded-md p-2 px-9 formLoginButton ml-2">
                                  <label
                                    className="text-sm font-medium text-center formLoginBtnname cursor-pointer"
                                    htmlFor="file_input2"
                                  >
                                    Upload
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          {showIconCountUpload === true && (
                            <div className="mt-2 flex overflow-x-auto">
                              <div
                                className="grid pl-2"
                                style={{ width: "calc(7 * 84px)" }}
                              >
                                {productLogo && (
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
                                              onClick={handleImageCancel}
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

                          {showIconCount === true && (
                            <div
                              className="grid pl-2"
                              style={{ width: "calc(7 * 100px)" }}
                            >
                              <div className="mt-2 flex overflow-x-auto">
                                <div>
                                  <div className="relative inline-block	m-2 w-20 h-20 items-center">
                                    <img
                                      src={ourProductEdit?.product_logo}
                                      className="w-20 h-20 m-2"
                                    />
                                    <div className="absolute p-2 bottom-10 right-0 left-16">
                                      <i
                                        className="fa fa-times"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <ToastContainer />
                        </div>
                      </div>
                    </div>
                    {isFormEmpty &&
                      (selectedImages.length > 0 ||
                      (ourProductEdit.product_images &&
                        ourProductEdit.product_images.length > 0) ? (
                        <div className="text-center mb-4">
                          <button
                            className="px-12 py-3 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButton"
                            onClick={handleUpdateProducts}
                          >
                            Update
                          </button>
                        </div>
                      ) : (
                        <div className="text-center mb-4">
                          <button className="px-12 py-3 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButtondelete">
                            Update
                          </button>
                        </div>
                      ))}
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

export default OurProductEdit;
