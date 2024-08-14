import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { call_list_home, call_update_home } from "../../../services/api";
import { Button, Flex, message } from "antd";

const GioiThieu = () => {
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
  const refEditor = useRef();
  const [noidung, setNoidung] = useState("");
  const [id, setId] = useState(); // id home table có chứa giới thiệu

  const get_gioi_thieu = async () => {
    let res = await call_list_home();
    if (res && res.EC === 1) {
      res?.data.map((item) => {
        if (+item.is_banner === 2) {
          setNoidung(item.gioi_thieu);
          setId(item.id);
        }
      });
    }
  };

  useEffect(() => {
    get_gioi_thieu();
  }, []);

  const handleUpdate_gioithieu = async () => {

    let description = refEditor?.current?.getContent();
    const result = await call_update_home(id, "banner", description, 2); // id: 2 la giơi thiệu
    if (result && result.EC === 1) {
      message.success("Update thành công");
      get_gioi_thieu();
    } else {
      message.error("Có lỗi !");
    }

  };

  return (
    <>
      <Flex justify="center">
        <Button type="primary" onClick={() => handleUpdate_gioithieu()}>
          Cập nhật
        </Button>
      </Flex>

      <h4 className="mb-4">Nội dung:</h4>
      <Editor
        apiKey={import.meta.env.VITE_APP_API_KEY_EDITOR}
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
    </>
  );
};

export default GioiThieu;
