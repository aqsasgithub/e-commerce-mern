import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color = "yellow-500" }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={`full-${index}`} className={`text-${color} ml-1`} />
      ))}

      {halfStars === 1 && (
        <FaStarHalfAlt className={`text-${color} ml-1`} />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} className={`text-${color} ml-1`} />
      ))}

      {text && (
        <span className={`rating-text ml-[2rem] text-${color}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Ratings;
