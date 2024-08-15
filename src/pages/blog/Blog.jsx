import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img_1 from "../../assets/tt.jpg";

export default function Blog(props) {
  const { detail } = props;
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/tin-tuc/${detail.slug}`)}
      className="h-full"
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
            detail?.thumbnail
          }`}
          alt="green iguana"
          className="h-[200px] object-cover"
        />
        <CardContent>
          <Typography
            gutterBottom
            component="span"
            className="!font-semibold h-[46px] text-md !capitalize line-clamp-2 leading-5"
          >
            {detail.tieude}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-3"
          >
            {detail.mota_ngan}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">xem thêm</Button>
      </CardActions>
    </Card>
  );
}
