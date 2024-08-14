import { Button, Card, Col, Flex, Input, Modal, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";

import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";
import { convertSlug } from "../../../utils/convertSlug";
import { call_create_baiviet, callUploadBookImg } from "../../../services/api";

const AddBaiviet = (props) => {
  const { isModalAddBaiviet, setIsModalAddBaiviet, fetchBaiviet_All } = props;
  //////////////////
  const refEditor = useRef(null);
  const filePickerCallback = function (cb, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      const file = input.files[0];

      const res = await callUploadBookImg(file);
      if (res && res.EC === 1) {
        cb(
          `${import.meta.env.VITE_BACKEND_URL}/images/book/${res.data.fileUploaded}`,
          { alt: file.name }
        );
      }
    };

    input.click();
  };
  ////////////////////
  const params = useParams();

  const [key_word, setKey_word] = useState("");
  const [meta_des, setMeta_des] = useState("");
  let [noidung, setNoidung] = useState("");
  const [tieude, setTieude] = useState("");
  const [mota_ngan, setMota_ngan] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleUploadFile_thumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      

      setThumbnail(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };

  const handleCallAdd = async () => {
    noidung = refEditor?.current?.getContent();

    if (!key_word || !meta_des || !mota_ngan || !thumbnail || !tieude) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    let slug = convertSlug(tieude);
    const res = await call_create_baiviet(
      tieude,
      key_word,
      meta_des,
      noidung,
      thumbnail,
      mota_ngan,
      slug
    );
    if (res && res.EC === 1) {
      message.success("Thêm thành công");
      handleCancel();
      fetchBaiviet_All();
    } else {
      message.success("Thêm thất bại");
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsModalAddBaiviet(false);
    setKey_word("");
    setMeta_des("");
    setMota_ngan("");
    setNoidung("");
    setThumbnail("");
    setTieude("");
    setFileList([]);
  };

  return (
    <>
      <Modal
        title="Thêm bài viết"
        open={isModalAddBaiviet}
        onOk={() => {
          handleCallAdd();
        }}
        okText="Thêm"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        width={1200}
      >
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Tên bài viết" bordered={true}>
                <Input
                  onChange={(e) => setTieude(e.target.value)}
                  placeholder="Nhập tên bài viết"
                  value={tieude}
                ></Input>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Ảnh bài viết" bordered={true}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  customRequest={handleUploadFile_thumbnail}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                  multiple={false}
                  accept="image/*"
                >
                  Tải lên
                </Upload>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Key word">
                <TextArea
                  rows={3}
                  onChange={(e) => setKey_word(e.target.value)}
                  maxLength={500}
                  value={key_word}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Description">
                <TextArea
                  rows={3}
                  onChange={(e) => setMeta_des(e.target.value)}
                  maxLength={500}
                  value={meta_des}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Mô tả ngắn">
                <TextArea
                  rows={3}
                  onChange={(e) => setMota_ngan(e.target.value)}
                  maxLength={500}
                  value={mota_ngan}
                />
              </Card>
            </Col>
          </Row>
          {/* // react edit word */}

          <h4 className="mb-4">Nội dung:</h4>
          <Editor
            apiKey={`${import.meta.env.VITE_APP_API_KEY_EDITOR}`}
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

          {/* /////////// */}
        </div>
      </Modal>
    </>
  );
};

export default AddBaiviet;
