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
  const [view, setView] = useState(false);
  const [dataView, setDataView] = useState("");
  const [isModalAddUser, setIsModalAddUser] = useState(false);
  const [sort, setSort] = useState(`&field=createdAt&sort=DESC`);
  const [search, setSearch] = useState(`&searchName=&searchEmail=`);
  const { searchData } = props;

  useEffect(() => {
    // tach ra, bi loi khi dat cung 1 useffect
    setCurrent(1);
    let searchName = searchData.fullName;
    let searchEmail = searchData.email;
    setSearch(`&searchName=${searchName}&searchEmail=${searchEmail}`);
  }, [searchData]);

  useEffect(() => {
    getListUser();
  }, [search, current, pageSize, sort]);

  const getListUser = async () => {
    setIsLoading(true);
    let res = await callGetListUser(current, pageSize, sort, search);
    if (res && res.data) {
      setTotal(res.data.meta.total);
      customListUser(res.data.result);
      setIsLoading(false);
    }
  };

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
  const onChange = async (pagination, filters, sorter, extra) => {
    customSort(sorter.field, sorter.order);
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const customSort = (field, order) => {
    let string = "";
    if (!field && !order) return;
    if (field === "fullName" && order === "descend") {
      string = `&field=${field}&sort=DESC`;
    }
    if (field === "fullName" && order === "ascend") {
      string = `&field=${field}&sort=ASC`;
    }
    if (field === "updatedAt" && order === "descend") {
      string = `&field=${field}&sort=DESC`;
    }
    if (field === "updatedAt" && order === "ascend") {
      string = `&field=${field}&sort=ASC`;
    }
    setSort(string);
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
          id: item.id,
          fullName: item.fullName,
          email: item.email,
          action: index + 1,
          type: item.type,
          role: item.role,
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
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
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
        return (
          <div
            className="container"
            style={{ display: "flex", gap: 20, cursor: "pointer" }}
          >
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
                onConfirm={() => {
                  confirm(record?.id);
                }}
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
              pageSizeOptions: [5, 10, 20, 50],
            }}
            scroll={{ y: "300px" }}
          />
        </div>
        <ViewUser view={view} setView={setView} dataView={dataView} />
        <AddUser
          isModalAddUser={isModalAddUser}
          setIsModalAddUser={setIsModalAddUser}
          getListUser={getListUser}
        />
      </>
    );
};

export default TableUser;
