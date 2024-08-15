import "./Baomat.scss";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const Baomat = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      pass_new: data.get("pass_new"),
      pass_old: data.get("pass_old"),
      confirm_pass_new: data.get("confirm_pass_new"),
    });
  };
  return (
    <div className="baomat">
      <div className="baomat_title font-semibold" style={{ padding: "20px" }}>
        Bảo mật
      </div>
      <div className="baomat_content">
        <Box
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="pass_old"
                required
                fullWidth
                id="pass_old"
                label="Mật khẩu cũ"
                
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="pass_new"
                label="Mật khẩu mới"
                name="pass_new"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirm_pass_new"
                label="Xác nhận mật khẩu mới"
                name="confirm_pass_new"
               
                
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

export default Baomat;
