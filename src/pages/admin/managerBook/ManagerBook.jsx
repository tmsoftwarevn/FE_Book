import { Button, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import TableBook from "./TableBook";
import {FiRefreshCcw} from 'react-icons/fi'

const ManagerBook = () => {
  const nameRef = useRef("");
  const authorRef = useRef("");
  const categoryRef = useRef("");
  const [reset, setReset] = useState(false);
  const [searchData, setSearchData] = useState({
    name: "",
    author: "",
    category: "",
  });
  
  useEffect(() =>{
    if(reset === true){setReset(false)}
  },[reset])

  const handleSearchBook = () => {
    if (
      nameRef.current.input.value ||
      authorRef.current.input.value ||
      categoryRef.current.input.value
    ) {
      setSearchData({
        ...searchData,
        name: nameRef.current.input.value
          ? `/${nameRef.current.input.value}/`
          : "",
        author: authorRef.current.input.value
          ? `/${authorRef.current.input.value}/`
          : "",
        category: categoryRef.current.input.value
          ? `/${categoryRef.current.input.value}/`
          : "",
      });
    } else {
      message.error("Vui lòng nhập vào input");
      setSearchData({ ...searchData, name: "", author: "", category: "" });
    }
  };
  const handleReset = () => {
    nameRef.current.input.value = "";
    authorRef.current.input.value = "";
    categoryRef.current.input.value = "";  
    setReset(true)  
  };
  
  return (
    <div className="manager-book">
      <div
        className="search"
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <div style={{ width: "30%" }}>Tên sách</div>
          <div style={{ width: "30%" }}>Tác giả</div>
          <div style={{ width: "30%" }}>Thể loại</div>
        </div>

        {reset === true ? (
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Input
              placeholder="Nhập tên sách"
              style={{ width: "30%" }}
              ref={nameRef}
              value=""
            />
            <Input
              placeholder="Nhập tác giả"
              style={{ width: "30%" }}
              ref={authorRef}
              value=""
            />
            <Input
              placeholder="Nhập thể loại"
              style={{ width: "30%" }}
              ref={categoryRef}
              value=""
            />
          </div>
        ) : (
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Input
              placeholder="Nhập tên sách"
              style={{ width: "30%" }}
              ref={nameRef}
            />
            <Input
              placeholder="Nhập tác giả"
              style={{ width: "30%" }}
              ref={authorRef}
            />
            <Input
              placeholder="Nhập thể loại"
              style={{ width: "30%" }}
              ref={categoryRef}
            />
          </div>
        )}
        
        <div
          className="btn"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
         <Button
            onClick={() => {
              setSearchData({
                ...searchData,
                fullName: "",
                email: "",
                phone: "",
              });
              setReset(true)
            }}
            type="primary"
          >
            <FiRefreshCcw style={{marginRight: 5}}/>
            Danh sách ban đầu
          </Button>
          <Button
            style={{ backgroundColor: "#0652DD", color: "white" }}
            onClick={() => {
              handleSearchBook();
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              handleReset();
            }}
          >
            Reset input
          </Button>
        </div>
      </div>
      <div className="table-book" style={{ marginTop: "30px" }}>
        <TableBook 
        searchData = {searchData}/>
      </div>
    </div>
  );
};

export default ManagerBook;
