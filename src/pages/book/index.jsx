import { useLocation, useParams } from "react-router-dom";

const BookPageDetail = () => {
  const location = useLocation();
  //get id
  console.log("param book", location);
  return <>book page</>;
};

export default BookPageDetail;
