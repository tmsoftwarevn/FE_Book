import { Button, Col, Divider, Drawer, Form, InputNumber, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

const ResponsiveHome = (props) => {
  const reftest = useRef([]);
  const {
    onClose,
    modalFilter,
    onFinish,
    form,
    handleChangeFilter,
    handleSearchPriceInput,
    listCategory,
    handleSelectStar,
    activeStar,
    activePrice,
    handleSelectPrice,
    handleReset,
    filterCategory,
    callApiSortDepsCategory,
  } = props;
  const [showMore, setShowMore] = useState(false);
  const numberOfItems = showMore ? listCategory.length : 5;
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (modalFilter === true) {
      listCategory.map((item, index) => {
        if (item.category === filterCategory) {
          if (index >= +numberOfItems) {
            setShowMore(true);
          }
          setTimeout(() => {
            reftest.current[index].checked = true;
          }, 200);
          // callApiSortDepsCategory(item);
        }
      });
    }
  }, [modalFilter]);

  const handleSelectCategoryRes = (e, item) => {
    console.log("checked res", item);
    callApiSortDepsCategory();
  };

  return (
    <div>
      <Drawer
        title="Bộ lọc sản phẩm"
        placement="right"
        onClose={onClose}
        open={modalFilter}
        headerStyle={{
          backgroundColor: "rgb(27 168 255)",
        }}
        width={window.innerWidth > 576 ? "50%" : "100%"} ///responsive mobile
      >
        <Form
          className="homepage-left"
          onFinish={onFinish}
          form={form}
          onValuesChange={(changedValues, values) =>
            handleChangeFilter(changedValues, values)
          }
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            Danh mục sản phẩm
          </div>
          <Form.Item name="category" labelCol={{ span: 24 }}>
            <Row>
              {listCategory?.length > 0 &&
                listCategory.slice(0, numberOfItems).map((item, index) => {
                  return (
                    <Col
                      span={24}
                      className="category-group"
                      key={`home_ress-${index}`}
                    >
                      <input
                        ref={(el) => (reftest.current[index] = el)}
                        type="checkbox"
                        style={{ marginRight: 10 }}
                        onChange={(e) => handleSelectCategoryRes(e, item)}
                      ></input>
                      {item.category}
                    </Col>
                  );
                })}
              {showMore === false ? (
                <div onClick={() => handleShowMore()} className="show">
                  <p>Xem tất cả</p>
                  <AiOutlineDown style={{ color: "rgb(13, 92, 182)" }} />
                </div>
              ) : (
                <div onClick={() => handleShowMore()} className="show">
                  <p>Thu gọn</p>
                  <AiOutlineUp style={{ color: "rgb(13, 92, 182)" }} />
                </div>
              )}
            </Row>
          </Form.Item>

          <Divider />

          <Form.Item>
            <div style={{ lineHeight: 3 }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  display: "block",
                }}
              >
                Đánh giá
              </span>
              <Row gutter={10}>
                <Col span={8}>
                  <div
                    onClick={() => handleSelectStar("five")}
                    className={activeStar?.five ? "active " : "default"}
                  >
                    <AiFillStar style={{ color: "#fadb14", marginRight: 5 }} />
                    <span>5 sao</span>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    onClick={() => handleSelectStar("four")}
                    className={activeStar?.four ? "active" : "default"}
                  >
                    <AiFillStar style={{ color: "#fadb14", marginRight: 5 }} />
                    <span>4 sao</span>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    onClick={() => handleSelectStar("three")}
                    className={activeStar?.three ? "active" : "default"}
                  >
                    <AiFillStar style={{ color: "#fadb14", marginRight: 5 }} />
                    <span>3 sao</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Form.Item>
          <Divider />

          <Form.Item>
            <div className="price" style={{ lineHeight: 3 }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  display: "block",
                }}
              >
                Giá
              </span>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <div
                    onClick={() => {
                      handleSelectPrice("a", [40000]);
                    }}
                    className={activePrice.a === true ? "active" : "default"}
                  >
                    Dưới 40.000
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    onClick={() => {
                      handleSelectPrice("b", [40000, 120000]);
                    }}
                    className={activePrice.b === true ? "active" : "default"}
                  >
                    {" "}
                    40.000 - 120.000
                  </div>
                </Col>

                <Col span={12}>
                  <div
                    onClick={() => {
                      handleSelectPrice("c", [120000, 300000]);
                    }}
                    className={activePrice.c === true ? "active" : "default"}
                  >
                    {" "}
                    120.000 - 300.000
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    onClick={() => {
                      handleSelectPrice("d", [300000]);
                    }}
                    className={activePrice.d === true ? "active" : "default"}
                  >
                    {" "}
                    Trên 300.000
                  </div>
                </Col>
              </Row>
            </div>
          </Form.Item>

          <Form.Item label="Chọn khoảng giá từ" labelCol={{ span: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Item name="from">
                <InputNumber
                  className="input-number"
                  min={0}
                  placeholder="đ"
                  onChange={() => handleSearchPriceInput()}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </div>

            <div
              style={{
                gap: 20,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => form.submit()}
                style={{ width: "70%" }}
                type="primary"
              >
                Áp dụng
              </Button>

              <Button onClick={() => handleReset()} style={{ width: "30%" }}>
                <GrPowerReset />
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ResponsiveHome;
