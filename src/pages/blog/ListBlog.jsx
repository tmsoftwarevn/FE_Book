import SearchBar from "../../components/search-bar/SearchBar";
import Blog from "./Blog";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { call_paginate_list_blog } from "../../services/api";

const arr = ["1", "2", "2", "3", "4"];

const ListBlog = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const limit = 16;
  const [list, setList] = useState([]);
  const [total, setTotal] = useState();

  const call_Listblog_page = async () => {
    let currentPage = params.get("page") ? params.get("page") : 1;

    // call api
    let res = await call_paginate_list_blog(currentPage, limit);

    if (res && res.EC === 1) {
      //console.log("rrrr", res);
      setList(res.data.list);
      setTotal(res.data.meta.total);
    }
  };
  //console.log("listtt", list);

  useEffect(() => {
    call_Listblog_page();
  }, [params.get("page")]);

  const handlePaginate = (e, page) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className="mb-10">
      <div className="container">
        <h1 className="text-center text-4xl font-bold m-10">Tin tức</h1>
        <div className="w-96 mx-auto px-2 mb-5">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 px-2">
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

        <Box
          className="mt-10"
          sx={{ display: "flex", justifyContent: "center" }}
        >
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

export default ListBlog;
