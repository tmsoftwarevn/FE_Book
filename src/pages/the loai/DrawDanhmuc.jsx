import React, { useState } from "react";
import { Button, Col, Divider, Drawer, Form, Row } from "antd";
import { SiGitbook } from "react-icons/si";
import BreadcrumbCustom from "../../components/breadcrum/BreadCrumCustom";
import "./draw.scss";

const DrawDanhmuc = (props) => {
  const {
    openDraw,
    setOpenDraw,
    listCategory,
    handleSelectCategory,
    listBread,
    handleSelectPrice,
    activePrice,
  } = props;

  const onClose = () => {
    setOpenDraw(false);
  };
  return (
    <>
      <Drawer title="BỘ LỌC" onClose={onClose} open={openDraw} className="!py-0">
        <BreadcrumbCustom listBread={listBread}/>
        <div className="bg-blue-600 text-white">
          <div className="text-xl text-center font-semibold p-3 uppercase border-b border-gray">
            Danh mục sản phẩm
          </div>

          <Row>
            {listCategory.children ? (
              listCategory?.children &&
              listCategory.children.map((item, index) => {
                return (
                  <Col
                    span={24}
                    className="flex font-semibold items-center hover:pl-5 hover:bg-blue-900 cursor-pointer px-2 py-2 border-b border-gray"
                    key={`itemcategory-${index}`}
                  >
                    {/* <MdKeyboardDoubleArrowRight /> */}
                    <SiGitbook className="mr-2" />
                    <div onClick={() => handleSelectCategory(item)}>
                      {item.category}
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col
                span={24}
                className="flex font-semibold items-center hover:pl-5 hover:bg-blue-900 cursor-pointer px-2 py-2 border-b border-gray"
              >
                {/* <MdKeyboardDoubleArrowRight /> */}
                <SiGitbook className="mr-2" />
                <div onClick={() => handleSelectCategory(listCategory)}>
                  {listCategory.category}
                </div>
              </Col>
            )}
          </Row>
        </div>

        <Form className="px-5">
          <Divider />

          <p className="text-xl font-semibold mb-4">Giá</p>
          <Form.Item>
            <div className="grid gap-4">
              <Button
                onClick={() => {
                  handleSelectPrice("a", "0,80000");
                }}
                type={activePrice.a === true ? "primary" : "default"}
              >
                Dưới 80.000
              </Button>
              <Button
                onClick={() => {
                  handleSelectPrice("b", "80000,200000");
                }}
                type={activePrice.b === true ? "primary" : "default"}
              >
                {" "}
                80.000 - 200.000
              </Button>
              <Button
                onClick={() => {
                  handleSelectPrice("c", "200000,400000");
                }}
                type={activePrice.c === true ? "primary" : "default"}
              >
                {" "}
                200.000 - 400.000
              </Button>
              <Button
                onClick={() => {
                  handleSelectPrice("d", "400000,99999999");
                }}
                type={activePrice.d === true ? "primary" : "default"}
              >
                {" "}
                Trên 400.000
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default DrawDanhmuc;
