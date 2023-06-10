import { Button, Input, message } from "antd";
import TableUser from "./managerUser/TableUser";
import { useEffect, useRef, useState } from "react";

const Admin = () => {
  const nameref = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const [reset, setReset] = useState(false);
  const [searchData, setSearchData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  useEffect(() =>{
    if(reset === true){setReset(false)}
  },[reset])

  const handleSearchUser = () => {
    if (
      nameref.current.input.value ||
      emailRef.current.input.value ||
      phoneRef.current.input.value
    ) {
      setSearchData({
        ...searchData,
        fullName: nameref.current.input.value
          ? `/${nameref.current.input.value}/`
          : "",
        email: emailRef.current.input.value
          ? `/${emailRef.current.input.value}/`
          : "",
        phone: phoneRef.current.input.value
          ? `/${phoneRef.current.input.value}/`
          : "",
      });
    } else {
      message.error("Nhập vào tên, email hoặc số điện thoại để tìm kiếm");
      setSearchData({ ...searchData, fullName: "", email: "", phone: "" });
    }
  };
  const handleReset = () => {
    nameref.current.input.value = "";
    emailRef.current.input.value = "";
    phoneRef.current.input.value = "";  
    setReset(true)  
  };
  
  return (
    <div className="admin-main">
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
          <div style={{ width: "30%" }}>Name</div>
          <div style={{ width: "30%" }}>Email</div>
          <div style={{ width: "30%" }}>Số điện thoại</div>
        </div>

        {reset === true ? (
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Input
              placeholder="Input Name"
              style={{ width: "30%" }}
              ref={nameref}
              value=""
            />
            <Input
              placeholder="Input Email"
              style={{ width: "30%" }}
              ref={emailRef}
              value=""
            />
            <Input
              placeholder="Input Phone"
              style={{ width: "30%" }}
              ref={phoneRef}
              value=""
            />
          </div>
        ) : (
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Input
              placeholder="Input Name"
              style={{ width: "30%" }}
              ref={nameref}
            />
            <Input
              placeholder="Input Email"
              style={{ width: "30%" }}
              ref={emailRef}
            />
            <Input
              placeholder="Input Phone"
              style={{ width: "30%" }}
              ref={phoneRef}
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
          >
            Danh sách ban đầu
          </Button>
          <Button
            style={{ backgroundColor: "#0652DD", color: "white" }}
            onClick={() => {
              handleSearchUser();
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
      <div className="table-user" style={{ marginTop: "30px" }}>
        <TableUser searchData={searchData} />
      </div>
    </div>
  );
};

export default Admin;
