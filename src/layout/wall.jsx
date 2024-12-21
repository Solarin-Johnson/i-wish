import { useEffect, useLayoutEffect, useRef, useState } from "react";
import WishCard, { WishCardFull } from "../components/wishPreview";
import "./wall.scss";
import { setVar, shuffler } from "../utils";
import { getAllWish } from "../utils/api";
import { Loader } from "./new";

export default function Wall() {
  const [data, setData] = useState({ data: [] });

  useLayoutEffect(() => {
    getAllWish().then(setData);
  }, []);
  return (
    <div className="wall">
      <WallBanner />
      <WallContent data={shuffler(data?.data)} />
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
      {data.length > 0 ? (
        <div className="plate">
          <div className="wall-content">
            {data.map((wish, index) => (
              <WallWishCard key={index} index={index} {...wish} />
            ))}
          </div>
        </div>
      ) : (
        <div className="loading">
          <Loader />
        </div>
      )}
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
