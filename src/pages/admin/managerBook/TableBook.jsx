import { Button, Popconfirm, Table, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callDeleteBook, callGetListBookAdmin } from "../../../services/api";
import Loading from "../../../components/Loading/loading";
import moment from "moment";
import ViewBook from "./ViewBook";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";

import AddNewBook from "./AddNewBook";
import UpdateBook from "./UpdateBook";
import BookImport from "./dataImport/BookImport";
import * as XLSX from "xlsx";
const TableBook = (props) => {
  const [dataBook, setDataBook] = useState("");
  const [data, setDataTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const [view, setView] = useState(false);
  const [dataView, setDataView] = useState("");
  const [dataUpdate, setDataUpdate] = useState("");

  const [isModalAddBook, setIsModalAddBook] = useState(false);
  const [isModalUpdateBook, setIsModalUpdateBook] = useState(false);

  const [isModalImportBook, setIsModalImportBook] = useState(false);
  const { searchData } = props;
  const [sort, setSort] = useState(`&field=updatedAt&sort=DESC`);

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
    customSort(sorter.field, sorter.order);
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const customSort = (field, order) => {
    let string = "";
    if (!field && !order) return;
    if (field === "price" && order === "descend") {
      string = `&field=${field}&sort=DESC`;
    }
    if (field === "price" && order === "ascend") {
      string = `&field=${field}&sort=ASC`;
    }
    setSort(string);
  };

  const getListBook = async () => {
    setIsLoading(true);
    let d = "";
    if (searchData.mainText) {
      d = `&mainText=${searchData.mainText}`;
    }
    if (searchData.price) {
      d += `&price=${searchData.price}`;
    }
    if (searchData.category) {
      d += `&category=${searchData.category}`;
    }
    if (!d) {
      d = `&mainText=&price=&category=`;
    }
    let res = await callGetListBookAdmin(current, pageSize, sort, d);

    if (res && res.data) {
      let a = res.data.result.map((item) => {
        item.slider = JSON.parse(item.slider);
      });
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
          id: item.id,
          stt: index + 1,
          name: item.mainText,
          category: item.category,
          author: item.author,
          price: `${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          sold: item.sold,
          rate: item.rate,
          quantity: item.quantity,
          description: item.description,
          hinhthuc: item.hinhthuc,
          nhaxuatban: item.nhaxuatban,
          ngayxuatban: item.ngayxuatban,
          action: index,
          createdAt: moment(item?.createdAt).format("DD-MM-YY hh:mm:ss"),
          updatedAt: moment(item?.updatedAt).format("DD-MM-YY hh:mm:ss"),
        });
      });
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
    },
    {
      title: "Thể loại",
      dataIndex: "category",
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
            {/* <div>
              <CiViewList
                style={{ color: "blue" }}
                onClick={() => {
                  setView(true);
                  setDataView(record);
                }}
              />
            </div> */}
            <div>
              <BsFillPencilFill
                style={{ fontSize: "15px" }}
                onClick={() => {
                  setIsModalUpdateBook(true), setDataUpdate(record);
                }}
                className="text-blue-600"
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
          {/* <div>
            <Button type="primary" onClick={() => handleExportData()}>
              Export data
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={() => setIsModalImportBook(true)}>
              Import data
            </Button>
          </div> */}
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
