import { useEffect, useState } from "react";
import "./orderHistory.scss";
import {
  Button,
  Descriptions,
  Divider,
  Drawer,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
import { callOrderHistoryUser } from "../../services/api";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [listOrder, setListOrder] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.account?.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderHistoryUser();
  }, [current]);

  const onChange = (key) => {};
  const fetchOrderHistoryUser = async () => {
    let res = await callOrderHistoryUser(user.id, current, pageSize);
    if (res && res.data) {
      customTable(res.data.result);
      setTotal(res.data.meta.total);
    }
  };
  const onChangeTable = (pagination) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleViewDetailOrder = async (record) => {
    let infoDelivery = {
      phone: record.phone,
      fullname: record.fullname,
      address: record.address,
    };
    navigate(`/orderHistory/${record.id}`, { state: { infoDelivery } });
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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      responsive: ["sm"],
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tổng sản phẩm",
      dataIndex: "totalProduct",
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      responsive: ["lg"],
    },
    {
      title: "Tổng tiền (VND)",
      dataIndex: "total",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div
            style={{ textDecorationLine: "underline" }}
            className="action-order"
            onClick={() => {
              handleViewDetailOrder(record);
            }}
          >
            Chi tiết
          </div>
        );
      },
    },
  ];

  let locale = {
    emptyText: "Không có kết quả nào.",
  };
  const items = [
    {
      key: "1",
      label: `Tất cả`,
      children: (
        <div className="tab-1">
          <Table
            columns={columns}
            dataSource={listOrder}
            onChange={onChangeTable}
            scroll={{ x: "430px" }}
            pagination={{
              pageSize: pageSize,
              total: total,
              current: current,
              position: ["bottomCenter"],
            }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: `Đã đặt hàng`,
      children: <></>,
    },
    {
      key: "3",
      label: `Đang vận chuyển`,
      children: <></>,
    },
    {
      key: "4",
      label: `Đã giao thành công`,
      children: <></>,
    },
  ];
  return (
    <div className="order-history">
      <div className="container">
        <div className="history-content">
          <div className="title-history">Lịch sử mua hàng</div>
          <div className="history-row">
            <Tabs
              style={{
                fontFamily: "Roboto",
              }}
              defaultActiveKey="1"
              locale={locale}
              items={items}
              tabPosition={"top"}
              onChange={onChange}
              hideAdd={true}
              tabBarGutter={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
