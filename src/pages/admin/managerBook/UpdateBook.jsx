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
  callUpdateBook,
  callUploadBookImg,
} from "../../../services/api";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const UpdateBook = (props) => {
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [initForm, setInitForm] = useState(null);

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

    const init = {
      _id: dataUpdate?._id,
      name: dataUpdate?.name,
      author: dataUpdate?.author,
      price: dataUpdate?.price,
      category: dataUpdate?.category,
      quantity: dataUpdate?.quantity,
      sold: dataUpdate?.sold,
      thumbnail: { fileList: arrThumbnail },
      slider: { fileList: arrSlider },
    };
    setInitForm(init);
    form.setFieldsValue(init);
    return () => {
      form.resetFields();
    };
  }, [dataUpdate]);
  const onFinish = async (values) => {
    const { name, author, category, price, quantity, sold } = values;
    let newprice =price.toString().replace(",","")    
    console.log('new price', newprice)
    if (dataThumbnail.length === 0) {
      notification.error({
        description: "Hãy upload ảnh thumbnail",
      });
      return;
    }
    if (dataSlider.length === 0) {
      notification.error({
        description: "Hãy upload ảnh slider",
      });
      return;
    }
    const slider = dataSlider.map((item) => item.name);
    console.log('<<<<<<',  dataThumbnail[0].name,
    slider,
    name, 
    author,
    +newprice,
    sold,
    quantity,
    category)
    
    let res = await callUpdateBook(
      dataUpdate?.id,
      dataThumbnail[0]?.name,
      slider,
      name, 
      author,
      +newprice,
      sold,
      quantity,
      category
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
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item, value: item };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <Modal
        title="Sửa thông tin book"
        open={isModalUpdateBook}
        onOk={() => {
          form.submit();
        }}
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

            <Col span={6}>
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
            <Col span={6}>
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
                <Select showSearch allowClear options={listCategory} />
              </Form.Item>
            </Col>
            <Col span={6}>
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
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đã bán"
                name="sold"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* upload */}
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
                //valuePropName="fileList"
                // getValueFromEvent={(e) => {
                //     if (Array.isArray(e)) {
                //       return e;
                //     }
                //     return e && e.fileList;
                //   }}
                //noStyle
              >
                <Upload
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
                // valuePropName="fileList"
                // getValueFromEvent={(e) => {
                //   if (Array.isArray(e)) {
                //     return e;
                //   }
                //   return e && e.fileList;
                // }}
                // noStyle
              >
                <Upload
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
