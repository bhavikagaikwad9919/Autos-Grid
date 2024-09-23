import sortingIcon from "../../assets/column-sorting.png";
import ViewIcon from "../../assets/carbon_view.png";
import DeleteIcon from "../../assets/DeleteIcon.png";
import EditIcon from "../../assets/editIcon.png";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import Pagination from "../Pagination/Pagination";
import NoData from "../NoData/NoData";
import { useNavigate } from "react-router-dom";
import FirmWare from "./FirmWare";
import OurProductDailog from "./OurProductDailog";
import OurProductEdit from "./OurProductEdit";
import OurProductView from "./OurProductView";
import OurProductDelete from "./OurProductDelete";

const initialStateFirmware = {
  version: "",
};

interface DropdownItem {
  id: number;
  status_name: string;
}

interface FirmwareEdit {
  version: string;
  description: string;
  bin_file: string;
  json_file: string;
}

interface Product {
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
}

interface FirmWare {
  product_name: string;
  product_id: number;
  last_update_date: string | null;
  last_update_version: string | null;
  latest_update_version: string | null;
  status: string | null | number;
  firmware_id: number;
}

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
const initialState = {
  long_description: "",
  product_images: "",
  product_name: "",
  product_youtube_url: "",
  short_description: "",
  product_logo: "",
};

interface DataCounts {
  userCount: number;
  userDeleteCount: number;
  productCount: number;
  deviceCount: number;
  userWatcherCount: number;
  userTankerCount: number;
}

interface FirmwareEdit {
  version: string;
  description: string;
  bin_file: string;
  json_file: string;
  product_id: number;
  id: number;
}

