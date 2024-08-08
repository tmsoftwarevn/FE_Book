import React from "react";
import { Select, Space } from "antd";

const App = (props) => {
  const { setSortDay, setSortPrice } = props;

  const handleChangeSort = (value) => {
    // mac dinh la moi nhat
    if (value === "0") {
      setSortDay("desc");
      setSortPrice("");
    }
    if (value === "price=asc") {
      setSortPrice("asc");
      setSortDay("");
    }
    if (value === "price=desc") {
      setSortPrice("desc");
      setSortDay("");
    }
    if (value === "createdAt=asc") {
      setSortDay("asc");
      setSortPrice("");
    }
    if (value === "createdAt=desc") {
      setSortDay("desc");
      setSortPrice("");
    }
  };
  return (
    <Space wrap>
      <Select
        defaultValue="0"
        style={{
          width: 140,
        }}
        onChange={handleChangeSort}
        options={[
          {
            value: "0",
            label: "Mặc định",
          },
          {
            value: "price=asc",
            label: "Giá tăng dần",
          },
          {
            value: "price=desc",
            label: "Giá giảm dần",
          },
          {
            value: "createdAt=desc",
            label: "Hàng mới nhất",
          },
          {
            value: "createdAt=asc",
            label: "Hàng cũ nhất",
          },
        ]}
      />
    </Space>
  );
};

export default App;
