import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  Button,
  Select,
  Flex,
  Popconfirm,
  Table,
  message,
  notification,
  Checkbox,
} from "antd";
import UpdateModal from "./ModalUpdate";
import AddModal from "./ModalAdd";
import {
  callDelete_Category,
  callFetchCategory,
  callGet_ParentCategory,
} from "../../../services/api";
import AsyncParentCategory from "./AsyncParentCategory";

const title = "Xác nhận xóa ?";
const QuanliCategory = () => {
  const params = useParams();
  const [list, setList] = useState([]);

  const [isModalAdd, setIsModalAdd] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdate, setIsModalUpdate] = useState(false);

  useEffect(() => {
    fetch_listCategory();
  }, []);

  const fetch_listCategory = async () => {
    let res = await callFetchCategory();
    if (res && res.EC === 1) {
      customMenu(res.data);
    }
  };
  const confirm = async (id) => {
    let res = await callDelete_Category(id);

    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetch_listCategory();
    } else {
      notification.error({
        description: "Có lỗi xảy ra",
      });
    }
  };

  const customMenu = async (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: index + 1,
        STT: index + 1,
        id: item.id,
        name: item.category,
        parentId: item.parentId,
        action: index,
        active: item.active,
      });
    });
    setList(arr);
  };

  const handleUpdate = (record) => {
    setIsModalUpdate(true);
    setDataUpdate(record);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái ở trang chủ (chỉ hiện cha)",
      dataIndex: "active",
      key: "active",
      render: (text, record, index) => {
        return (
          <Checkbox checked={+record.active === 1 ? true : false}>
            Hiện
          </Checkbox>
        );
      },
    },
    {
      title: "Đường dẫn thể loại cha",
      dataIndex: "parentId",
      key: "parentId",
      render: (text, record, index) => {
        return (
          <>
            <AsyncParentCategory idParent={record.parentId} id={record.id} />
          </>
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
                    handleUpdate(record);
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
          onClick={() => setIsModalAdd(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
      <UpdateModal
        isModalUpdate={isModalUpdate}
        setIsModalUpdate={setIsModalUpdate}
        dataUpdate={dataUpdate}
        fetch_listCategory={fetch_listCategory}
        list={list}
      />
      <AddModal
        isModalAdd={isModalAdd}
        setIsModalAdd={setIsModalAdd}
        fetch_listCategory={fetch_listCategory}
        list={list}
      />
    </>
  );
};
export default QuanliCategory;
