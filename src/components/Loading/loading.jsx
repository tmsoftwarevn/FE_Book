import { useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = () => {
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      // window.location.href = "/FE-book-deploy/login";
      window.location.href = "/login";
    }
  }, []);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <ScaleLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
