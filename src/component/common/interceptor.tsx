import { useNavigate } from "react-router";

const interceptor = () => {
  let navigate = useNavigate();
  const fetch = window.fetch;
  window.fetch = async (...args) => {
    const result = await fetch(...args);

    if (result.status === 500) {
      navigate("/");
    }
    return result;
  };
};

export default interceptor;
