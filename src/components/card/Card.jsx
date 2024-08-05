import { useNavigate } from "react-router-dom";
import "./Card.scss";

const Card = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  const handleRedirectBook = (book) => {
    // const slug = convertSlug(book.mainText);
    navigate(`/book/${book.slug}`);
  };
  return (
    <div className="wrapper  " onClick={() => handleRedirectBook(item)}>
      <div className="thumbnail">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
            item?.thumbnail
          }`}
          alt="thumbnail book"
        />
      </div>

      <div className="text-cr">{item.mainText}</div>
      <div
        className="price-sold pb-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="price-carousel"
          style={{
            color: "rgb(255 66 78)",
            fontWeight: 600,
          }}
        >
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price)}
        </div>
      </div>
    </div>
  );
};

export default Card;
