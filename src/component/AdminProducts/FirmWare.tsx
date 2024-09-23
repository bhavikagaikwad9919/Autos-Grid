import { ChangeEvent, FC, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancelIcon from "../../assets/cancelIcon.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FirmwareEdit {
  version: string;
  description: string;
  bin_file: string;
  json_file: string;
  product_id: number;
  id: number;
}

interface FirmWareProps {
  firmwareProductId: any;
  validationpopupFirmWare: any;
  firmwareshow: boolean;
  setFirmwareShow: (value: boolean) => void;
  firmwareUpgrade: boolean;
  setFirmwareUpgrade: (value: boolean) => void;
  firmwareDelete: boolean;
  setFirmwareDelete: (value: boolean) => void;
  firmwareView: boolean;
  setFirmwareView: (value: boolean) => void;
  firmwareEdit: boolean;
  setFirmwareEdit: (value: boolean) => void;
  setVersion: (value: string) => void;
  version: string;
  firmdescription: string;
  setFirmdescription: (description: string) => void;
  setBinFile: (file: File | null) => void;
  binFile: File | null;
  setJsonFile: (file: File | null) => void;
  jsonFile: File | null;
  handleAddFirmware: () => void;
  handleFirmwareDelete: () => void;
  handleFirmWareEditApi: (firmware_id: any, product_id: any) => void;
  handleFirmwareView: (firmware_id: any, product_id: any) => void;
  handleFirmwareUpgrade: () => void;
  VersionError: boolean;
  setVersionError: (error: boolean) => void;
  descriptionError: boolean;
  setDescriptionError: (error: boolean) => void;
  binFileError: boolean;
  binFileVersionError: boolean;
  addVersionError: boolean;
  setBinFileError: (error: boolean) => void;
  setBinFileVersionError: (error: boolean) => void;
  setaddVersionError: (error: boolean) => void;
  jsonFileError: boolean;
  addjsonFileError: boolean;
  setJsonFileError: (error: boolean) => void;
  firmware: any;
  viewFirmware: any;
  firmWaregetEdit: FirmwareEdit;
  setFirmWaregetEdit: React.Dispatch<React.SetStateAction<FirmwareEdit>>;
  firmWaregetVersion: any[];
  handleUpdateFirmware: () => void;
  setAddJsonFileError: (error: boolean) => void;
}

