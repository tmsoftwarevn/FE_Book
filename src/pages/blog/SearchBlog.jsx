import SearchBar from "../../components/search-bar/SearchBar";
import Blog from "./Blog";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { call_search_baiviet } from "../../services/api";

const arr = ["1", "2", "2"];

const SearchBlog = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [keySearch, setKeySearch] = useState(
    params.get("s") ? params.get("s") : ""
  );
  const [list, setList] = useState([]);
  const limit = 12; //12
  const [total, setTotal] = useState(1);

  const call_Listblog_page = async () => {
    let page = params.get("page") ? params.get("page") : 1;
    let search = params.get("s") ? params.get("s") : "";
    let res = await call_search_baiviet(search, page, limit);

    if (res && res.EC === 1) {
      setList(res.data.list);
      setTotal(res.data.total);
    }
    // call api
  };
  console.log(list, total);

  useEffect(() => {
    call_Listblog_page();
  }, [params.get("page"), params.get("s")]);

  const handlePaginate = (e, page) => {
    navigate(`?s=${params.get("s")}&page=${page}`);
  };

  return (
    <div className="mb-10">
      <div className="container">
        <h1 className="text-center text-4xl font-bold mt-10 mb-3">Tin tức</h1>
        <p className="mb-10 text-center">Kết quả từ khóa "{params.get("s")}"</p>
        <div className="max-w-full w-80 mx-auto px-2 mb-5">
          <SearchBar setKeySearch={setKeySearch} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
          {list &&
            list.map((item, id) => {
              return (
                <>
                  <div className="col-span-1 ">
                    <Blog detail={item} />
                  </div>
                </>
              );
            })}
        </div>

        <Box className="mt-10" sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              onChange={(e, page) => handlePaginate(e, page)}
              count={+total}
              color="primary"
            />
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default SearchBlog;
