import { useEffect, useState } from "react";
import { call_list_home, callListBookPopularAll } from "../../services/api";
import CarouselSanpham from "../../components/carousel/carousel-sanpham/CarouselSanpham";

const GioiThieuHome = () => {
  const [noidung, setNoidung] = useState("");
  const [listNew, setListNew] = useState([]);

  const get_gioi_thieu = async () => {
    let res = await call_list_home();
    if (res && res.EC === 1) {
      res?.data.map((item) => {
        if (+item.is_banner === 2) {
          // id = 2 : gioi thieu
          setNoidung(item.gioi_thieu);
        }
      });
    }
  };

  const getListBookNew = async () => {
    let res = await callListBookPopularAll();
    if (res && res.data) {
      setListNew(res.data);
    }
  };
  useEffect(() => {
    get_gioi_thieu();
    getListBookNew();
  }, []);

  return (
    <div className="px-2 py-4 lg:px-0">
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: noidung }} />
        <CarouselSanpham listPopularAll={listNew} />
      </div>
    </div>
  );
};

export default GioiThieuHome;
