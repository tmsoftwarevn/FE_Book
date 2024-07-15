import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./login.scss";
import { message } from "antd";
import { ApiLogin } from "../../services/api";
import { doLoginAction } from "../../redux/account/accountSlice";
import { doLoginSocialFalse, doLoginSocialTrue } from "../../redux/cart/cartSlice";
import GoogleButton from "react-google-button";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoginSocial = useSelector((state) => state.cart.isLoginSocial);

  useEffect(() => {
    if (localStorage.getItem("access_token")) return navigate("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email")) {
      message.error("Hãy nhập đầy đủ thông tin !");
      return;
    }

    if (!data.get("password")) {
      message.error("Hãy nhập đầy đủ thông tin !");
      return;
    }
    const login = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let res = await ApiLogin(login.email, login.password);
    if (res?.data) {
      localStorage.setItem("access_token", res.access_token);
      dispatch(doLoginAction(res.data));
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      message.error("Tài khoản hoặc mật khẩu không chính xác !");
    }
  };

  useEffect(() => {
    if (isLoginSocial === true) {
      let user = "";
      const getUser = async () => {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/login/success`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
            cache: "no-cache",
          }
        )
          .then((response) => response.json())
          .then((resObject) => {
            console.log("checkkkkkk res", resObject);
            user = resObject;
          })
          .catch((err) => {
            console.log(err);
          });
        dispatch(doLoginSocialFalse());
        if (user && user.data) {
          localStorage.setItem("access_token", user?.access_token);
          dispatch(doLoginAction(user?.data));
          message.success("Đăng nhập thành công");
          navigate("/");
        }
      };
      getUser();
    }
  }, []);
  const handleLoginWithGoogle = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,
      "_self"
    );
    dispatch(doLoginSocialTrue());
  };
  return (
    <div className="login">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#2196f3" }}>
              <HomeIcon
                className="cursor-pointer"
                onClick={() => navigate("/")}
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              ĐĂNG NHẬP
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate={false}
              sx={{ mt: 1 }}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/quen-mat-khau" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Chưa có tài khoản? Đăng ký"}
                  </Link>
                </Grid>
              </Grid>
              <div className="text-center font-bold "></div>
              <div className="mx-auto w-fit mt-5">
                <GoogleButton
                  onClick={() => handleLoginWithGoogle()}
                  label="Đăng nhập với Google"
                />
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
