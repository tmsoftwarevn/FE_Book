import { Divider } from "antd";
import "./footer.scss";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="about-us">
            <span style={{ fontWeight: 600 }}>VỀ CHÚNG TÔI</span>
            <Divider style={{ borderColor: "grey" }} />
            <p>Giới Thiệu Về Nhà Sách Windy</p>
            
            <p>Hệ Thống Nhà Sách Windy</p>
            <p>Điều Khoản Sử Dụng</p>
            <p>Chính Sách Bảo Mật</p>
            <p>Chính Sách Bán Hàng</p>
            <p>Phương Thức Vận Chuyển</p>
          </div>
          <div className="account-ft">
            <span style={{ fontWeight: 600 }}>TÀI KHOẢN CỦA TÔI</span>
            <Divider style={{ borderColor: "grey" }} />
            <p onClick={() => navigate("/login")}>Đăng nhập</p>
            <p onClick={() => navigate("/register")}>Tạo tài khoản</p>
          </div>
          <div className="support">
            <span style={{ fontWeight: 600 }}>HỖ TRỢ KHÁCH HÀNG </span>
            <Divider style={{ borderColor: "grey" }} />
            <p>Các Câu Hỏi Thường Gặp</p>
            <p>Chính Sách Đổi/Trả Hàng</p>
            <p>Quy Định Viết Bình Luận</p>
          </div>
          <div className="contact">
            <span style={{ fontWeight: 600 }}>LIÊN HỆ VỚI CHÚNG TÔI</span>
            <Divider style={{ borderColor: "grey" }} />
            <p>Hotline: 12345678</p>
            <p>Email: nhasachwindy@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
