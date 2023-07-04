import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";

const ResponsiveBookDetail = (props) => {
  const {
    handleChangeQuantity,
    refCountResponsive,
    handleClickOutside,
    handleAddToCart,
    handleBuyNow,
  } = props;
  return (
    <div className="responsive-cart">
      <div className="quantity-res">
        <div className="count">
          <MinusOutlined onClick={() => handleChangeQuantity("minus", "xs")} />
        </div>
        <input
          ref={refCountResponsive}
          defaultValue={1}
          onKeyDown={(e) => {
            if (!validKeyForPayment.includes(e.key)) {
              e.preventDefault();
            }
          }}
          onBlur={(e) => handleClickOutside(e, "xs")}
        />
        <div className="count">
          <PlusOutlined onClick={() => handleChangeQuantity("plus", "xs")} />
        </div>
      </div>
      <div className="add-item-res">
        <div className="cart-res">
          <BsCartPlus className="icon-cart-res" style={{ marginRight: 3 }} />
          <p onClick={() => handleAddToCart("xs")}>Thêm vào giỏ hàng</p>
        </div>
      </div>
      <div className="now-res">
        <span onClick={() => handleBuyNow("xs")}>Mua ngay</span>
      </div>
    </div>
  );
};

export default ResponsiveBookDetail;
