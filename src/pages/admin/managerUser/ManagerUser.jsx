import { Button, Input, message } from "antd";
import TableUser from "./TableUser";
import { useEffect, useRef, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
const ManagerUser = () => {
  const nameref = useRef("");
  const emailRef = useRef("");

  const [reset, setReset] = useState(false);
  const [searchData, setSearchData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (reset === true) {
      setReset(false);
    }
  }, [reset]);

  const handleSearchUser = () => {
    if (nameref.current.input.value || emailRef.current.input.value) {
      setSearchData({
        ...searchData,
        fullName: nameref.current.input.value,
        email: emailRef.current.input.value,
      });
    } else {
      message.error("Nhập vào tên or email để tìm kiếm");
      setSearchData({ ...searchData, fullName: "", email: "" });
    }
  };
  const handleReset = () => {
    nameref.current.input.value = "";
    emailRef.current.input.value = "";
    setReset(true);
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
            justifyContent: "start",
            display: "flex",
            marginBottom: "10px",
            gap: 100,
          }}
        >
          <div style={{ width: "30%" }}>Name</div>
          <div style={{ width: "30%" }}>Email</div>
        </div>

        {reset === true ? (
          <div style={{ justifyContent: "start", display: "flex", gap: 100 }}>
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
          </div>
        ) : (
          <div style={{ justifyContent: "start", display: "flex", gap: 100 }}>
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
              });
              setReset(true);
            }}
            type="primary"
          >
            <FiRefreshCcw style={{ marginRight: 5 }} />
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

export default ManagerUser;
