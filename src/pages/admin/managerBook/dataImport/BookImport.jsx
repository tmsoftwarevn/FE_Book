import { Modal, Table } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
import * as XLSX from "xlsx";
//import templateFile from "./template.xlsx?url";

const BookImport = (props) => {
  const { isModalImportBook, setIsModalImportBook } = props;
  const [dataTable, setDataTable] = useState([]);
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleOk = () => {
    setIsModalImportBook(false);
    setDataTable([]);
  };
  const handleCancel = () => {
    setIsModalImportBook(false);
    setDataTable([]);
  };
  const uploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: dummyRequest,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: "array" });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];

            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: [
                "stt",
                "name",
                "category",
                "author",
                "price",
                "quantity",
                "sold",
              ],
              range: 1,
            });
            jsonData.map((item, index) => (item.key = index));
            console.log("json", jsonData);
            if (jsonData && jsonData.length > 0) setDataTable(jsonData);
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const renderTitleTable = () => {
    return (
      <>
        <div style={{ color: "grey", textDecoration: "underline" }}>
          <i> Sau khi import thành công, cần phải upload ảnh cho từng sách</i>
        </div>
      </>
    );
  };

  return (
    <div>
      <Modal
        destroyOnClose={true}
        title="Import file để tạo book"
        width={1000}
        open={isModalImportBook}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Import data"
        okButtonProps={{
          disabled: dataTable.length < 1,
        }}
        maskClosable={false}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Chỉ được phép upload file .csv,.xls or .xlsx &nbsp; &nbsp;
            <a
              onClick={(e) => e.stopPropagation()}
              href="https://docs.google.com/spreadsheets/d/1qY-BrWKOyNFWsb6bLrUYzhDJlaUXavn7QKD-Tql2lBw/edit?hl=vi#gid=0"
              download
              target="_blank"
            >
              Download example file
            </a>
          </p>
        </Dragger>

        <Table
          title={renderTitleTable}
          dataSource={dataTable}
          pagination={{
            pageSize: 5,
          }}
          columns={[
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
              title: "Giá tiền",
              dataIndex: "price",
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
            },
            {
              title: "Đã bán",
              dataIndex: "sold",
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default BookImport;
