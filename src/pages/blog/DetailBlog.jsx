import { useEffect, useState } from "react";
import CarouselSanpham from "../../components/carousel/carousel-sanpham/CarouselSanpham";
import { call_detail_baiviet, callListBookPopularAll } from "../../services/api";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";

const DetailBlog = () => {
  const navigate = useNavigate();
  const [listPopularAll, setListPopularAll] = useState([]);
  const [detail, setDetail] = useState();

  const fetchDetail = async() =>{
    let res = await call_detail_baiviet(slug);
    if( res && res.EC === 1){
      setDetail(res.data)
    }
  }
  useEffect(() =>{
fetchDetail();

  },[])
  const getListBookPopularAll = async () => {
    let res = await callListBookPopularAll();
    if (res && res.data) {
      setListPopularAll(res.data);
    }
  };
  useEffect(() =>{
    getListBookPopularAll()
  },[])

  return (
    <div className="detail-blog my-5">
      <div className="container">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-9">
           fdsfd
          </div>

          <div className="col-span-3">
            <div className="text-black font-semibold text-2xl mb-3">
              Bài viết liên quan
            </div>
            <Blog />
          </div>

        </div>

        <CarouselSanpham listPopularAll={listPopularAll} />
      </div>

      
    </div>
  );
};

export default DetailBlog;
