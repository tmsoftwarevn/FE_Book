import { Button, Checkbox, Col, Divider, Drawer, Form, Row } from "antd";
import { AiFillStar, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

const ResponsiveFilter = (props) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Drawer
        title="Bộ lọc sản phẩm"
        placement="right"
        onClose={onClose}
        open={modalFilter}
        className="homepage-left"
      >
        <Form
          onFinish={onFinish}
          form={form}
          //   onValuesChange={(changedValues, values) =>
          //     handleChangeFilter(changedValues, values)
          //   }
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
            <Checkbox.Group>
              <Row>
                {listCategory?.length > 0 &&
                  listCategory.slice(0, numberOfItems).map((item, index) => {
                    return (
                      <Col
                        span={24}
                        className="category-group"
                        key={`item-${index}`}
                      >
                        <Checkbox value={item}>{item}</Checkbox>
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
            </Checkbox.Group>
          </Form.Item>

          <Divider />
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
            Đánh giá
          </div>
          <Form.Item labelCol={{ span: 24 }} style={{ cursor: "pointer" }}>
            <Row>
              <Col span={6}>
                <div className="rate">
                  <AiFillStar />
                  <span>từ 5 sao</span>
                </div>
              </Col>

              <Col span={6}>
                <div className="rate">
                  <AiFillStar />
                  <span>từ 4 sao</span>
                </div>
              </Col>

              <Col span={6}>
                <div className="rate">
                  <AiFillStar />
                  <span>từ 3 sao</span>
                </div>
              </Col>
            </Row>
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

              <Button
                onClick={() => {
                  handleSelectPrice("a"), setPrice([40000]);
                }}
                className={activePrice.a === true ? "active" : ""}
              >
                Dưới 40.000
              </Button>
              <Button
                onClick={() => {
                  handleSelectPrice("b"), setPrice([40000, 120000]);
                }}
                className={activePrice.b === true ? "active" : ""}
              >
                {" "}
                40.000 - 120.000
              </Button>
              <Button
                onClick={() => {
                  handleSelectPrice("c"), setPrice([120000, 300000]);
                }}
                className={activePrice.c === true ? "active" : ""}
              >
                {" "}
                120.000 - 300.000
              </Button>
              <Button
                onClick={() => {
                  handleSelectPrice("d"), setPrice([300000]);
                }}
                className={activePrice.d === true ? "active" : ""}
              >
                {" "}
                Trên 300.000
              </Button>
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
                style={{ width: "60%" }}
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

export default ResponsiveFilter;
