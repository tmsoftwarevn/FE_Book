import { useEffect, useState } from "react";
import {
  callGetDetailOrderWithId,
  callGetOrderAdmin,
  callGetStatus,
  callUpdateOrderStatus,
} from "../../../services/api";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  Row,
  Col,
  message,
} from "antd";
import moment from "moment";
import "./managerOrder.scss";
import ViewDetailOrder from "./ViewDetailOrder";

const ManagerOrder = () => {
  const [listOrder, setListOrder] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState([]);
  const [dataView, setDataView] = useState([]);
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [infoDelivery, setinfoDelivery] = useState("");
  const [idOrder, setIdOrder] = useState("");
  useEffect(() => {
    fetchOrderAdmin();
  }, [current, search]);
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    let res = await callGetStatus();
    if (res && res.data) {
      const d = res.data.map((item) => {
        return { label: item.status, value: item.id };
      });
      setStatus(d);
    }
  };

  const fetchOrderAdmin = async () => {
    let res = await callGetOrderAdmin(current, pageSize, search);
    if (res && res.data) {
      customTable(res.data.result);
      setTotal(res.data.meta.total);
    }
  };
  const onChangeTable = (pagination) => {
    setCurrent(pagination.current);
  };
  const handleViewDetailOrder = async (record) => {
    let res = await callGetDetailOrderWithId(record.id);
    if (res && res.data) {
      setDataView(res.data);
    }
    setinfoDelivery({
      fullname: record.fullname,
      phone: record.phone,
      address: record.address,
    });
    setIdOrder(record.id);
  };
  const customTable = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: `itemzz-${index}`,
        id: item.id,
        stt: index + 1,
        totalProduct: item.totalProduct,
        total: `${item.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        payment: item.payment,
        status: (
          <Tag
            icon={
              item.status === "Đặt hàng" ? (
                <ClockCircleOutlined />
              ) : item.status === "Đang giao" ? (
                <SyncOutlined spin />
              ) : (
                <CheckCircleOutlined />
              )
            }
            color={
              item.status === "Đặt hàng"
                ? "default"
                : item.status === "Đang giao"
                ? "processing"
                : "success"
            }
          >
            {item.status}
          </Tag>
        ),
        createdAt: moment(item?.createdAt).format("DD-MM-YY hh:mm:ss"),
        fullname: item.fullname,
        address: item.address,
        phone: item.phone,
      });
    });
    setListOrder(arr);
  };

  let columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Số loại sản phẩm",
      dataIndex: "totalProduct",
      align: "center",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
    },
    {
      title: "Tổng tiền (VND)",
      dataIndex: "total",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="action-order"
              onClick={() => {
                handleViewDetailOrder(record);
              }}
            >
              View
            </div>
            <div className="action-order" onClick={() => showModal(record)}>
              Update
            </div>
          </div>
        );
      },
    },
  ];

  let locale = {
    emptyText: "Không có kết quả nào.",
  };
  const onchangeStatus = (value) => {
    setSearch(value);
  };
  const handleUpdateStatus = (value) => {
    setUpdateStatus(value);
  };
  const showModal = (record) => {
    const init = {
      createdAt: record.createdAt,
      status: record.status.props.children,
      Id: record.id,
    };
    form.setFieldsValue(init);
    setIsModalUpdate(true);
  };
  const handleCancel = () => {
    setIsModalUpdate(false);
    form.resetFields();
  };
  const onFinish = async (values) => {
    let res = await callUpdateOrderStatus(values.Id, updateStatus);
    if (res && res.data) {
      message.success("Update trạng thái thành công");
      fetchOrderAdmin();
    } else {
      message.error("Có lỗi xảy ra. Hãy thử lại");
    }
    setIsModalUpdate(false);
    form.resetFields();
  };
  return (
    <div className="manager-order">
      <div className="search-status">
        <Form>
          <Form.Item
            labelCol={{ span: 0 }}
            label="Trạng thái"
            name="status"
            style={{ width: 210 }}
          >
            <Select options={status} onChange={onchangeStatus} />
          </Form.Item>
        </Form>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={listOrder}
          onChange={onChangeTable}
          locale={locale}
          pagination={{
            pageSize: pageSize,
            total: total,
            current: current,
            position: ["bottomCenter"],
          }}
        />
      </div>

      <Modal
        title="Update trạng thái"
        open={isModalUpdate}
        onOk={() => {
          form.submit();
        }}
        okText="Update"
        onCancel={handleCancel}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item labelCol={{ span: 24 }} label="Mã đơn hàng" name="Id">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ngày đặt hàng"
                name="createdAt"
              >
                <Input disabled={true} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Trạng thái"
                name="status"
              >
                <Select options={status} onChange={handleUpdateStatus} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <ViewDetailOrder
        dataView={dataView}
        infoDelivery={infoDelivery}
        idOrder={idOrder}
      />
    </div>
  );
};

export default ManagerOrder;
