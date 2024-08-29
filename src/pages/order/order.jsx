import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";
import NProgress from "nprogress";
const PageOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckout = location.state?.isCheckout;

  //ko cho quay lai
  history.pushState(null, document.title, location.href);
  window.addEventListener("popstate", function (event) {
    history.pushState(null, document.title, location.href);
  });

  useEffect(() => {
    if (!isCheckout) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="order">
      <div className="container">
        <div className="order-content">
          <Result
            icon={
              <MdOutlineDone
                style={{
                  color: "white",
                  fontSize: 50,
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
                className="mx-auto w-fit"
              />
            }
            title="Đơn hàng được đặt thành công!"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  NProgress.start();
                  setTimeout(() => {
                    navigate("/lich-su-mua-hang");
                  }, 1000);
                }}
              >
                Lịch sử mua hàng
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
export default PageOrder;
