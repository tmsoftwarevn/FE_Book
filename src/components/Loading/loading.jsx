
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = (props) => {
  //const [isLoading, setIsLoading] = useState(false)
  const { isLoading } = props;
  console.log('check isloading')
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  // if (isLoading === true)
  //   return (
  //     <div style={style}>
  //       <ScaleLoader color="#36d7b7" />
  //     </div>
  //   );
  return <>run loading</>;
};

export default Loading;
