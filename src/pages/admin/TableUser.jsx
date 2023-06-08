import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import {  callGetListUser } from "../../services/api";
import Loading from "../../components/Loading/loading";

const TableUser = (props) => {
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");
  const { searchData } = props;

  const onChange = (pagination, filters, sorter, extra) => {
    //console.log("params", sorter);
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
    customSort(sorter.field, sorter.order);
  };
  const customSort = (field, order) => {
    if (order === "ascend") {
      setSort(field);
    }
    if (order === "descend") {
      setSort(`-${field}`);
    }
  };
 
  const getListUser = async () => {
    setIsLoading(true);
    let res = await callGetListUser(
      current,
      pageSize, 
      searchData?.fullName,
      searchData?.email,
      searchData?.phone,
      sort
    );
    
    if (res && res.data) {
      setTotal(res.data.meta.total);
      customListUser(res.data.result);
      setIsLoading(false);    
    }
  };
  useEffect(() =>{
    setCurrent(1)
  },[searchData])
  useEffect(() => {   
     getListUser()
  }, [searchData,current,pageSize, sort]);

  const customListUser = (listUser) => {
    // fake data
    if (listUser && listUser.length > 0) {
      //listUser = listUser.concat(listUser).concat(listUser);
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
     // setTotal(arr.length);
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
  console.log(sort)
  if (isLoading === true) {
    return <Loading />;
  } else
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
            pageSizeOptions: [2, 10, 20, 50],
          }}
          scroll={{ y: "300px" }}
        />
      </div>
    );
};

export default TableUser;
