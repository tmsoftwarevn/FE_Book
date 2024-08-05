import { useEffect, useState } from "react";
import { callGet_listbook_idparent } from "../../services/api";
import Card from "../card/Card";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const TheLoaiNoiBat = (props) => {
  const { nameCategory, arrId } = props;
  const [list, setList] = useState([]);

  const fetch_listbook_idparent = async () => {
    let res = await callGet_listbook_idparent(arrId);

    if (res && res.EC === 1) {
      setList(res.data);
    }
  };
  useEffect(() => {
    fetch_listbook_idparent();
  }, [arrId]);

 console.log("llllll", list);

  return (
    <div>
      <div className="flex justify-between mb-5 mt-10 px-2">
        <div className="text-xl uppercase font-semibold max-w-56 sm:max-w-full">
          {nameCategory}
        </div>
        <div className="flex items-center cursor-pointer hover:text-blue-600">
          Xem thêm <MdKeyboardDoubleArrowRight className="mr-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
        {list &&
          list.map((item, idx) => {
            return (
              <div className="col-span-1 shadow-gray-400 shadow-md border border-transparent hover:border hover:border-blue-600">
                <Card item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TheLoaiNoiBat;
