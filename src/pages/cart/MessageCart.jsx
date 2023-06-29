// import { Button, message } from "antd";
// const MessageCart = () => {
//   const [messageApi, contextHolder] = message.useMessage();
//   const success = () => {
//     messageApi.open({
//       type: "success",
//       content: "This is a prompt message with custom className and style",
//       className: "custom-class",
//       style: {
//         marginTop: "20vh",
//       },
//     });
//   };
//   return (
//     <>
//       {/* {contextHolder}
//       <Button onClick={success}>Customized style</Button> */}
//     </>
//   );
// };
// export default MessageCart;

import { message } from "antd";
import { forwardRef, useImperativeHandle } from "react";

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getAlert() {
      message.success("da them thanh cong");
    },
  }));

  return <></>;
});

export default Child;
