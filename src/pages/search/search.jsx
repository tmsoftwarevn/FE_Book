import { Breadcrumb, Divider, Pagination, Rate, Row } from "antd";
import { AiFillStar } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { convertSlug } from "../../utils/convertSlug";
import { useEffect, useState } from "react";
import { callSearchBook } from "../../services/api";
import "./search.scss";
import Card from "../../components/card/Card";

const Search = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dataBook, setDataBook] = useState("");
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  //const search = params.get("text");
  const [search, setSearch] = useState(params.get("text"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchBook = async () => {
      let res = await callSearchBook(search, current, pageSize);
      //console.log('checkkk', res)
      if (res && res.data) {
        setDataBook(res.data.result);
        setTotal(res.data.meta.total);
      }
    };
    fetchSearchBook();
  }, [current, search]);

  
  useEffect(() => {
    if (params.get("page")) {
      setCurrent(params.get("page"));
    } else {
      setCurrent(1);
    }
    if (params.get("text")) {
      setSearch(params.get("text"));
    } else {
      setSearch("");
    }
    window.scrollTo(0, 0);
  }, [location.search]);

  const a = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: (
        <p>
          <i>Kết quả tìm kiếm: ( {search} )</i>
        </p>
      ),
    },
  ];

  const handleRedirectBook = (book) => {
    // const slug = convertSlug(book.mainText);
    navigate(`/book/${book.slug}`);
  };

  const handleChangePage = (p, s) => {
    setCurrent(p);
    navigate(`/tim-kiem?text=${search}&page=${p}`);
  };
  return (
    <div className="page-search">
      <div className="container">
        <Breadcrumb
          separator=">"
          style={{ padding: "10px", fontSize: 18 }}
          items={a}
        />
        {dataBook.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
              {dataBook &&
                dataBook.map((item, idx) => {
                  return (
                    <div className="col-span-1 bg-white shadow-gray-400 shadow-md border border-transparent hover:-translate-y-2 duration-300">
                      <Card item={item} />
                    </div>
                  );
                })}
            </div>
            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                showSizeChanger={false}
                current={current}
                total={total}
                pageSize={pageSize}
                responsive
                onChange={(p, s) => handleChangePage(p, s)}
              />
            </Row>
          </>
        ) : (
          <>
            <div>
              <i>Không có kết quả nào.</i>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
