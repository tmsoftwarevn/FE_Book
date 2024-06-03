import { forwardRef, useImperativeHandle, useState } from "react";
import { TiTick } from "react-icons/ti";

const MessageCart = forwardRef((props, ref) => {
  const [showPopup, setShowPopup] = useState(false);

  useImperativeHandle(ref, () => ({
    onModalMessage() {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    },
  }));

  return (
    <div
      className="modal"
      style={{ visibility: showPopup ? "visible" : "hidden" }}
    >
      <div className="icon mx-auto w-fit">
        <TiTick />
      </div>
      <div className="add">Đã thêm vào giỏ hàng</div>
    </div>
  );
});

export default MessageCart;
