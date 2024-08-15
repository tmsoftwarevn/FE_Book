import { useEffect, useState } from "react";
import CarouselSanpham from "../../components/carousel/carousel-sanpham/CarouselSanpham";
import {
  call_detail_baiviet,
  callListBookPopularAll,
} from "../../services/api";
import Blog from "./Blog";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import moment from "moment";

const DetailBlog = () => {
  const navigate = useNavigate();
  const [listPopularAll, setListPopularAll] = useState([]);
  const [detail, setDetail] = useState();
  const params = useParams();

  const fetchDetail = async () => {
    let res = await call_detail_baiviet(params.slug);

    if (res && res.EC === 1) {
      setDetail(res.data);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [params.slug]);

  const getListBookPopularAll = async () => {
    let res = await callListBookPopularAll();
    if (res && res.data) {
      setListPopularAll(res.data);
    }
  };
  useEffect(() => {
    getListBookPopularAll();
  }, []);

  return (
    <div className="detail-blog my-5">
      <div className="container">
        <div>
          <Breadcrumb
            className="text-xl uppercase px-3 xl:px-0 "
            items={[
              {
                title: <Link to={"/"}>Trang chủ</Link>,
              },
              {
                title: <Link to={"/tin-tuc"}>Tin tức</Link>,
              },

              {
                title: `${detail?.tieude}`,
              },
            ]}
          />
        </div>
        <div className="mb-5 mt-3 px-3 xl:px-0">
          <h1 className="uppercase text-xl  font-semibold">
            {detail?.tieude}
          </h1>
          <div className="mb-3 italic text-gray-400">{moment(detail?.createdAt).format("DD-MM-Y")}</div>

          <div dangerouslySetInnerHTML={{ __html: detail?.noidung }} />
        </div>

        <CarouselSanpham listPopularAll={listPopularAll} />
      </div>
    </div>
  );
};

export default DetailBlog;
