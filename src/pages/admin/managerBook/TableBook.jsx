import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { callGetListBook } from "../../../services/api";
import Loading from "../../../components/Loading/loading";
import moment from "moment";
import ViewBook from "./ViewBook";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

const TableBook = (props) => {
  const [dataBook, setDataBook] = useState("");
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [view, setView] = useState(false);
  const [dataView, setDataView] = useState("");
  const [isModalAddUser, setIsModalAddUser] = useState(false);
  const [isModalDeleteUser, setIsModalDeleteUser] = useState(false);

  const { searchData } = props;

  useEffect(() => {
    setCurrent(1);
  }, [searchData]);
  useEffect(() => {
    getListBook();
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

  const getListBook = async () => {
    setIsLoading(true);
    let res = await callGetListBook(
      current,
      pageSize
      // searchData?.name,
      // searchData?.author,
      // searchData?.category,
      // sort
    );

    if (res && res.data) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
      customListBook(res.data.result);
      setIsLoading(false);
    }
  };

  const customListBook = (list) => {
    // fake data
    if (list && list.length > 0) {
      //listUser = listUser.concat(listUser).concat(listUser);
      let arr = [];
      list.map((item, index) => {
        arr.push({
          key: `item-${index}`,
          stt: index + 1,
          name: item.mainText,
          category: item.category,
          author: item.author,
          price: `${item.price.toLocaleString()}đ`,
          action: index ,
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
      title: "Tên sách",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
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
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              fontSize: "18px",
              gap: 20,
            }}
          >
            <AiFillDelete style={{ color: "red" }} />
            <MdOutlinePreview
              style={{ color: "blue" }}
              onClick={() => {
                setView(true);
                setDataView(record);
                // console.log('check acion index', record.action)
              }}
            />
            <BsFillPencilFill 
            style={{fontSize: "15px"}}
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
        <div>Danh sách Books: </div>
        <div style={{ gap: 10, display: "flex" }}>
          <div>
            <Button type="primary">Export</Button>
          </div>
          <div>
            <Button type="primary">Import</Button>
          </div>
          <div>
            {" "}
            <Button type="primary">Thêm mới</Button>
          </div>
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
        <ViewBook
          view={view}
          setView={setView}
          dataView={dataView}
          setDataView= {setDataView}
          dataBook={dataBook}
        />
      </>
    );
};

export default TableBook;
