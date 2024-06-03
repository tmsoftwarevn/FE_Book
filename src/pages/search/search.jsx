import { Breadcrumb, Divider, Pagination, Rate, Row } from "antd";
import { AiFillStar } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { convertSlug } from "../../utils/convertSlug";
import { useEffect, useState } from "react";
import { callSearchBook } from "../../services/api";
import "./search.scss";

const Search = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [dataBook, setDataBook] = useState("");
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("mainText");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchBook = async () => {
      let res = await callSearchBook(search, current, pageSize);
      if (res && res.data) {
        setDataBook(res.data.result);
        setTotal(res.data.meta.total);
      }
    };
    fetchSearchBook();
  }, [current, search]);

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
  };
  return (
    <div className="page-search">
      <div className="container">
        <Breadcrumb
          separator=">"
          style={{ padding: "10px 0", fontSize: 16 }}
          items={a}
        />
        {dataBook.length > 0 ? (
          <>
            <div className="home-list">
              {dataBook &&
                dataBook.length > 0 &&
                dataBook.map((item, index) => {
                  return (
                    <div
                      className="column"
                      key={`itemlist-${index}`}
                      onClick={() => handleRedirectBook(item)}
                    >
                      <div className="wrapper">
                        <div className="thumbnail">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/book/${item?.thumbnail}`}
                            alt="thumbnail book"
                          />
                        </div>

                        <div className="text-search">
                          <div className="t-s">{item.mainText}</div>
                        </div>

                        <div className="group-child">
                          <div
                            className="price"
                            style={{
                              color: "rgb(255 66 78)",
                              fontWeight: 600,
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </div>
                          <div className="rating">
                            <Rate value={item.rate} disabled className="star" />

                            <span className="rate">{item.rate}</span>
                            <AiFillStar className="responsive-star" />
                            <span
                              style={{ display: "inline-block" }}
                              className="sold"
                            >
                              Đã bán {item.sold}
                            </span>
                          </div>
                        </div>
                      </div>
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
