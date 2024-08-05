import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import { callGet_ParentCategory_Home } from "../../services/api";

const itemss = [
  {
    key: "22",
    label: "sub menu",
    cate: "fsdf",
    children: [
      {
        key: "23-1",
        label: "3rd menu item",
      },
      {
        key: "21-2",
        label: "4th menu item",
      },
      {
        key: "243-2",
        label: "4th menu item",
      },
    ],
  },
  {
    key: "2",
    label: "sub menu",
    children: [
      {
        key: "2-1",
        label: "3rd menu item",
      },
      {
        key: "2-2",
        label: "4th menu item",
      },
    ],
  },
];

const DropdownMenu = () => {
  
  const [items, setListParent] = useState([]);

  const fetch_parent_category_home = async () => {
    let res = await callGet_ParentCategory_Home();
    if (res && res.EC === 1) {
      setListParent(res.data);
    }
  };

  useEffect(() => {
    fetch_parent_category_home();

  }, []);

  console.log('llll', items);

  
  return (
    <Dropdown
      menu={{ 
        items
      }}
      open={true}
      
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space >{/* Cascading menu */}</Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
