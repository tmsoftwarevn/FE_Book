import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useEffect, useRef, useState } from "react";
import TableBook from "./TableBook";
import { FiRefreshCcw } from "react-icons/fi";
import { callFetchCategory } from "../../../services/api";

const ManagerBook = () => {
  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [searchData, setSearchData] = useState({
    mainText: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item.category, value: item.id };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);
  const handleSearchBook = () => {
    form.submit();
  };
  const handleReset = () => {
    form.resetFields();
  };
  const onFinish = async (values) => {
    const { mainText, price, category } = values;
    setSearchData({ ...searchData, mainText, price, category });
  };

  return (
    <div className="manager-book">
      <div
        className="search"
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <Form.Item
              labelCol={{ span: 0 }}
              label="Tên sách"
              name="mainText"
              style={{ width: 300 }}
            >
              <Input />
            </Form.Item>
            <Form.Item labelCol={{ span: 0 }} label="Giá tiền từ " name="price">
              <InputNumber
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter="VND"
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 0 }}
              style={{ width: 350 }}
              label="Thể loại"
              name="category"
            >
              <Select showSearch options={listCategory} />
            </Form.Item>
          </Form>
        </div>

        <div
          className="btn"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button
            onClick={() => {
              setSearchData({
                mainText: "",
                price: "",
                category: "",
              });
              form.resetFields();
            }}
            type="primary"
          >
            <FiRefreshCcw style={{ marginRight: 5 }} />
            Danh sách ban đầu
          </Button>
          <Button
            style={{ backgroundColor: "#0652DD", color: "white" }}
            onClick={() => {
              handleSearchBook();
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              handleReset();
            }}
          >
            Reset input
          </Button>
        </div>
      </div>
      <div className="table-book" style={{ marginTop: "30px" }}>
        <TableBook searchData={searchData} />
      </div>
    </div>
  );
};

export default ManagerBook;
