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
      <h1>Global Wish</h1>
      <p>
        A collection of heartfelt wishes from around the world {"->"} Explore
        the joy.
      </p>
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

  useEffect(() => {
    const randomRotate = Math.random() * 7 - 3.5; // Random between -3.5 and 3.5 degrees
    cardRef.current.style.setProperty("--random-rotate", `${randomRotate}deg`);
    cardRef.current.style.setProperty(
      "--delay",
      `${Math.floor(Math.random() * 1000)}ms`
    );
  }, []);

  return (
    <div className="wall-content-card" key={index} ref={cardRef}>
      <WishCard {...rest} download={false} author={false} />
    </div>
  );
};
