import { useEffect, useRef } from "react";
import WishCard, { WishCardFull } from "../components/wishPreview";
import "./wall.scss";
import { initWish, setVar } from "../utils";

export default function Wall() {
  return (
    <div className="wall">
      <WallBanner />
      <WallContent data={initWish} />
    </div>
  );
}

const WallBanner = () => {
  return (
    <div className="wall-banner">
      <h1>Global Wish </h1>
      <p> Collection of all wishes posted</p>
    </div>
  );
};

const WallContent = ({ data }) => {
  useEffect(() => {
    setVar("--wall-wish-l", data.length);
  }, [data]);

  return (
    <div className="wrapper">
      <div className="plate">
        <div className="wall-content">
          {data.map((wish, index) => (
            <WallWishCard key={index} index={index} {...wish} />
          ))}
        </div>
      </div>
    </div>
  );
};

const WallWishCard = (props) => {
  const cardRef = useRef();
  const { index, ...rest } = props;

  return (
    <div className="wall-content-card" key={index} ref={cardRef}>
      <WishCard {...rest} download={false} author={false} />
    </div>
  );
};
