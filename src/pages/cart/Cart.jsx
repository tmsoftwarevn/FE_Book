import { Divider, Image, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
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
const title = "Xác nhận xóa khỏi giỏ hàng ?";
const Cart = () => {
  const listCart = useSelector((state) => state.cart.listCart);
  const refCount = useRef([]);
  const refCheckbox = useRef([]);

  const refSelectAll = useRef();
  const [renderPrice, setRenderPrice] = useState(false);
  const [isEmptyBuy, setIsEmptyBuy] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id_buyNow = location.state?.id_book;
  let totalPrice = 0;
  let countProduct = 0;
  let arrSelect = [];

  useEffect(() => {
    const indexBuyNow = listCart.findIndex(
      (item, index) => item.id === id_buyNow
    );
    if (indexBuyNow > -1) {
      refCheckbox.current[indexBuyNow].checked = true;
      setRenderPrice(!renderPrice);
      if (listCart.length === 1) {
        refSelectAll.current.checked = true;
      }
    }
    displaySelectAll();
  }, [listCart]);
  useEffect(() => {
    let checkEmpty = refCheckbox.current.findIndex((item, i) => {
      if (item) {
        return item.checked === true;
      }
    });
    if (checkEmpty > -1) setIsEmptyBuy(false);
    else setIsEmptyBuy(true);
  }, [renderPrice]);

  const displaySelectAll = () => {
    if (refSelectAll && refSelectAll.current) {
      let checkAll = refCheckbox.current.findIndex((item, i) => {
        //not null
        if (item) {
          return item.checked === false;
        }
      });
      if (checkAll === -1) {
        refSelectAll.current.checked = true;
      }
    }
  };
  const onChangeSelectSingle = (e) => {
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
    setRenderPrice(!renderPrice);
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
    if (+e.target.value === 0) refCount.current[index].value = 1;
    if (e.target.value > total) refCount.current[index].value = total;
    if (e.target.value)
      refCount.current[index].value = +refCount.current[index].value;
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
  const handleDeleteBook = (book) => {
    // dich mang xuong 1, ref bi override
    if (listCart) {
      listCart.map((item, index) => {
        if (item.id === book.id) {
          for (let i = index; i < listCart.length; i++) {
            refCheckbox.current[i].checked =
              refCheckbox?.current[i + 1]?.checked;
            refCount.current[i].value = refCount?.current[i + 1]?.value;
          }
          setRenderPrice(!renderPrice);
          return;
        }
      });
    }
    dispatch(doDeleteBook(book));
    dispatch(saveInfoCartUser());
  };
  const handleBuyProduct = () => {
    if (isEmptyBuy === true) {
      message.error("Bạn chưa chọn sản phẩm nào");
    } else {
      navigate("/checkout", {
        state: { listBook: arrSelect },
      });
    }
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
                    arrSelect.push(item.id);
                  }
                  return (
                    <div key={`iitemm-${i}`}>
                      <div className="roww">
                        <div className="group-c">
                          <div className="check-box">
                            <input
                              id={`checkbox${i}`}
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
              <div className="buy" onClick={() => handleBuyProduct()}>
                Mua hàng
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Cart;
