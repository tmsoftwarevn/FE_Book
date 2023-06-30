import { useSelector } from "react-redux";

const Cart = () => {
  const listCart = useSelector((state) => state.cart.listCart);
  return (
    <div className="cart">
      <div className="container">
        <div className="cart-content">
          <Row >
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Cart;
