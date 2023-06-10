import { Button, Form, Table } from "antd";
import { useEffect, useState } from "react";
import { callGetListUser } from "../../../services/api";
import Loading from "../../../components/Loading/loading";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import {AiOutlineImport} from"react-icons/ai"
import ViewUser from "./View";
import moment from 'moment';
import AddUser from "./AddUser";
const TableUser = (props) => {
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [view, setView] = useState(false);
  const [dataView, setDataView] = useState("");
  const [isModalAddUser, setIsModalAddUser] = useState(false)
  const [isModalDeleteUser, setIsModalDeleteUser] = useState(false)
  
  const { searchData } = props;

  useEffect(() => {
    setCurrent(1);
  }, [searchData]);
  useEffect(() => {
    getListUser();
  }, [searchData, current, pageSize, sort]);

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
          createdAt:  moment(item?.createdAt).format('DD-MM-YY hh:mm:ss'),
          updatedAt: moment(item?.updatedAt).format('DD-MM-YY hh:mm:ss'),
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
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record, index) => {
        //console.log(text, record, index)
        return (
          <div style={{ fontSize: "18px" }}>
            <AiFillDelete
              style={{ color: "red", cursor: "pointer", marginRight: "20px" }}
              onClick={() => setView(true)}
            />
            <FaEye
              style={{ color: "blue", cursor: "pointer", marginRight: "20px" }}
              onClick={() => {
                setView(true);
                setDataView(record);
              }}
            />
            <BsFillPencilFill
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("click item", record);
              }}
            />
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
        <div>Danh sách Users</div>
        <div style={{ gap: 15, display: "flex" }}>
          <Button
            type="primary"
            style={{ alignItems: "center", display: "flex", gap: 4}}
          >
            <AiOutlineExport />
            Export
          </Button>
          <Button type="primary"  style={{ alignItems: "center", display: "flex",gap: 4 }}>
            <AiOutlineImport />
            Import</Button>
          <Button type="primary"
          onClick={() => setIsModalAddUser(true)}
          >Thêm mới</Button>
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
          {/* <div style={{ fontSize: "20px", marginBottom: "5px" }}>
            List Users
          </div> */}
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
        isModalAddUser = {isModalAddUser}
        setIsModalAddUser ={setIsModalAddUser}
     
        />
      </>
    );
};

export default TableUser;
