import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import "./quenmatkhau.scss";
import { useState } from "react";

const QuenMatkhau = () => {
  const navigate = useNavigate();
  const [isMessage, setIsMessage] = useState(false);

  const defaultTheme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsMessage(true);
    const data = new FormData(event.currentTarget);
    if (!data.get("email")) {
      return;
    }
    const email = {
      email: data.get("email"),
    };
  };
  return (
    <div className="quen-mat-khau">
      <div className="quen-mat-khau_box">
        {isMessage && (
          <div className="quen-mat-khau_box-info1">
            Kiểm tra hộp thư điện tử của bạn Chúng tôi đã gửi một email đến địa
            chỉ email của tài khoản này. Nhấp vào liên kết trong email để đặt
            lại mật khẩu của bạn Nếu bạn không thấy email, hãy kiểm tra những
            nơi khác có thể có email đó, chẳng hạn như thư mục rác, thư rác, xã
            hội, quảng cáo hoặc các thư mục khác.
          </div>
        )}

        <div className="quen-mat-khau_box-email">
          <p className="quen-mat-khau_box-info2">
           <b>Quên mật khẩu?</b> Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được
            liên kết để tạo mật khẩu mới qua email.
          </p>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate={false}
                sx={{}}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Xác nhận
                </Button>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default QuenMatkhau;
