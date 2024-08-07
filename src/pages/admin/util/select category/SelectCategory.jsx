import React, { useEffect, useState } from "react";
import { Select } from "antd";

const SelectCategory = (props) => {
  
  const { list, setIdCategoryParent, dataUpdate , isModalAdd } = props;
  const [selectMenu, setSelectMenu] = useState([]);

  useEffect(() => {
    customCategory(list);
  }, [isModalAdd]);

  const onChangeSelect = (value) => {
    console.log(`selected ${value}`);
    setIdCategoryParent(value);
  };
  const onSearchSelect = (value) => {
    console.log("search:", value);
  };

  const customCategory = (list) => {
    let arr = [{
      value: 0,
      label: "Không có",
    }];
    list.map((item) => {
      arr.push({
        value: item.id,
        label: item.name,
      });
    });
    // 
    setSelectMenu(arr);
  };

  return (
    <Select
      showSearch
      placeholder="Thể loại cha"
      optionFilterProp="label"
      onChange={onChangeSelect}
      onSearch={onSearchSelect}
      options={selectMenu}
      defaultValue={dataUpdate?.parentId}
    />
  );
};

export default SelectCategory;
