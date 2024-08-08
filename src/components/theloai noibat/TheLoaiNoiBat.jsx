import { useEffect, useState } from "react";
import { callGet_listbook_idparent } from "../../services/api";
import Card from "../card/Card";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { convertSlug } from "../../utils/convertSlug";
import { useNavigate } from "react-router-dom";
import { BsBook } from "react-icons/bs";

const TheLoaiNoiBat = (props) => {
  const { nameCategory, arrId } = props;

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetch_listbook_idparent = async () => {
    let res = await callGet_listbook_idparent(arrId);

    if (res && res.EC === 1) {
      setList(res.data);
    }
  };
  useEffect(() => {
    fetch_listbook_idparent();
  }, [arrId]);

  const handleNav = () => {
    let slug = convertSlug(nameCategory);
    navigate(`/the-loai/${slug}`);
  };

  return (
    <div>
      <div className="flex justify-between mb-5 mt-10 px-2">
        <div className="text-xl text-blue-600 flex items-center uppercase font-semibold max-w-56 sm:max-w-full">
          <BsBook className="mr-3 hidden sm:block "/>
          {nameCategory}
        </div>
        <div
          className="flex items-center cursor-pointer hover:text-blue-600"
          onClick={() => handleNav()}
        >
          Xem thêm <MdKeyboardDoubleArrowRight className="mr-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
        {list &&
          list.map((item, idx) => {
            return (
              <div className="col-span-1 bg-white shadow-gray-400 shadow-md border border-transparent hover:-translate-y-2 duration-300">
                <Card item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TheLoaiNoiBat;
