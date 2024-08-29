import "./taikhoan.scss";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetInfoDelivery } from "../../services/api";
import { doUpdateAddressUser } from "../../redux/account/accountSlice";
const Info = () => {
  const [name, setName] = useState("fdff");
  const delivery = useSelector((state) => state.account?.delivery);
  const user = useSelector((state) => state.account?.user);
  const dispatch = useDispatch();

  useEffect(() => {
   
    const getInfoDelivery = async () => {
     
      let res = await callGetInfoDelivery(user?.id);
      if (res && res.data[0]) {
        dispatch(doUpdateAddressUser(res.data[0]));
        
      }
    };
   
    getInfoDelivery();
  }, [user]);

  console.log('dedd', delivery)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("fullName"),
      phone: data.get("phone"),
      cf_password: data.get("confirm-password"),
    });
  };
  return (
    <div className="info">
      <div className="info_title font-semibold" style={{ padding: "20px" }}>
        Tài khoản
      </div>
      <div className="info_content">
        <Box
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="fullName"
                required
                fullWidth
                id="fullname"
                label="Họ và tên"
                defaultValue={user?.fullName}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                defaultValue={user?.email}
                disabled
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cập nhật
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Info;
