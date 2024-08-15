import "./donhang.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DonHang = () => {
  return (
    <div className="donhang">
      <div className="donhang_title font-semibold" style={{ padding: "20px" }}>
        Đơn hàng
      </div>
      <div className="donhang_content">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }}>Ngày mua</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tên khóa học</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tổng</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Thanh toán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>10/10/2024</TableCell>
                <TableCell>Khóa học Marketing</TableCell>
                <TableCell>7.000.000 đ</TableCell>
                <TableCell>Hoàn thành</TableCell>
                
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DonHang;
