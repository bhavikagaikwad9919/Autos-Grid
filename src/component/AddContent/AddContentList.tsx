import ViewIcon from "../../assets/carbon_view.png";
import EditIcon from "../../assets/editIcon.png";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import cancelIcon from "../../assets/cancelIcon.png";
import Loader from "../Loader";
import { ToastContainer } from "react-toastify";
import parse from "html-react-parser";
import { useNavigate } from "react-router";
import "../../custom-styles.css";

const AddContentList = () => {
  interface contentData {
    id: number;
    page_title: string;
    page_description: string;
    is_active: number;
    created_at: string | null;
    updated_at: string | null;
  }
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedData, setSelectedData] = useState<contentData | null>(null);
  const [contentData, setContentData] = useState<contentData[]>([]);
  const [loader, setLoader] = useState(false);

  let navigate = useNavigate();

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    if (selectedData !== null) {
      setSelectedData({
        ...selectedData,
        page_description: data,
      });
    }
  };

  const cancelButtonRef = useRef(null);

  const handleEdit = (id: any) => {
    setOpen(true);
    setEditId(id);
    const selectedPage = contentData.find((item) => item.id === id);
    setSelectedData(selectedPage || null);
  };

  const handleView = (id: any) => {
    setOpenView(true);
    setEditId(id);
    const selectedPage = contentData.find((item) => item.id === id);
    setSelectedData(selectedPage || null);
  };

  const token = localStorage.getItem("tokenLogin");

  const handlecustompages = async () => {
    try {
      const fetch = window.fetch;
      window.fetch = async (...args) => {
        const result = await fetch(...args);
        if (result.status === 500) {
          navigate("/");
        }
        return result;
      };
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/custom_pages`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      setContentData(data.data);
      setLoader(true);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  useEffect(() => {
    handlecustompages();
  }, []);

  const handleUpdate = (id: number, updatedPageDescription: string) => {
    const apiUrl = `${
      import.meta.env.VITE_APP_BASE_URL
    }/api/custom_page_update`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        page_id: id,
        page_description: updatedPageDescription,
      }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log("Updated data:", updatedData);
        const updatedContentData = contentData.map((item) =>
          item.id === id
            ? { ...item, page_description: updatedPageDescription, page_id: id }
            : item
        );
        setContentData(updatedContentData);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  function truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }

  return (
    <>
      {loader ? (
        <div className="bg-gray-100 mt-14">
          <table className="border-collapse border-none w-full bg-white ">
            <thead className="text-transform: uppercase">
              <tr className="border-b-2 border-gray-100">
                <th className=" text-xs font-medium py-3 px-5 text-left tableth">
                  Page Name
                </th>

                <th className=" text-xs font-medium py-3 px-5 text-left tableth">
                  Content
                </th>
                <th className=" text-xs font-medium py-3 px-5 text-left tableth">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {contentData.map((item, index) => (
                <tr
                  className="transition duration-300 ease-in-out hover:bg-gray-100 border-b-2 border-gray-100 py-4 px-5 bg-white text-sm font-medium text-left"
                  key={index}
                >
                  <td className="py-4 px-5 text-sm font-medium contentlable text-left">
                    {item.page_title}
                  </td>
                  <td className="py-4 px-5  text-sm font-medium tabletd text-left">
                    <div className="tableDetail">
                      {parse(truncateString(item.page_description, 100))}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm font-medium tabletd text-left">
                    <div className="cursor-pointer tooltip-container">
                      <img
                        src={ViewIcon}
                        onClick={() => handleView(item.id)}
                        className="cursor-pointer"
                      />
                      <div className="tooltip px-2">View</div>
                    </div>
                    <div className="cursor-pointer tooltip-container">
                      <img
                        src={EditIcon}
                        className="ml-3 cursor-pointer"
                        onClick={() => handleEdit(item.id)}
                      />
                      <div className="tooltip px-2">Edit</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mb-42">
          {" "}
          <Loader />
        </div>
      )}

      <ToastContainer />

      {open && selectedData && (
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

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex w-3/5 min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 my-0 mx-auto">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dialogmain">
                    <div className="bg-white px-3 py-3 dialogmain">
                      <div className="sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end"
                            onClick={() => setOpen(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            {selectedData.id === 1
                              ? "Edit Terms and Condition"
                              : selectedData.id === 2
                              ? "Edit Help"
                              : "Edit About Us"}
                          </Dialog.Title>
                          <div className="px-2 py-2 mb-4">
                            <div className="mt-2 flex mt-2">
                              <div className="grid">
                                <label className="text-sm font-medium mb-2 dialogtextcolor">
                                  {selectedData.id === 1
                                    ? "Enter Terms and Condition section content"
                                    : selectedData.id === 2
                                    ? "Enter help section content"
                                    : "Enter About Us section content"}
                                </label>

                                <div style={{ width: "500px" }}>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                      toolbar: {
                                        items: [
                                          "undo",
                                          "redo",
                                          "|",
                                          "heading",
                                          "|",
                                          "fontfamily",
                                          "fontsize",
                                          "fontColor",
                                          "fontBackgroundColor",
                                          "|",
                                          "bold",
                                          "italic",
                                          "strikethrough",
                                          "subscript",
                                          "superscript",
                                          "code",
                                          "|",
                                          "link",
                                          "uploadImage",
                                          "blockQuote",
                                          "codeBlock",
                                          "|",
                                          "bulletedList",
                                          "numberedList",
                                          "todoList",
                                          "outdent",
                                          "indent",
                                        ],
                                        shouldNotGroupWhenFull: false,
                                      },
                                      heading: {
                                        options: [
                                          {
                                            model: "paragraph",
                                            title: "Paragraph",
                                            class: "ck-heading_paragraph",
                                          },
                                          {
                                            model: "heading1",
                                            view: "h1",
                                            title: "Heading 1",
                                            class: "ck-heading_heading1",
                                          },
                                          {
                                            model: "heading2",
                                            view: "h2",
                                            title: "Heading 2",
                                            class: "ck-heading_heading2",
                                          },
                                          {
                                            model: "heading3",
                                            view: "h3",
                                            title: "Heading 3",
                                            class: "ck-heading_heading3",
                                          },
                                        ],
                                      },
                                    }}
                                    data={selectedData.page_description}
                                    onReady={(editor) => {
                                      console.log(
                                        "CKEditor React Component is ready to use!",
                                        editor
                                      );
                                    }}
                                    onChange={handleEditorChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        className="mb-5 px-20 py-2 uppercase mx-32 rounded-md text-sm font-medium text-center formLoginButton cursor-pointer"
                        onClick={() =>
                          handleUpdate(
                            editId || 0,
                            selectedData.page_description
                          )
                        }
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
      {openView && selectedData && (
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
                            className="items-end"
                            onClick={() => setOpenView(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle mb-5 "
                          >
                            {selectedData.id === 1
                              ? "Terms and Condition"
                              : selectedData.id === 2
                              ? "Help"
                              : "About Us"}
                          </Dialog.Title>

                          <div className="px-3 pb-4">
                            <div className="viewAddContent">
                              <div className="w-80">
                                <div className="font-medium text-sm mx-5 mt-3">
                                  <ul className="list-disc mt-3">
                                    <div>
                                      {parse(selectedData.page_description)}
                                    </div>
                                  </ul>
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
    </>
  );
};

export default AddContentList;