const FirmWare: FC<FirmWareProps> = ({
  firmwareProductId,
  firmwareshow,
  setFirmwareShow,
  firmwareUpgrade,
  setFirmwareUpgrade,
  firmwareDelete,
  setFirmwareDelete,
  firmwareView,
  setFirmwareView,
  firmwareEdit,
  setFirmwareEdit,
  setVersion,
  version,
  firmdescription,
  setFirmdescription,
  setBinFile,
  binFile,
  setJsonFile,
  jsonFile,
  handleAddFirmware,
  VersionError,
  setVersionError,
  setDescriptionError,
  descriptionError,
  binFileError,
  addVersionError,
  setJsonFileError,
  jsonFileError,
  setBinFileError,
  handleFirmwareDelete,
  viewFirmware,
  firmWaregetEdit,
  setFirmWaregetEdit,
  firmWaregetVersion,
  handleFirmwareUpgrade,
  handleUpdateFirmware,
  setaddVersionError,
  addjsonFileError,
  setAddJsonFileError,
}) => {
  const cancelButtonRef = useRef(null);
  const handleFileChange =
    (
      setter: (file: File | null) => void,
      ...additionalCallbacks: (() => void)[]
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const file = input.files ? input.files[0] : null;
      setter(file);
      additionalCallbacks.forEach((callback) => callback());
      input.value = "";
    };

  const handleFileChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "bin" | "json"
  ) => {
    const input = e.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      setFirmWaregetEdit((prev) => ({
        ...prev,
        [`${fileType}_file`]: file.name,
      }));

      if (fileType === "bin") {
        setBinFile(file);
        setBinFileError(false);
      } else {
        setJsonFile(file);
        setJsonFileError(false);
      }
      input.value = "";
    }
  };
  const handleCancelAdd = () => {
    setFirmwareShow(false);
    setVersion("");
    setFirmdescription("");
    setFirmdescription("");
    setVersion("");
    setVersionError(false);
    setDescriptionError(false);
    setFirmdescription("");
    setBinFile(null);
    setBinFileError(false);
    setJsonFile(null);
    setJsonFileError(false);
    setAddJsonFileError(false);
    setaddVersionError(false);
    setFirmwareShow(false);
  };
  const handleCancelAddFirmware = () => {
    setFirmwareShow(false);
  };

  return (
    <div>
      {firmwareshow && (
        <Transition.Root show={firmwareshow} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={handleCancelAddFirmware}
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
                            onClick={handleCancelAdd}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Firmware update
                          </Dialog.Title>
                          {firmWaregetVersion.length > 0 ? (
                            firmWaregetVersion
                              .filter(
                                (item: any) =>
                                  item.product_id === firmwareProductId
                              )
                              .filter(
                                (item: any) =>
                                  item !== null && item !== undefined
                              )
                              .map((item: any, index: any) => (
                                <input
                                  key={index}
                                  className="mt-4 flex px-2 py-2 w-full h-7 rounded-md ... dialogInput"
                                  value={`Last update details: ${item.last_update_version}`}
                                  readOnly
                                />
                              ))
                          ) : (
                            <p>No firmware updates available.</p>
                          )}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Enter Firmware Version
                              </label>
                              <input
                                className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                  VersionError || addVersionError
                                    ? "redFocusBorder"
                                    : ""
                                }`}
                                placeholder="Enter"
                                value={version}
                                onChange={(e) => {
                                  setVersion(e.target.value);
                                  setVersionError(false);
                                  setaddVersionError(false);
                                }}
                              ></input>
                              {VersionError && (
                                <p className="text-pink-600 text-xs mt-1">
                                  The version field is required.
                                </p>
                              )}
                              {addVersionError && (
                                <p className="text-pink-600 text-xs mt-1">
                                  The version must be greater than the previous
                                  version.
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 DescriptionWidth">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Enter Description
                              </label>
                              <div>
                                <div className="relative w-full min-w-[200px] bg-white">
                                  <textarea
                                    className={`peer h-full min-h-[100px] w-full resize-none rounded-[8px] border border-slate-300 p-2${
                                      descriptionError ? "redFocusBorder" : ""
                                    }`}
                                    placeholder="Enter Description"
                                    value={firmdescription}
                                    onChange={(e) => {
                                      setFirmdescription(e.target.value);
                                      setDescriptionError(false);
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          {descriptionError && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              The description field is required.
                            </p>
                          )}

                          <div>
                            <div className="mt-2 flex">
                              <div className="grid mt-3.5 w-full">
                                <label className="text-sm font-medium mb-2 dialogtextcolor">
                                  .bin File
                                </label>
                                <div className="flex">
                                  <input
                                    className={`px-2 py-2 w-full rounded-md dialogInput ${
                                      binFileError ? "redFocusBorder" : ""
                                    }`}
                                    placeholder="Select File"
                                    value={binFile ? binFile.name : ""}
                                    readOnly
                                  />
                                  <input
                                    className="opacity-0 w-0"
                                    id="file_input"
                                    type="file"
                                    accept=".bin"
                                    onChange={handleFileChange(setBinFile, () =>
                                      setBinFileError(false)
                                    )}
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
                            {binFileError && (
                              <p className="mt-2 absolute text-pink-600 text-xs">
                                The bin file field is required.
                              </p>
                            )}

                            <div className="mt-2 flex">
                              <div className="grid mt-3.5 w-full">
                                <label className="text-sm font-medium mb-2 dialogtextcolor">
                                  .json File
                                </label>
                                <div className="flex">
                                  <input
                                    className={`px-2 py-2 w-full rounded-md dialogInput ${
                                      jsonFileError || addjsonFileError
                                        ? "redFocusBorder"
                                        : ""
                                    }`}
                                    placeholder="Select File"
                                    value={jsonFile ? jsonFile.name : ""}
                                    readOnly
                                    style={{
                                      whiteSpace: "pre-line",
                                      lineBreak: "auto",
                                    }}
                                  />
                                  <input
                                    className="opacity-0 w-0"
                                    id="file_input1"
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileChange(
                                      setJsonFile,
                                      () => {
                                        setJsonFileError(false);
                                        setAddJsonFileError(false);
                                      }
                                    )}
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
                          </div>

                          {jsonFileError && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              The json file field is required.
                            </p>
                          )}
                          {addjsonFileError && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              Version mismatch in json file.
                            </p>
                          )}

                          <ToastContainer />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <button
                        className="px-12 py-3 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButton"
                        onClick={handleAddFirmware}
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

      {firmwareUpgrade && (
        <Transition.Root show={firmwareUpgrade} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setFirmwareUpgrade}
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
                    <div className="bg-white px-6 py-6 dialogmain w-72">
                      <div className="sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end cursor-pointer"
                            onClick={() => setFirmwareUpgrade(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Firmware update
                          </Dialog.Title>
                          <div>
                            <div className="mb-12 mt-9">
                              Are you sure you want to send Firmware update Ver{" "}
                              {viewFirmware.version}?
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className="grid mr-2 text-left px-10 py-2 firmwareUpgradeButton focus:outline-none"
                                onClick={handleFirmwareUpgrade}
                              >
                                Yes
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={() => setFirmwareUpgrade(false)}
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

      {firmwareDelete && (
        <Transition.Root show={firmwareDelete} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setFirmwareDelete}
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
                            onClick={() => setFirmwareDelete(false)}
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
                              This will delete all the data related to Firmware
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className="grid mr-2 text-left px-10 py-2 formLoginButton"
                                onClick={handleFirmwareDelete}
                              >
                                Yes
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={() => {
                                  setFirmwareDelete(false);
                                }}
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

      {firmwareView && (
        <Transition.Root show={firmwareView} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setFirmwareView}
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
                            onClick={() => setFirmwareView(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle mt-2"
                          >
                            FirmWare Update
                          </Dialog.Title>
                          <div className="px-3">
                            <div>version: {viewFirmware.version}</div>
                            <div>
                              previous version:{" "}
                              {viewFirmware.last_update_version}
                            </div>
                            <div>Description: {viewFirmware.description}</div>
                            <div>Bin File: {viewFirmware.bin_file}</div>
                            <div>Json File: {viewFirmware.json_file}</div>
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

      {firmwareEdit && (
        <Transition.Root show={firmwareEdit} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setFirmwareEdit}
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
                            onClick={() => {
                              setFirmwareEdit(false);
                            }}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Firmware update
                          </Dialog.Title>

                          <input
                            className="mt-8 flex px-2 py-2 w-full h-7 rounded-md ... dialogInput"
                            value={`Last update details: ${viewFirmware.last_update_version}`}
                            readOnly
                          />
                          {/* : (
                            <p>No firmware updates available.</p>
                          ) */}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Enter Firmware Version
                              </label>
                              <input
                                className={`px-2 py-2 w-full rounded-md ... dialogInput ${
                                  VersionError || addVersionError
                                    ? "redFocusBorder"
                                    : ""
                                }`}
                                placeholder="Enter"
                                value={firmWaregetEdit.version}
                                onChange={(e) => {
                                  setFirmWaregetEdit({
                                    ...firmWaregetEdit,
                                    version: e.target.value,
                                  });
                                  setVersionError(false);
                                }}
                              ></input>
                            </div>
                          </div>
                          {VersionError && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              The version field is required.
                            </p>
                          )}
                          {addVersionError && (
                            <p className="text-pink-600 text-xs mt-1">
                              The version must be greater than the previous
                              version.
                            </p>
                          )}

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 DescriptionWidth">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Enter Description
                              </label>
                              <div>
                                <div className="relative w-full min-w-[200px] bg-white">
                                  <textarea
                                    className={`peer h-full min-h-[100px] w-full resize-none rounded-[8px] border border-slate-300 p-2${
                                      descriptionError ? "redFocusBorder" : ""
                                    }`}
                                    placeholder="Enter Description"
                                    value={firmWaregetEdit.description}
                                    onChange={(e) => {
                                      setFirmWaregetEdit({
                                        ...firmWaregetEdit,
                                        description: e.target.value,
                                      });
                                      setDescriptionError(false);
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          {descriptionError && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              The description field is required.
                            </p>
                          )}
                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                .bin File
                              </label>
                              <div className="flex">
                                <input
                                  className={`px-2 py-2 w-full rounded-md dialogInput ${
                                    binFileError ? "redFocusBorder" : ""
                                  }`}
                                  placeholder="Select File"
                                  value={firmWaregetEdit.bin_file}
                                  readOnly
                                />
                                <input
                                  className="opacity-0 w-0"
                                  id="file_input_bin"
                                  type="file"
                                  accept=".bin"
                                  onChange={(e) => {
                                    handleFileChangeEdit(e, "bin"),
                                      setBinFileError(false);
                                  }}
                                />
                                <div className="rounded-md p-2 px-9 formLoginButton ml-2">
                                  <label
                                    className="text-sm font-medium text-center formLoginBtnname cursor-pointer"
                                    htmlFor="file_input_bin"
                                  >
                                    Upload
                                  </label>
                                </div>
                              </div>
                              {binFileError && (
                                <p className="text-pink-600 text-xs mt-1">
                                  .bin file is required
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-2 flex">
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                .json File
                              </label>
                              <div className="flex">
                                <input
                                  className={`px-2 py-2 w-full rounded-md dialogInput ${
                                    jsonFileError || addjsonFileError
                                      ? "redFocusBorder"
                                      : ""
                                  }`}
                                  placeholder="Select File"
                                  value={firmWaregetEdit.json_file}
                                  readOnly
                                />
                                <input
                                  className="opacity-0 w-0"
                                  id="file_input_json"
                                  type="file"
                                  accept=".json"
                                  onChange={(e) => {
                                    handleFileChangeEdit(e, "json"),
                                      setAddJsonFileError(false);
                                  }}
                                />
                                <div className="rounded-md p-2 px-9 formLoginButton ml-2">
                                  <label
                                    className="text-sm font-medium text-center formLoginBtnname cursor-pointer"
                                    htmlFor="file_input_json"
                                  >
                                    Upload
                                  </label>
                                </div>
                              </div>
                              {jsonFileError && (
                                <p className="text-pink-600 text-xs mt-1">
                                  .json file is required
                                </p>
                              )}
                            </div>
                          </div>
                          {addjsonFileError && (
                            <p className="mt-2 absolute text-pink-600 text-xs">
                              Version mismatch in json file.
                            </p>
                          )}
                          <ToastContainer />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <button
                        className="px-12 py-3 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButton"
                        onClick={handleUpdateFirmware}
                      >
                        Update
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

export default FirmWare;
