import { Button, Popconfirm, Table, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callDeleteBook, callGetListBook } from "../../../services/api";
import Loading from "../../../components/Loading/loading";
import moment from "moment";
import ViewBook from "./ViewBook";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import AddNewBook from "./AddNewBook";
import UpdateBook from "./UpdateBook";
import BookImport from "./dataImport/BookImport";
import * as XLSX from "xlsx";
const TableBook = (props) => {
  const [dataBook, setDataBook] = useState("");
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [view, setView] = useState(false);
  const [dataView, setDataView] = useState("");
  const [dataUpdate, setDataUpdate] = useState("");

  const [isModalAddBook, setIsModalAddBook] = useState(false);
  const [isModalUpdateBook, setIsModalUpdateBook] = useState(false);

  const [isModalImportBook, setIsModalImportBook] = useState(false);

  const { searchData } = props;

  const title = "Xác nhận xóa sách này ?";
  const confirm = async (id) => {
    let res = await callDeleteBook(id);
    if (res && res.data) {
      message.success("Xóa thành công book");
      getListBook();
      setCurrent(1);
    } else {
      notification.error({
        description: "Có lỗi xảy ra",
      });
    }
  };

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
          id: item._id,
          stt: index + 1,
          name: item.mainText,
          category: item.category,
          author: item.author,
          price: `${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          sold: item.sold,
          quantity: item.quantity,
          action: index,
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
  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataBook);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "exportBook.csv");
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
      title: "Giá tiền (VND)",
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
            <div>
              <MdOutlinePreview
                style={{ color: "blue" }}
                onClick={() => {
                  setView(true);
                  setDataView(record);
                }}
              />
            </div>
            <div>
              <BsFillPencilFill
                style={{ fontSize: "15px" }}
                onClick={() => {
                  setIsModalUpdateBook(true), setDataUpdate(record);
                }}
              />
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
        <div>Danh sách Books: </div>
        <div style={{ gap: 10, display: "flex" }}>
          <div>
            <Button type="primary" onClick={() => handleExportData()}>
              Export data
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={() => setIsModalImportBook(true)}>
              Import data
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={() => setIsModalAddBook(true)}>
              Thêm mới
            </Button>
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
              pageSizeOptions: [10, 20, 50],
            }}
            scroll={{ y: "300px" }}
          />
        </div>
        <ViewBook
          view={view}
          setView={setView}
          dataView={dataView}
          setDataView={setDataView}
          dataBook={dataBook}
        />

        <AddNewBook
          isModalAddBook={isModalAddBook}
          setIsModalAddBook={setIsModalAddBook}
          getListBook={getListBook}
        />
        <UpdateBook
          isModalUpdateBook={isModalUpdateBook}
          setIsModalUpdateBook={setIsModalUpdateBook}
          getListBook={getListBook}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          dataBook={dataBook}
        />
        <BookImport
          isModalImportBook={isModalImportBook}
          setIsModalImportBook={setIsModalImportBook}
        />
      </>
    );
};

export default TableBook;
