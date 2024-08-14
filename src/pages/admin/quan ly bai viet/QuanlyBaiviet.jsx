import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useParams } from "react-router-dom";

import { CiEdit } from "react-icons/ci";
import {
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
  notification,
} from "antd";
import { MdDelete } from "react-icons/md";

import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import AddBaiviet from "./AddBaiviet";
import UpdateBaiviet from "./UpdateBaiviet";
import { call_baiviet_admin, call_delete_baiviet } from "../../../services/api";

const title = "Xác nhận xóa ?";
const QuanlyBaiviet = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //////
  const params = useParams();
  const [listBaiviet, setListBaiviet] = useState([]);

  const [isModalAddBaiviet, setIsModalAddBaiviet] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdateBaiviet, setIsModalUpdateBaiviet] = useState(false);

  useEffect(() => {
    fetchBaiviet_All();
  }, []);

  const fetchBaiviet_All = async () => {
    let res = await call_baiviet_admin();
    if (res && res.EC === 1) {
      customBaiviet(res.data);
    }
  };

  const confirm = async (id) => {
    let res = await call_delete_baiviet(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchBaiviet_All();
    } else {
      notification.error({
        description: "Có lỗi xảy ra",
      });
    }
  };

  const customBaiviet = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: index + 1,
        STT: index + 1,
        id: item.id,
        tieude: item.tieude,
        meta_des: item.meta_des,
        noidung: item.noidung,
        thumbnail: item.thumbnail,
        key_word: item.key_word,
        mota_ngan: item.mota_ngan,
        createdAt: moment(item?.createdAt).format("DD-MM-YY hh:mm:ss"),
        updatedAt: moment(item?.updatedAt).format("DD-MM-YY hh:mm:ss"),
        action: index,
      });
    });

    setListBaiviet(arr);
  };

  const handleUpdateBaiviet = (record) => {
    setIsModalUpdateBaiviet(true);
    setDataUpdate(record);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieude",
      key: "tieude",
      ...getColumnSearchProps("tieude"),
    },
    {
      title: "Ảnh bài viết",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record, index) => {
        return (
          <div>
            <Image
              width={200}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${record?.thumbnail}`}
            />
          </div>
        );
      },
    },

   
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
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
                <Button
                  size="small"
                  type="primary"
                  danger
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MdDelete />
                </Button>
              </Popconfirm>
            </div>

            <div>
              <Button
                size="small"
                type="primary"
                style={{ display: "flex", alignItems: "center" }}
              >
                <CiEdit
                  style={{ fontSize: "15px" }}
                  onClick={() => {
                    handleUpdateBaiviet(record);
                  }}
                />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Flex justify="flex-end">
        <Button
          type="primary"
          className="mb-3"
          onClick={() => setIsModalAddBaiviet(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={listBaiviet}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />

      <AddBaiviet
        isModalAddBaiviet={isModalAddBaiviet}
        setIsModalAddBaiviet={setIsModalAddBaiviet}
        fetchBaiviet_All={fetchBaiviet_All}
      />
      <UpdateBaiviet
        isModalUpdateBaiviet={isModalUpdateBaiviet}
        setIsModalUpdateBaiviet={setIsModalUpdateBaiviet}
        fetchBaiviet_All={fetchBaiviet_All}
        dataUpdate={dataUpdate}
      />
    </>
  );
};
export default QuanlyBaiviet;
