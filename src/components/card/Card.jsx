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
    <div className="wrapper pb-3 " onClick={() => handleRedirectBook(item)}>
      <div className="thumbnail">
        <img
          loading="lazy"
          src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
            item?.thumbnail
          }`}
          alt="thumbnail book"
        />
      </div>

      <div className="line-clamp-2 h-[40px] px-5 my-2 leading-5 font-semibold text-blue-600">
        {item.mainText}
      </div>

      <div className="px-5 h-fit leading-5 italic text-gray-600 line-clamp-1 ">
        {item.author}
      </div>

      <div
        className="price-carousel px-5"
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
  );
};

export default Card;
