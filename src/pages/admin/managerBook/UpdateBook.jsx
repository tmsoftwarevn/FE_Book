import {
  Button,
  Col,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
  notification,
  Form,
  Input,
  Upload,
  Space,
  DatePicker,
} from "antd";

import { useEffect, useRef, useState } from "react";
import {
  callFetchCategory,
  callUpdateBook,
  callUploadBookImg,
} from "../../../services/api";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// timezone vietnam
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("vi");

const UpdateBook = (props) => {
  const filePickerCallback = function (cb, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      const file = input.files[0];

      const res = await callUploadBookImg(file);
      if (res && res.EC === 1) {
        cb(
          `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            res.data.fileUploaded
          }`,
          { alt: file.name }
        );
      }
    };

    input.click();
  };
  //////////
  const {
    isModalUpdateBook,
    setIsModalUpdateBook,
    getListBook,
    dataUpdate,
    setDataUpdate,
    dataBook,
  } = props;

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [idCategory, setIdCategory] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [initForm, setInitForm] = useState(null);
  const [noidung, setNoidung] = useState();
  const [ngayxuatban, setNgayxuatban] = useState();

  const refEditor = useRef();

  const handleOk = () => {
    setIsModalUpdateBook(false);
    setDataUpdate("");
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalUpdateBook(false);
    setDataUpdate("");
    form.resetFields();
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          if (item.category === dataUpdate.category) setIdCategory(item.id);
          return { label: item.category, value: item.id };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, [dataUpdate]);

  useEffect(() => {
    let data = dataBook[+dataUpdate?.action];
    let arrThumbnail = [];
    let arrSlider = [];
    if (data) {
      arrThumbnail.push({
        uid: uuidv4(),
        name: data?.thumbnail,
        status: "done",
        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          data?.thumbnail
        }`,
      });
    }
    if (data && data.slider) {
      data.slider.map((pic, index) => {
        arrSlider.push({
          uid: uuidv4(),
          name: pic,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${pic}`,
        });
      });
    }
    setDataThumbnail(arrThumbnail);
    setDataSlider(arrSlider);
    setNoidung(dataUpdate.description);

    const initialDate = dayjs(dataUpdate?.ngayxuatban).tz("Asia/Ho_Chi_Minh");

    setNgayxuatban(initialDate);

    const init = {
      id: dataUpdate?.id,
      name: dataUpdate?.name,
      author: dataUpdate?.author,
      price: dataUpdate?.price,
      category: dataUpdate?.category,
      quantity: dataUpdate?.quantity,
      hinhthuc: dataUpdate?.hinhthuc,
      nhaxuatban: dataUpdate?.nhaxuatban,
      // ngayxuatban: initialDate,
      thumbnail: { fileList: arrThumbnail },
      slider: { fileList: arrSlider },
    };
    setInitForm(init);
    form.setFieldsValue(init);
    // reset dung return
    return () => {
      form.resetFields();
    };
  }, [dataUpdate]);

  const onChangeDate = (date, dateString) => {
    console.log("ẻwrwer", dateString);
    //setNgayxuatban(dateString);
  };

  const onFinish = async (values) => {
    const {
      name,
      author,
      category,
      price,
      quantity,
      sold,
      hinhthuc,
      ngayxuatban,
      nhaxuatban,
    } = values;

    let newprice = price.toString().replaceAll(",", "");
    newprice = parseInt(newprice);
    let description = refEditor?.current?.getContent();

    if (dataThumbnail.length === 0) {
      notification.error({
        description: "Hãy upload ảnh thumbnail",
      });
      return;
    }

    const slider = dataSlider.map((item) => item.name);

    let res = await callUpdateBook(
      dataUpdate?.id,
      dataThumbnail[0]?.name,
      slider,
      name,
      author,
      +newprice,
      quantity,
      idCategory,
      description,
      hinhthuc,
      ngayxuatban,
      nhaxuatban
    );
    if (res && res.data) {
      setDataSlider([]), setDataThumbnail([]);
      message.success("Update thành công book");
    } else {
      notification.error({
        description: "Có lỗi xảy ra",
      });
    }
    getListBook();
    form.resetFields();
    handleOk();
  };
  ///upload
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataThumbnail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      //copy previous state => upload multiple images
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };
  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };
  const handlePreview = async (file) => {
    if (file.url && !file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      return;
    }
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };
  const handleSelectCategory = (value) => {
    setIdCategory(value);
  };

  return (
    <>
      <Modal
        title="Sửa thông tin book"
        open={isModalUpdateBook}
        onOk={() => {
          form.submit();
        }}
        okText="Sửa"
        onCancel={handleCancel}
        width={1000}
        maskClosable={false}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên sách"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your book!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tác giả"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Nhập tác giả",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Hình thức"
                name="hinhthuc"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Nhà xuất bản"
                name="nhaxuatban"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ngày xuất bản"
                name="ngayxuatban"
              >
                <DatePicker
                  defaultValue={ngayxuatban}
                  format="DD/MM/YYYY"
                  onChange={onChangeDate}
                  placeholder="Ngày"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Thể loại"
                name="category"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  options={listCategory}
                  onChange={(value) => {
                    handleSelectCategory(value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {/* upload */}
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
              >
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  className="avatar-uploader"
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                  defaultFileList={initForm?.thumbnail?.fileList ?? []}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
              >
                <Upload
                  accept="image/*"
                  multiple
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadFileSlider}
                  onChange={(info) => handleChange(info, "slider")}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                  defaultFileList={initForm?.slider?.fileList ?? []}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={24}>
              <h4 className="mb-4">Nội dung:</h4>
              <Editor
                apiKey={import.meta.env.VITE_APP_API_KEY_EDITOR}
                //onChange={(evt, editor) => setNoidung(editor.getContent())}
                onChange={(evt, editor) => (refEditor.current = editor)}
                initialValue={noidung}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic fontsize forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help | image media",
                  content_style:
                    "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                  fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
                  file_picker_types: "image",
                  file_picker_callback: filePickerCallback,
                }}
              />
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UpdateBook;
