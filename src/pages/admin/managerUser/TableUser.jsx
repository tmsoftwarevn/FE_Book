import { Button, Popconfirm, Table, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callDeleteUser, callGetListUser } from "../../../services/api";
import Loading from "../../../components/Loading/loading";
import { AiFillDelete } from "react-icons/ai";

import ViewUser from "./View";
import moment from "moment";
import AddUser from "./AddUser";
const TableUser = (props) => {
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [view, setView] = useState(false);
  const [dataView, setDataView] = useState("");
  const [isModalAddUser, setIsModalAddUser] = useState(false);

  const { searchData } = props;

  useEffect(() => {
    setCurrent(1);
  }, [searchData]);
  useEffect(() => {
    getListUser();
  }, [searchData, current, pageSize, sort]);

  const title = "Xác nhận xóa người dùng này ?";
  const confirm = async (id) => {
    let res = await callDeleteUser(id);
    if (res && res.data) {
      message.success("Xóa thành công user");
      getListUser();
      setCurrent(1);
    } else {
      notification.error({
        description: "Có lỗi xảy ra",
      });
    }
  };
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
      sort
    );

    if (res && res.data) {
      setTotal(res.data.meta.total);
      customListUser(res.data.result);
      setIsLoading(false);
    }
  };

  const customListUser = (listUser) => {
    // fake data
    if (listUser && listUser.length > 0) {
      //listUser = listUser.concat(listUser).concat(listUser);
      let arr = [];
      listUser.map((item, index) => {
        arr.push({
          key: `item-${index}`,
          stt: index + 1,
          id: item._id,
          fullName: item.fullName,
          email: item.email,
          action: index + 1,
          createdAt: moment(item?.createdAt).format("DD-MM-YY hh:mm:ss"),
          updatedAt: moment(item?.updatedAt).format("DD-MM-YY hh:mm:ss"),
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
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record, index) => {
        //console.log(text, record, index)
        return (
          <div className="container" style={{display: 'flex', gap: 20, cursor: "pointer",}}>
            <div
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => {
                setView(true);
                setDataView(record);
              }}
            >
              Chi tiết
            </div>

            <div
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <Popconfirm
                placement="left"
                title={title}
                onConfirm={() =>{confirm(record?.id)}}
                okText="Yes"
                cancelText="No"
              >
                <AiFillDelete style={{ color: "red" }} />
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];
  let locale = {
    emptyText: "Không có kết quả nào.",
  };
  const renderTitleTable = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
        }}
      >
        <div>Danh sách Users: </div>
        <div>
          <Button
            type="primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsModalAddUser(true)}
          >
            Thêm mới
          </Button>
        </div>
      </div>
    );
  };
  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <>
        <div className="table-main">
          <Table
            title={renderTitleTable}
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
        <ViewUser view={view} setView={setView} dataView={dataView} />
        <AddUser
          isModalAddUser={isModalAddUser}
          setIsModalAddUser={setIsModalAddUser}
        />
      </>
    );
};

export default TableUser;