const OurProducts = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [productName, setProductName] = useState("");
  const [productyoutubeurl, setproductyoutubeurl] = useState("");
  const [launchStatus, setLaunchStatus] = useState<any>();
  const [statusID, setStatusId] = useState<any>();
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [productLogo, setProductLogo] = useState<any>({});
  const [openView, setOpenView] = useState(false);
  const [dropDown, setDropdown] = useState<DropdownItem[]>([]);
  const [ourProduct, setOurProduct] = useState<Product[]>([]);
  const [ourProductEdit, setOurProductEdit] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteName, setDeleteName] = useState();
  const [productDataId, setProductDataId] = useState<any>(null);
  const [ourProductView, setOurProductView] = useState<Productid | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [maxLength, setmaxLength] = useState(1);
  const [totalItemsOnPage, setTotalItemsOnPage] = useState(1);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [total, setTotal] = useState(1);
  const [showImageCount, setShowImageCount] = useState(false);
  const [validationpopup, setValidationPopup] = useState(initialState);
  const [validationpopupFirmWare, setValidationPopupFirmWare] =
    useState(initialStateFirmware);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [launchStatusPopup, setLaunchStatusPopup] = useState(false);
  const [showIconCount, setShowIconCount] = useState(false);
  const [showIconCountUpload, setShowIconCountUpload] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [isDelayOver, setIsDelayOver] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [firmwareshow, setFirmwareShow] = useState(false);
  const [firmwareUpgrade, setFirmwareUpgrade] = useState(false);
  const [firmwareDelete, setFirmwareDelete] = useState(false);
  const [firmwareView, setFirmwareView] = useState(false);
  const [firmwareEdit, setFirmwareEdit] = useState(false);
  const [userCount, setUserCount] = useState<DataCounts>();
  const [firmware, setFirmware] = useState<FirmWare[]>([]);
  const [version, setVersion] = useState("");
  const [firmdescription, setFirmdescription] = useState("");
  const [binFile, setBinFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [firmwareProductId, setFirmwareProductId] = useState("");
  const [VersionError, setVersionError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [binFileError, setBinFileError] = useState(false);
  const [binFileVersionError, setBinFileVersionError] = useState(false);
  const [addVersionError, setaddVersionError] = useState(false);
  const [jsonFileError, setJsonFileError] = useState(false);
  const [addjsonFileError, setAddJsonFileError] = useState(false);
  const [firmwareId, setFirmwareId] = useState("");
  const [viewFirmware, setViewFirmWare] = useState("");
  const [firmWarepostUpgrade, setFirmWarepostUpgrade] = useState("");
  const [firmWaregetEdit, setFirmWaregetEdit] = useState<FirmwareEdit>({
    version: "",
    description: "",
    bin_file: "",
    json_file: "",
    product_id: 0,
    id: 0,
  });
  const [firmWaregetVersion, setFirmWaregetVersion] = useState<any>([]);

  const [selectedTabItem, setSelectedTabItem] = useState({
    id: 1,
    name: "Products",
    action: true,
    count: userCount?.userCount || 0,
  });

  let navigate = useNavigate();

  const tabData = [
    {
      id: 1,
      name: "Products",
      action: true,
      count: userCount?.productCount || 0,
    },
    {
      id: 2,
      name: "Updates",
      action: false,
      count: null,
    },
  ];
  console.log(setValidationPopupFirmWare);
  const handleFirmWareUpdate = (product_id: any) => {
    setFirmwareShow(true);
    setFirmwareProductId(product_id);
    handleFirmwaregetversion(product_id);
  };

  const handleFirmWareUpgrade = (firmware_id: any, product_id: any) => {
    setFirmwareUpgrade(true);
    setFirmWarepostUpgrade(firmware_id);
    handleFirmwareView(firmware_id, product_id);
  };

  const handleFirmWareDelete = (firmware_id: any) => {
    setFirmwareDelete(true);
    console.log("product_id upgrade", firmware_id);
    setFirmwareId(firmware_id);
  };

  const handleViewFirmware = (firmware_id: any, product_id: any) => {
    setFirmwareView(true);
    handleFirmwareView(firmware_id, product_id);
  };

  const handleUserCount = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/admin_dashboard`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      setUserCount(data.data);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleTabClick = (item: any) => {
    setSelectedTabItem(item);
  };

  const HandleAddProductPop = () => {
    setOpen(false);
    setProductLogo("");
    setShowImageCount(false);
    setShowIconCount(false);
    setShowIconCountUpload(false);
    setProductName("");
    setLaunchStatus("");
    setShortDescription("");
    setSelectedImages([]);
    setLongDescription("");
    setproductyoutubeurl("");
    setValidationPopup(initialState);
    setLaunchStatusPopup(false);
  };

  const message = "Products per page";

  const token = localStorage.getItem("tokenLogin");

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

  const handleFileChangeIcon = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const validImageTypes = ["image/svg+xml", "image/jpeg", "image/jpg"];
      const newImages = Array.from(files)
        .filter((file) => {
          return validImageTypes.includes(file.type);
        })
        .map((file) => {
          const imageUrl = URL.createObjectURL(file);
          const imageObject = {
            name: file.name,
            file,
            imageUrl: imageUrl,
          };
          setProductLogo(imageObject);
          return imageObject;
        });
      console.log("newimage", newImages);
      setShowIconCount(true);
      setShowIconCountUpload(true);
    } else {
      setProductLogo("");
    }
  };

  const handleAddProduct = () => {
    setOpen(true);
    setShowIconCountUpload(false);
  };

  const handleView = (id: any) => {
    setOpenView(true);
    handleViewProductApi(id);
  };

  const handleDelete = (id: any, name: any) => {
    setDeleteName(name);
    setOpenDelete(true);
    setDeleteId(id);
  };

  const handleViewProductApi = async (id: any) => {
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
        setOurProductView(data.data);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleedit = async (id: any) => {
    try {
      const data = await handleEditProductApi(id);
      setProductDataId(data);
      setOpenEdit(true);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleourProduct = async () => {
    try {
      const fetch = window.fetch;
      window.fetch = async (...args) => {
        const result = await fetch(...args);

        if (result.status === 500) {
          navigate("/");
        }
        return result;
      };

      var apiUrl = null;
      if (search === "") {
        apiUrl = `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/get_product_list?page=${currentPage}`;
      } else {
        apiUrl = `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/get_product_list?search_key=${search}&page=${currentPage}`;
      }

      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await dataResponse.json();

      if (data.status_code === 200) {
        setOurProduct(data.data.data);
        const calc = Math.ceil(data.data.total / data.data.per_page);
        setLastPage(calc);
        setmaxLength(calc);
        setTotalItemsOnPage(data.data.data.length);
        setFrom(data.data.from);
        setTo(data.data.to);
        setTotal(data.data.total);
        setLoader(true);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleFirmWare = async () => {
    try {
      const fetch = window.fetch;
      window.fetch = async (...args) => {
        const result = await fetch(...args);

        if (result.status === 500) {
          navigate("/");
        }
        return result;
      };

      var apiUrl = null;

      apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/get_firmware?page=${currentPage}`;

      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await dataResponse.json();

      if (data.status_code === 200) {
        setFirmware(data.data.data);
        const calc = Math.ceil(data.data.total / data.data.per_page);
        setLastPage(calc);
        setmaxLength(calc);
        setTotalItemsOnPage(data.data.data.length);
        setFrom(data.data.from);
        setTo(data.data.to);
        setTotal(data.data.total);
        setLoader(true);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleAddFirmware = async () => {
    try {
      const formData = new FormData();
      formData.append("product_id", firmwareProductId);
      formData.append("version", version);
      formData.append("description", firmdescription);
      if (binFile) {
        formData.append("bin_file", binFile);
      }
      if (jsonFile) {
        formData.append("json_file", jsonFile);
      }

      console.log("FormData content:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/add_firmware`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("API response:", responseData);

      setVersionError(!version);
      setDescriptionError(!firmdescription);
      setBinFileError(!binFile);
      setBinFileVersionError(!binFile);
      setJsonFileError(!jsonFile);

      if (responseData.status_code === 200) {
        setVersion("");
        setVersionError(false);
        setDescriptionError(false);
        setFirmdescription("");
        setBinFile(null);
        setBinFileError(false);
        setBinFileVersionError(false);
        setJsonFile(null);
        setJsonFileError(false);
        setAddJsonFileError(false);
        setaddVersionError(false);
        setFirmwareShow(false);
        handleFirmWare();
      } else if (responseData.status_code === 201) {
        if (
          responseData?.data?.version &&
          responseData.data.version[0] ===
            "The version must be greater than the previous version."
        ) {
          setaddVersionError(true);
          setAddJsonFileError(false);
        } else if (
          responseData?.data?.json_file &&
          responseData.data.json_file[0] === "Version mismatch in json file."
        ) {
          setAddJsonFileError(true);
          setJsonFileError(false);
        } else if (
          responseData?.data?.json_file &&
          responseData.data.json_file[0] === "Files not uploaded please check"
        ) {
          setJsonFileError(true);
          setAddJsonFileError(false);
        }
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleUpdateFirmware = async () => {
    try {
      const formData = new FormData();
      formData.append("product_id", String(firmWaregetEdit.product_id));
      formData.append("version", firmWaregetEdit.version);
      formData.append("description", firmWaregetEdit.description);
      formData.append("firmware_id", String(firmWaregetEdit.id));

      if (binFile) {
        formData.append("bin_file", binFile);
      } else if (firmWaregetEdit.bin_file) {
        const response = await fetch(firmWaregetEdit.bin_file);
        const fileBlob = await response.blob();
        formData.append("bin_file", new File([fileBlob], "firmware.bin"));
      }

      if (jsonFile) {
        formData.append("json_file", jsonFile);
      } else if (firmWaregetEdit.json_file) {
        const response = await fetch(firmWaregetEdit.json_file);
        const fileBlob = await response.blob();
        formData.append("json_file", new File([fileBlob], "firmware.json"));
      }

      console.log("FormData content:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/edit_firmware`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("API response:", responseData);

      if (responseData.status_code === 200) {
        setFirmwareEdit(false);
        setVersion("");
        setVersionError(false);
        setDescriptionError(false);
        setFirmdescription("");
        setBinFile(null);
        setBinFileError(false);
        setBinFileVersionError(false);
        setJsonFile(null);
        setJsonFileError(false);
        setFirmwareShow(false);
        setAddJsonFileError(false);
        setaddVersionError(false);
        handleFirmWare();
      } else if (responseData.status_code === 201) {
        if (
          responseData?.data?.version &&
          responseData.data.version[0] ===
            "The version must be greater than the previous version."
        ) {
          setaddVersionError(true);
          setAddJsonFileError(false);
        } else if (
          responseData?.data?.json_file &&
          responseData.data.json_file[0] === "Version mismatch in json file."
        ) {
          setAddJsonFileError(true);
          setJsonFileError(false);
        } else if (
          responseData?.data?.json_file &&
          responseData.data.json_file[0] === "Files not uploaded please check"
        ) {
          setJsonFileError(true);
          setAddJsonFileError(false);
        }
      }

      !firmWaregetEdit.version && setVersionError(true);
      !firmWaregetEdit.description && setDescriptionError(true);
      (!binFile && !firmWaregetEdit.bin_file && setBinFileError(true)) ||
        setBinFileVersionError(true);
      !jsonFile && !firmWaregetEdit.json_file && setJsonFileError(true);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleFirmwareDelete = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/delete_firmware?firmware_id=${firmwareId}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        setFirmwareDelete(false);
        handleFirmWare();
      } else if (responseData.status_code === 201) {
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleFirmwareUpgrade = async () => {
    try {
      const payload = {
        firmware_id: firmWarepostUpgrade,
      };
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/upload_firmware`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        setFirmwareUpgrade(false);
        handleFirmWare();
      } else if (responseData.status_code === 201) {
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  const handleFirmwareView = async (firmware_id: any, product_id: any) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/view_firmware?product_id=${product_id}&firmware_id=${firmware_id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        setViewFirmWare(responseData.data);
      } else if (responseData.status_code === 201) {
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleFirmwaregetversion = async (firmware_id: any) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/get_firmware?firmware_id=${firmware_id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        console.log(responseData.data.data, "hello i am there");
        setFirmWaregetVersion(responseData.data.data);
        console.log(responseData.data.data, "versionfirmware");
      } else if (responseData.status_code === 201) {
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleFirmWareEditApi = async (firmware_id: any, product_id: any) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/view_firmware?product_id=${product_id}&firmware_id=${firmware_id}`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (data.status_code === 200) {
        setFirmWaregetEdit(data.data);
        console.log(data.data, "firmwareedit0000");
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleEditPopup = async (firmware_id: any, product_id: any) => {
    try {
      const data = await handleFirmWareEditApi(firmware_id, product_id);
      const dataversion = await handleFirmwareView(firmware_id, product_id);
      setProductDataId(data);
      console.log("editfirmwareversion", dataversion);
      setFirmwareEdit(true);
      setVersion("");
      setVersionError(false);
      setDescriptionError(false);
      setFirmdescription("");
      setBinFile(null);
      setBinFileError(false);
      setBinFileVersionError(false);
      setJsonFile(null);
      setJsonFileError(false);
      setAddJsonFileError(false);
      setaddVersionError(false);
      setFirmwareShow(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleOurDevice = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/get_product_launch_status`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await dataResponse.json();

      if (responseData.status && responseData.status_code === 200) {
        const dataArray = responseData.data;
        setDropdown(dataArray);
      } else {
        console.error("Error: ", responseData.message);
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
        console.log(data.data, "ourproductedit1111");
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

  const handleSearch = (event: any) => {
    event.preventDefault();
    handleourProduct();
  };
  const activateYesButton = () => {
    setTimeout(() => {
      setIsDelayOver(true);
    }, 5000);
  };

  useEffect(() => {
    if (openDeletePopup) {
      activateYesButton();
      setCountdown(5);
    }
  }, [openDeletePopup]);

  useEffect(() => {
    if (!isDelayOver && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isDelayOver, countdown]);

  useEffect(() => {
    if (openDeletePopup) {
      activateYesButton();
    }
  }, [openDeletePopup]);

  useEffect(() => {
    if (openDeletePopup) {
      activateYesButton();
    }
  }, [openDeletePopup]);

  useEffect(() => {
    handleUserCount();
    setCurrentPage(1);
  }, [selectedTabItem]);

  useEffect(() => {
    handleOurDevice();
    handleourProduct();
    handleFirmWare();
  }, [currentPage]);

  useEffect(() => {
    if (search == "") {
      handleourProduct();
    }
    setCurrentPage(1);
  }, [search]);

  console.log(productDataId);

  return (
    <>
      <div className="userAdminmain">
        <div className="userAdminSearch">
          <div className="grid grid-cols-2 place-content-between">
            <div>
              <form className="flex items-center ml-5 mb-7 mt-5">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none searchBox">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setSearch("");
                      } else {
                        setSearch(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch(e);
                    }}
                    type="search"
                    id="default-search"
                    className="block p-3 w-[280px] h-9 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus-visible:border-0"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="text-right mt-5 mr-6">
              <button
                className="text-sm font-medium cursor-pointer uppercase formLoginButton px-6 py-2"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>

          {ourProduct?.length > 0 && (
            <div className="flex userListMain ml-5 mb-4">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center overflow-y-hidden overflow-x-hidden">
                {tabData.map((item, i) => (
                  <li
                    className="self-center text-lg justify-center cursor-pointer mr-14"
                    key={i}
                    onClick={() => handleTabClick(item)}
                  >
                    <div
                      className={`flex ${
                        item.id === selectedTabItem.id
                          ? "text-[#133FA0] border-b-2 border-[#133FA0] active font-bold text-sm pb-2"
                          : "font-bold text-sm"
                      }`}
                    >
                      <span>{item.name}</span>
                      <div className="text-xs font-medium userListcount w-6 h-4 rounded-full ml-2 self-center">
                        <span className=" h-4">{item.count}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {loader ? (
          <div className="bg-gray-100">
            {ourProduct.length > 0 ? (
              <>
                <table className="border-collapse border-none w-full bg-white">
                  <thead className="text-transform: uppercase">
                    <tr className="border-b-2 border-gray-100">
                      {selectedTabItem.action && (
                        <>
                          <th className=" text-xs font-medium py-3 px-5 text-left tableth flex">
                            Product Name
                            <span>
                              <img src={sortingIcon} className="w-4 h-4"></img>
                            </span>
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            Date
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            Product launch Status
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            action
                          </th>
                        </>
                      )}
                    </tr>
                    <tr className="border-b-2 border-gray-100">
                      {!selectedTabItem.action && (
                        <>
                          <th className=" text-xs font-medium py-3 px-5 text-left tableth flex">
                            Product Name
                            <span>
                              <img src={sortingIcon} className="w-4 h-4"></img>
                            </span>
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            Last update date
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            Last updated version
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            latest update version
                          </th>
                          <th className="text-xs font-medium py-3 px-5 text-left tableth">
                            action
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {ourProduct.map((item, i) => (
                      <tr
                        key={i}
                        className="transition duration-300 ease-in-out hover:bg-gray-100 border-b-2 border-gray-100 py-4 px-5 bg-white text-sm font-medium text-left"
                      >
                        {selectedTabItem.action && (
                          <>
                            <td className="py-4 px-5 text-sm font-medium contentlable text-left">
                              {item.product_name}
                            </td>
                            <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                              {moment(item.created_at).format("DD/MM/YYYY")}
                            </td>
                            <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                              {item.status_name}
                            </td>
                            <td className="tabletdname text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap text-left">
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
                                  src={DeleteIcon}
                                  onClick={() =>
                                    handleDelete(item.id, item.product_name)
                                  }
                                  className="ml-3 cursor-pointer"
                                />
                                <div className="tooltip px-2">Delete</div>
                              </div>

                              <div className="cursor-pointer tooltip-container">
                                <img
                                  src={EditIcon}
                                  className="ml-3 cursor-pointer"
                                  onClick={() => handleedit(item.id)}
                                />
                                <div className="tooltip px-2">Edit</div>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {firmware.map((firm, j) => (
                      <tr
                        key={`firmware-${j}`}
                        className="transition duration-300 ease-in-out hover:bg-gray-100 border-b-2 border-gray-100 py-4 px-5 bg-white text-sm font-medium text-left"
                      >
                        {!selectedTabItem.action && (
                          <>
                            <td className="py-4 px-5 text-sm font-medium contentlable text-left">
                              {firm.product_name}
                            </td>
                            <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                              {firm.last_update_date}
                            </td>
                            <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                              {firm.last_update_version}
                            </td>
                            <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                              {firm.latest_update_version}
                            </td>
                            <td className="tabletdname text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap text-left">
                              {firm.status === null || 0 ? (
                                <div className="cursor-pointer tooltip-container">
                                  <button
                                    className="font-medium cursor-pointer uppercase firmwareUpdate"
                                    onClick={() =>
                                      handleFirmWareUpdate(firm.product_id)
                                    }
                                  >
                                    Upload Update
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <button
                                    className="mr-3 font-medium cursor-pointer uppercase firmwareUpgrade px-1 py-0.5"
                                    onClick={() =>
                                      handleFirmWareUpgrade(
                                        firm.firmware_id,
                                        firm.product_id
                                      )
                                    }
                                  >
                                    Publish
                                  </button>
                                  <div className="cursor-pointer tooltip-container">
                                    <img
                                      src={ViewIcon}
                                      onClick={() =>
                                        handleViewFirmware(
                                          firm.firmware_id,
                                          firm.product_id
                                        )
                                      }
                                      className="cursor-pointer"
                                      alt="View"
                                    />
                                    <div className="tooltip px-2">View</div>
                                  </div>

                                  <div className="cursor-pointer tooltip-container">
                                    <img
                                      src={DeleteIcon}
                                      onClick={() =>
                                        handleFirmWareDelete(firm.firmware_id)
                                      }
                                      className="ml-3 cursor-pointer"
                                      alt="Delete"
                                    />
                                    <div className="tooltip px-2">Delete</div>
                                  </div>

                                  <div className="cursor-pointer tooltip-container">
                                    <img
                                      src={EditIcon}
                                      className="ml-3 cursor-pointer"
                                      onClick={() =>
                                        handleEditPopup(
                                          firm.firmware_id,
                                          firm.product_id
                                        )
                                      }
                                      alt="Edit"
                                    />
                                    <div className="tooltip px-2">Edit</div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  lastPage={lastPage}
                  maxLength={maxLength}
                  setCurrentPage={setCurrentPage}
                  totalItemsOnPage={totalItemsOnPage}
                  from={from}
                  to={to}
                  total={total}
                  message={message}
                />
              </>
            ) : (
              <NoData />
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      <OurProductDailog
        open={open}
        setOpen={setOpen}
        HandleAddProductPop={HandleAddProductPop}
        validationpopup={validationpopup}
        setValidationPopup={setValidationPopup}
        productName={productName}
        setProductName={setProductName}
        launchStatusPopup={launchStatusPopup}
        setLaunchStatusPopup={setLaunchStatusPopup}
        launchStatus={launchStatus}
        setLaunchStatus={setLaunchStatus}
        dropDown={dropDown}
        setDropdown={setDropdown}
        productyoutubeurl={productyoutubeurl}
        setproductyoutubeurl={setproductyoutubeurl}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
        longDescription={longDescription}
        setLongDescription={setLongDescription}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        handleFileChange={handleFileChange}
        showImageCount={showImageCount}
        setShowImageCount={setShowImageCount}
        productLogo={productLogo}
        setProductLogo={setProductLogo}
        handleFileChangeIcon={handleFileChangeIcon}
        showIconCount={showIconCount}
        setShowIconCount={setShowIconCount}
        handleourProduct={handleourProduct}
      />

      <OurProductEdit
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        setShowIconCountUpload={setShowIconCountUpload}
        showIconCountUpload={showIconCountUpload}
        setValidationPopup={setValidationPopup}
        productLogo={productLogo}
        setProductLogo={setProductLogo}
        ourProductEdit={ourProductEdit}
        setOurProductEdit={setOurProductEdit}
        launchStatus={launchStatus}
        dropDown={dropDown}
        statusID={statusID}
        setStatusId={setStatusId}
        validationpopup={validationpopup}
        isFormEmpty={isFormEmpty}
        setIsFormEmpty={setIsFormEmpty}
        showImageCount={showImageCount}
        setShowImageCount={setShowImageCount}
        handleFileChangeIcon={handleFileChangeIcon}
        showIconCount={showIconCount}
        setShowIconCount={setShowIconCount}
        handleourProduct={handleourProduct}
      />

      <OurProductView
        setOpenView={setOpenView}
        openView={openView}
        ourProductView={ourProductView}
        setOurProductView={setOurProductView}
      />

      <OurProductDelete
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteName={deleteName}
        openDeletePopup={openDeletePopup}
        setOpenDeletePopup={setOpenDeletePopup}
        isDelayOver={isDelayOver}
        countdown={countdown}
        deleteId={deleteId}
        handleourProduct={handleourProduct}
      />

      <FirmWare
        firmwareProductId={firmwareProductId}
        validationpopupFirmWare={validationpopupFirmWare}
        firmwareshow={firmwareshow}
        setFirmwareShow={setFirmwareShow}
        firmwareUpgrade={firmwareUpgrade}
        setFirmwareUpgrade={setFirmwareUpgrade}
        firmwareDelete={firmwareDelete}
        setFirmwareDelete={setFirmwareDelete}
        firmwareView={firmwareView}
        setFirmwareView={setFirmwareView}
        firmwareEdit={firmwareEdit}
        setFirmwareEdit={setFirmwareEdit}
        setVersion={setVersion}
        version={version}
        firmdescription={firmdescription}
        setFirmdescription={setFirmdescription}
        setBinFile={setBinFile}
        binFile={binFile}
        setJsonFile={setJsonFile}
        jsonFile={jsonFile}
        handleAddFirmware={handleAddFirmware}
        handleFirmwareDelete={handleFirmwareDelete}
        setVersionError={setVersionError}
        VersionError={VersionError}
        setDescriptionError={setDescriptionError}
        descriptionError={descriptionError}
        setBinFileError={setBinFileError}
        setBinFileVersionError={setBinFileVersionError}
        setaddVersionError={setaddVersionError}
        binFileError={binFileError}
        binFileVersionError={binFileVersionError}
        addVersionError={addVersionError}
        setJsonFileError={setJsonFileError}
        jsonFileError={jsonFileError}
        addjsonFileError={addjsonFileError}
        setAddJsonFileError={setAddJsonFileError}
        firmware={firmware}
        handleFirmWareEditApi={(firmware_id, product_id) =>
          handleFirmWareEditApi(firmware_id, product_id)
        }
        handleFirmwareView={(firmware_id, product_id) =>
          handleFirmwareView(firmware_id, product_id)
        }
        viewFirmware={viewFirmware}
        firmWaregetEdit={firmWaregetEdit}
        setFirmWaregetEdit={setFirmWaregetEdit}
        firmWaregetVersion={firmWaregetVersion}
        handleFirmwareUpgrade={handleFirmwareUpgrade}
        handleUpdateFirmware={handleUpdateFirmware}
      />
    </>
  );
};

export default OurProducts;
