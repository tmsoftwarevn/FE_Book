import React, { useEffect } from "react";
import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { convertSlug } from "../../utils/convertSlug";

const BreadcrumbCustom = (props) => {
  const { listBread } = props;
  const params = useParams();

  //console.log("breaddd", list);
  useEffect(() => {
    customBreadcrumb();
  }, [params.slug]);

  const customBreadcrumb = () => {
    let breadcrumbs = [];

    listBread.forEach((item) => {
      let slug = convertSlug(item);
      breadcrumbs.push(item);
      if (slug === params.slug) {
        return; // Use 'return' in a forEach to exit the current iteration early
      }

      breadcrumbs.push(item);
    });
    console.log("bbbbbb", listBread);
    return breadcrumbs; // Return the collected breadcrumbs

  };

  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: "An Application",
        },
      ]}
    />
  );
};

export default BreadcrumbCustom;
