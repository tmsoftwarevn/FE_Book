import { useEffect, useState } from "react";
import "./orderHistory.scss";
import { Divider, Table, Tabs } from "antd";
import { callOrderHistoryUser } from "../../services/api";
import { useSelector } from "react-redux";
import moment from "moment";

const OrderHistory = () => {
  const [listOrder, setListOrder] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.account?.user);
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
  useEffect(() => {
    fetchOrderHistoryUser();
  }, [current]);
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
        status: item.status,
        action: "Chi tiết",
        createdAt: moment(item?.createdAt).format("DD-MM-YY hh:mm:ss"),
      });
    });
    setListOrder(arr);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
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
      title: "Tổng sản phẩm",
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
    },
  ];
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
