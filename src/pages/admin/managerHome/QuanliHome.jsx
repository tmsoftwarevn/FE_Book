import React, { useEffect, useRef, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
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

import UpdateHome from "./ModalUpdate";
import AddHome from "./ModalAdd";

import { call_delete_home, call_list_home } from "../../../services/api";

const title = "Xác nhận xóa ?";
const QuanliHome = () => {
  /// search
  const [listHome, setListHome] = useState([]);

  const [isModalAddHome, setIsModalAddHome] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdateHome, setIsModalUpdateHome] = useState(false);

  const [loading, setLoading] = useState(true);
  const [listCustomParent, setListCustomParent] = useState([]);

  useEffect(() => {
    fetchAllHome();
  }, []);

  const fetchAllHome = async () => {
    const res = await call_list_home();
    if (res && res.EC === 1) {
      // setListHome(res.data)
      customHome(res.data);
    }
  };
  const customHome = (list) => {
    let arr = [];
    list.map((item, index) => {
      if (+item.is_banner === 1)
        // check đk ko lấy is_banner =2 là giưới thiệu
        arr.push({
          key: index + 1,
          STT: index + 1,
          id: item.id,
          banner: item.banner,
          description: item.gioi_thieu,
          action: index,
          is_banner: item.is_banner,
        });
    });

    setListHome(arr);
  };

  const confirm = async (id) => {
    const res = await call_delete_home(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchAllHome();
    } else {
      message.error("Có lỗi !");
    }
  };

  const handleUpdateHome = (record) => {
    setIsModalUpdateHome(true);
    setDataUpdate(record);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },

    {
      title: "Ảnh",
      dataIndex: "banner",
      key: "banner",
      render: (text, record, index) => {
        return (
          <div>
            <Image
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                record?.banner
              }`}
              width="auto"
              height="auto"
              className="max-w-60"
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
                    handleUpdateHome(record);
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
          onClick={() => setIsModalAddHome(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={listHome}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
      <UpdateHome
        isModalUpdateHome={isModalUpdateHome}
        setIsModalUpdateHome={setIsModalUpdateHome}
        dataUpdate={dataUpdate}
        fetchAllHome={fetchAllHome}
      />
      <AddHome
        isModalAddHome={isModalAddHome}
        setIsModalAddHome={setIsModalAddHome}
        fetchAllHome={fetchAllHome}
      />
    </>
  );
};

export default QuanliHome;
