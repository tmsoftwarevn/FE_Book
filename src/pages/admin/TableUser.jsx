import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { callGetAllUser, callSearchUser } from "../../services/api";

const TableUser = (props) => {
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { searchData } = props;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination);
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const getListUser = async () => {
    let res = await callGetAllUser();
    if (res && res.data) {
     
      customListUser(res.data);
    }
  };
  const getSearchListUser = async () => {
    let res = await callSearchUser(
      current,
      pageSize,
      searchData?.fullName,
      searchData?.email,
      searchData?.phone
    );
    if (res && res.data) {
     
      setTotal(res.data.meta.total);
      customListUser(res.data.result);
      console.log("<< data search", res.data.result);

    }
  };

  useEffect(() => {
    if (searchData) {
      console.log("runnn search");
      getSearchListUser();
    } else {
      console.log("run lisssst");
      getListUser();
    }
  }, [searchData]);

  const customListUser = (listUser) => {
    // fake data
    if (listUser && listUser.length > 0) {
      listUser = listUser.concat(listUser).concat(listUser);
      let arr = [];
      listUser.map((item, index) => {
        arr.push({
          key: `item-${index}`,
          stt: index + 1,
          fullName: item.fullName,
          email: item.email,
          phone: item.phone,
          action: index + 1,
        });
      });
      setTotal(arr.length);
      setDataTable(arr);
    } else {
      setTotal(0);
      setDataTable([]);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record, index) => {
        return <Button>Xóa</Button>;
      },
    },
  ];
  let locale = {
    emptyText: "Không có kết quả nào.",
  };
  
  return (
    <div className="table-main">
      <div style={{ fontSize: "20px", marginBottom: "5px" }}>List Users</div>
      <Table
        locale={locale}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{
          pageSize: pageSize,
          total: total,
          current: current,
          showSizeChanger: true,
          position: ["bottomCenter"],
        }}
        scroll={{ y: "300px" }}
      />
    </div>
  );
};

export default TableUser;
