import React, { useMemo, useState } from "react";
import { Image, Popover } from "antd";
import { SlBasket } from "react-icons/sl";
import { useSelector } from "react-redux";
import "./previewCart.scss";
import { useNavigate } from "react-router-dom";
import { BsBagPlus } from "react-icons/bs";

const text = <span style={{ color: "black" }}>Sản phẩm trong giỏ</span>;

const PreviewCart = () => {
  const listCart = useSelector((state) => state.cart.listCart);

  const navigate = useNavigate();

  const content = (
    <div>
      {listCart.map((item, i) => {
        return (
          <div key={`item-${i}`} className="wrap">
            <div className="group flex ">
              <div className="thumbnail">
                <Image
                  width={50}
                  height={50}
                  preview={false}
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    item.detail.thumbnail
                  }`}
                />
              </div>
              <div className="text">{item.detail?.mainText}</div>
            </div>

            <div style={{ color: "#ee4d2d" }} className="price">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.detail?.price)}
            </div>
          </div>
        );
      })}

      <div onClick={() => navigate("/cart")} className="btn-view bg-blue-600 hover:bg-blue-500">
        Xem giỏ hàng
      </div>
    </div>
  );
  const contentEmpty = (
    <div className="cart-empty">
      <BsBagPlus
        style={{ fontSize: 100, marginBottom: 20, color: "#ffeaa7" }}
        
      />
      <div className="empty">Chưa có sản phẩm</div>
    </div>
  );
  return (
    <div className="previewCart">
      <Popover
        placement="bottomRight"
        //title={listCart.length > 0 ? text : ""}
        content={listCart.length > 0 ? content : contentEmpty}
      >
        <SlBasket className="text-xl" />
      </Popover>
    </div>
  );
};

export default PreviewCart;
