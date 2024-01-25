import { Button, Divider, Form, Input, message, notification } from "antd";
import "./login.scss";
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { ApiLogin } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { useEffect } from "react";
import {
  doLoginSocialFalse,
  doLoginSocialTrue,
} from "../../redux/cart/cartSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginSocial = useSelector((state) => state.cart.isLoginSocial);
  //////////////////

  const onFinish = async (values) => {
    const { email, password } = values;
    let res = await ApiLogin(email, password);
    if (res?.data) {
      localStorage.setItem("access_token", res.access_token);
      dispatch(doLoginAction(res.data));
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 4,
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) return navigate("/");
  }, []);
  useEffect(() => {
    console.log("check isloginlocal: ", isLoginSocial);
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
  const handleLoginWithFacebook = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/facebook`,
      "_self"
    );
    dispatch(doLoginSocialTrue());
  };
  return (
    <div className="login-container">
      <div className="content">
        <div className="title-login">Đăng Nhập</div>
        <Divider />
        <div className="form-content">
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              //label="Email"
              name="email"
              requiredMark={"optional"} // off star form
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              // label="Mật khẩu"
              name="password"
              requiredMark={"optional"}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password visibilityToggle={false} placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text">
          <p onClick={() => navigate("/register")}>Đăng kí</p>
          <u onClick={() => navigate("/forgot-password")}>Quên mật khẩu ?</u>
        </div>
        <div className="group">
          <Divider
            style={{
              borderColor: "black",
            }}
          >
            Or Login Using
          </Divider>
          <div className="login-with">
            <div className="google" onClick={() => handleLoginWithGoogle()}>
              <GrGoogle />
            </div>
            <div className="faceBook" onClick={handleLoginWithFacebook}>
              <GrFacebook />
            </div>
          </div>
          <div className="home" onClick={() => navigate("/")}>
            Trang Chủ
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
