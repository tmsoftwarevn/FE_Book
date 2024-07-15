import { useEffect, useState } from "react";
import { callGet_ParentCategory } from "../../../services/api";

const AsyncParentCategory = ({ idParent, id }) => {
  const [string, setString] = useState("");

  const fetch_parentCategory = async (idParent, id) => {
    // nếu idParent = 0;
    let s = "";
    if (idParent) {
      let res = await callGet_ParentCategory(idParent);
      if (res && res.EC === 1) {
        res.data.reverse().map((item) => {
          s = s + item.category + "/";
        });
      }
    } else {
      let res = await callGet_ParentCategory(id);
      if (res && res.EC === 1) {
        res.data.map((item) => {
          s = s + "/";
        });
      }
    }
    
    setString(s);
  };
  useEffect(() => {
    fetch_parentCategory(idParent, id)
  }, [idParent, id]);

  return <div>{string}</div>;
};

export default AsyncParentCategory;
