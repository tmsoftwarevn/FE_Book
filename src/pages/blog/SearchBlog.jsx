import SearchBar from "../../components/search-bar/SearchBar";
import Blog from "./Blog";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const arr = ["1", "2", "2"];

const SearchBlog = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [keySearch, setKeySearch] = useState(
    params.get("s") ? params.get("s") : ""
  );

  // console.log("iiii", params.get("page"));

  const call_Listblog_page = async () => {
    let currentPage = params.get("page") ? params.get("page") : 1;
    console.log("page", currentPage);
    console.log("key: ", keySearch);
    // call api
  };

  useEffect(() => {
    call_Listblog_page();
    setKeySearch(params.get("s") ? params.get("s") : "");
  }, [params.get("page"), params.get("s")]);

  const handlePaginate = (e, page) => {
    navigate(`?page=${page}&s=${keySearch}`);
  };

  return (
    <div className="mb-10">
      <h1 className="text-center text-4xl font-bold mt-10 mb-3">Blog</h1>
      <p className="mb-10 text-center">Kết quả từ khóa "{keySearch}"</p>
      <div className="max-w-full w-96 mx-auto px-2">
        <SearchBar setKeySearch={setKeySearch} />
      </div>

      <div className="list-blog mb-10">
        <div className="row mx-auto max-w-6xl">
          {arr.map((item, id) => {
            return (
              <>
                <div className="col-sm-6 col-md-4 mt-4">
                  <Blog />
                </div>
              </>
            );
          })}
        </div>
      </div>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            onChange={(e, page) => handlePaginate(e, page)}
            count={20}
            color="primary"
          />
        </Stack>
      </Box>
    </div>
  );
};

export default SearchBlog;
