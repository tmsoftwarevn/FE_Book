import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import { convertSlug } from "../../utils/convertSlug";

const BreadcrumbCustom = (props) => {
  const { listBread } = props;
  const params = useParams();
  const [bread, setBread] = useState([]);

  console.log('bbbbbbbbb', listBread);

  useEffect(() => {
    customBreadcrumb();
  }, [listBread]);

  const customBreadcrumb = () => {
    let breadcrumbs = [
      {
        title: <Link to="/">Trang chủ</Link>,
      },
    ];
    listBread?.map((item) => {
      let slug = convertSlug(item);
      let navi = `/the-loai/${slug}`;
      breadcrumbs.push({
        title: <Link to={navi}>{item}</Link>,
      });
    });
    setBread(breadcrumbs);
  };

 
  return (
    <div className="py-5 uppercase px-5 lg:px-0">
      <Breadcrumb className="text-lg font-semibold" items={bread} />
    </div>
  );
};

export default BreadcrumbCustom;
