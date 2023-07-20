import {
  Button,
  Col,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
  notification,
} from "antd";
import { Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import {
  callCreateBook,
  callFetchCategory,
  callUploadBookImg,
} from "../../../services/api";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

const AddNewBook = (props) => {
  const { isModalAddBook, setIsModalAddBook, getListBook } = props;
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

  const handleOk = () => {
    setIsModalAddBook(false);
  };
  const handleCancel = () => {
    setIsModalAddBook(false);
    form.resetFields();
  };
  const handleSelectCategory = (value) => {
    setIdCategory(value);
  };
  const onFinish = async (values) => {
    const { name, author, price, quantity, sold, rate } = values;
    if (dataThumbnail.length === 0) {
      notification.error({
        description: "Hãy upload ảnh thumbnail",
      });
      return;
    }
    // if (dataSlider.length === 0) {
    //   notification.error({
    //     description: "Hãy upload ảnh slider",
    //   });
    //   return;
    // }
    const slider = dataSlider.map((item) => item.name);

    let res = await callCreateBook(
      dataThumbnail[0]?.name,
      slider,
      name,
      author,
      price,
      sold,
      quantity,
      rate,
      idCategory
    );

    if (res && res.data) {
      setDataSlider([]), setDataThumbnail([]);
      message.success("Thêm mới thành công book");
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
  // up load anh len server khi status done
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
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item.category, value: item.id };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);
  return (
    <>
      <Modal
        title="Thêm mới book"
        open={isModalAddBook}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={1000}
        maskClosable={false}
        okText="Thêm mới"
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
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={5}>
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
            <Col span={7}>
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
            <Col span={4}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={1}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đã bán"
                name="sold"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={0}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đánh giá"
                name="rate"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={0}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* upload */}
            <Col span={12}>
              Ảnh Thumbnail
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
                noStyle
              >
                <Upload
                  accept="image/*"
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              Ảnh Slider
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
                noStyle
              >
                <Upload
                  accept="image/*"
                  multiple
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadFileSlider}
                  onChange={(info) => handleChange(info, "slider")}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
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

export default AddNewBook;
