import React, { useState } from "react";
import { Button, Drawer, Input, Radio, Space } from "antd";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const ResponsiveHeader = (props) => {
  const { dropdown } = props;
  const { open, setOpen } = props;
  const [placement, setPlacement] = useState("left");
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const onClose = () => {
    setOpen(false);
  };

  const renderItems = (list) => {
    let arr = [];

    list.map((item, index) => {
      arr.push(
        getItem(
          <div
            onClick={() =>
              navigate(
                `/the-loai/${item.slug}`,

                onClose()
              )
            }
          >
            {item.category}
          </div>,

          item.id
        )
      );
    });

    return arr;
  };
  const items = [
    getItem(
      <Link onClick={() => onClose()} to="/">
        Trang chủ
      </Link>,
      "/"
    ),
    getItem(
      <Link onClick={() => onClose()} to="/gioi-thieu">
        Giới thiệu
      </Link>,
      "/fdsf"
    ),
    getItem("Tủ sách", "sub1", "", renderItems(dropdown)),
    getItem(
      <Link onClick={() => onClose()} to="/tin-tuc">
        Tin tức
      </Link>,
      "/fsdfe"
    ),
  ];
  const handleSearch = () => {
    navigate(`/tim-kiem?text=${searchValue}`)
    onClose()
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();

    }
  };

  return (
    <>
      <Drawer
        // title="TM BOOK"
        placement={placement}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <Menu
          style={{
            width: "100%",
            fontFamily: "roboto",
          }}
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={items}
        />

        <Space direction="vertical" className="w-full ">
          <Space.Compact
            style={{
              width: "100%",
              marginTop: "20px"
            }}
          >
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tìm kiếm sản phẩm"
              onKeyDown={handleKeyPress}
            />
            <Button onClick={() => handleSearch()} type="primary">
              <FaSearch />
            </Button>
          </Space.Compact>
        </Space>
      </Drawer>
    </>
  );
};
export default ResponsiveHeader;
