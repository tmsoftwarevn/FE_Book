import { Divider, Image, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  doDeleteBook,
  doUpdateBookPageCart,
  saveInfoCartUser,
} from "../../redux/cart/cartSlice";
import { BsBagPlus } from "react-icons/bs";
import { convertSlug } from "../../utils/convertSlug";

const validKeyForPayment = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];
const title = "Xác nhận xóa sách này ?";
const Cart = () => {
  const listCart = useSelector((state) => state.cart.listCart);
  const refCount = useRef([]);
  const refCheckbox = useRef([]);

  const refSelectAll = useRef();
  const [renderPrice, setRenderPrice] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = 0;
  let countProduct = 0;
  const onChangeSelectSingle = (e) => {
    setRenderPrice(!renderPrice);
    if (e.target.checked === false && refSelectAll.current.checked === true)
      refSelectAll.current.checked = false;
    let isChecked = refCheckbox.current.findIndex((item) => {
      if (item != null) {
        return item.checked === false;
      }
    });
    if (isChecked === -1) {
      refSelectAll.current.checked = true;
    }
  };
  const onChangeSelectAll = (e) => {
    setRenderPrice(!renderPrice);
    refCheckbox.current.map((item) => {
      if (e.target.checked === false) {
        item.checked = false;
      }
      if (e.target.checked === true) item.checked = true;
    });
  };

  const handleChangeQuantity = (type, total, index, item) => {
    let count = +refCount.current[index].value;
    if (type === "minus" && count > 1) {
      refCount.current[index].value = +refCount.current[index].value - 1;
    }
    if (type === "plus" && count < total) {
      refCount.current[index].value = +refCount.current[index].value + 1;
    }
    const dataAddBook = {
      quantity: +refCount.current[index].value,
      id: item.id,
      detail: {
        thumbnail: item.detail.thumbnail,
        mainText: item.detail.mainText,
        price: item.detail.price,
        total: item.detail.total,
      },
    };
    dispatch(doUpdateBookPageCart(dataAddBook));
    dispatch(saveInfoCartUser());
  };
  const handleClickOutside = (e, total, index, item) => {
    if (!e.target.value) refCount.current[index].value = 1;
    if (e.target.value > total) refCount.current[index].value = total;
    const dataAddBook = {
      quantity: +refCount.current[index].value,
      id: item.id,
      detail: {
        thumbnail: item.detail.thumbnail,
        mainText: item.detail.mainText,
        price: item.detail.price,
        total: item.detail.total,
      },
    };
    dispatch(doUpdateBookPageCart(dataAddBook));
    dispatch(saveInfoCartUser());
  };

  const handleRedirectDetailBook = (book) => {
    const slug = convertSlug(book.detail.mainText);
    navigate(`/book/${slug}?id=${book.id}`);
  };
  const handleDeleteBook = (item) => {
    dispatch(doDeleteBook(item));
    dispatch(saveInfoCartUser());
  };

  if (listCart.length < 1) {
    return (
      <div className="container">
        <div
          className="cart-empty"
          style={{ fontFamily: "roboto" }}
          onClick={() => navigate("/")}
        >
          <BsBagPlus
            style={{ fontSize: 100, marginBottom: 20, color: "#ffeaa7" }}
          />
          <div className="empty">giỏ hàng của bạn trống</div>
          <div className="buy"> mua ngay</div>
        </div>
      </div>
    );
  } else
    return (
      <div className="cart-page">
        <div className="container">
          <div className="title">giỏ hàng</div>
          <div className="action">
            <div className="group">
              <input
                ref={refSelectAll}
                type="checkbox"
                onChange={(e) => onChangeSelectAll(e)}
                className="check-box"
              ></input>
              tất cả ({listCart.length} sản phẩm )
            </div>
            <span className="price">đơn giá</span>
            <span className="count">số lượng</span>
            <span className="total">thành tiền</span>
            <span>thao tác</span>
          </div>

          <div className="cart-content">
            <div className="list-cart">
              {listCart.length > 0 &&
                listCart.map((item, i) => {
                  if (refCheckbox.current[i]?.checked === true) {
                    totalPrice += item.quantity * item.detail.price;
                    countProduct += 1;
                  }
                  return (
                    <div key={`iitemm-${i}`}>
                      <div className="roww">
                        <div className="group-c">
                          <div className="check-box">
                            <input
                              type="checkbox"
                              ref={(el) => (refCheckbox.current[i] = el)}
                              onChange={(e) => onChangeSelectSingle(e)}
                            ></input>
                          </div>
                          <div
                            className="thumbnail"
                            onClick={() => handleRedirectDetailBook(item)}
                          >
                            <Image
                              width={80}
                              height={80}
                              preview={false}
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/images/book/${item.detail.thumbnail}`}
                            />
                          </div>
                          <div
                            className="name"
                            onClick={() => handleRedirectDetailBook(item)}
                          >
                            {item.detail?.mainText}
                          </div>
                        </div>

                        <div className="price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.detail?.price)}
                        </div>

                        <div className="quantity">
                          <div
                            className="count"
                            onClick={() => {
                              handleChangeQuantity(
                                "minus",
                                item.detail.total,
                                i,
                                item
                              );
                            }}
                          >
                            <AiOutlineMinus />
                          </div>
                          <input
                            ref={(el) => (refCount.current[i] = el)}
                            defaultValue={item.quantity}
                            onKeyDown={(e) => {
                              if (!validKeyForPayment.includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onBlur={(e) =>
                              handleClickOutside(e, item.detail.total, i, item)
                            }
                          ></input>
                          <div
                            className="count"
                            onClick={() =>
                              handleChangeQuantity(
                                "plus",
                                item.detail.total,
                                i,
                                item
                              )
                            }
                          >
                            <AiOutlinePlus />
                          </div>
                        </div>
                        <div className="total" style={{ color: "#ee4d2d" }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.quantity * item.detail.price)}
                        </div>
                        <div className="delete">
                          <Popconfirm
                            placement="left"
                            title={title}
                            onConfirm={() => handleDeleteBook(item)}
                            okText="Yes"
                            cancelText="No"
                          >
                            Xóa
                          </Popconfirm>
                        </div>
                      </div>
                      <Divider style={{ borderColor: "#ccc" }} />
                    </div>
                  );
                })}
            </div>
            <div className="group-price">
              <div className="total-price">
                <div>
                  tổng tiền ({countProduct} sản phẩm):{" "}
                  <span style={{ color: "#ee4d2d" }}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice)}
                  </span>
                </div>
                <div className="total-responsive">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </div>
              </div>
              <div className="buy">Mua hàng</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Cart;
