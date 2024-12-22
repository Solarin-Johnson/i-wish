import { useEffect, useLayoutEffect, useRef, useState } from "react";
import WishCard, { WishCardFull } from "../components/wishPreview";
import "./wall.scss";
import { mergeRefs, setVar, shuffler, useScroll } from "../utils";
import { getAllWish } from "../utils/api";
import { Loader } from "./new";
import { useUser } from "../context/UserContext";
import { useInView } from "react-intersection-observer";
import NumberFlow from "@number-flow/react";

export default function Wall() {
  const [data, setData] = useState({ data: [] });
  const { countLeft, setCountLeft } = useUser();

  useLayoutEffect(() => {
    getAllWish().then((response) => {
      setData({
        ...response,
        data: shuffler(response.data),
      });
    });
  }, []);

  useEffect(() => {
    if (data.count) {
      setCountLeft(data.count);
    }
  }, [data]);

  return (
    <div className="wall">
      <WallBanner />
      <WallContent data={data?.data} count={data?.count} />
      {countLeft && <WallCountIndicator count={countLeft} />}
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

const WallContent = ({ data, count }) => {
  useEffect(() => {
    setVar("--wall-wish-l", data.length);
  }, [data]);

  return (
    <div className="wrapper">
      {data.length > 0 ? (
        <div className="plate">
          <div className="wall-content">
            {data.map((wish, index) => (
              <WallWishCard key={index} index={index} {...wish} count={count} />
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
  const cardRef = useRef(null);
  const { countLeft, setCountLeft } = useUser();
  const { ref, inView } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });
  const { index, count, ...rest } = props;

  useEffect(() => {
    if (inView) {
      setCountLeft((prev) => prev - 1);
    }
  }, [inView, count]);

  console.log(countLeft);

  useEffect(() => {
    const randomRotate = Math.random() * 7 - 3.5; // Random between -3.5 and 3.5 degrees
    cardRef.current.style.setProperty("--random-rotate", `${randomRotate}deg`);
    cardRef.current.style.setProperty(
      "--delay",
      `${Math.floor(Math.random() * 1000)}ms`
    );
  }, []);

  return (
    <div
      className="wall-content-card"
      ref={mergeRefs(ref, cardRef)}
      tabIndex={0}
    >
      <WishCard {...rest} download={false} author={false} />
    </div>
  );
};

const WallCountIndicator = ({ count }) => {
  return (
    <div
      className={`wall-count  ${count === 0 ? "hide" : ""}`}
      onClick={() => window.scrollBy({ top: 250, behavior: "smooth" })}
    >
      <div>&darr;</div>
      <div>
        <p>
          <NumberFlow value={count} duration={1} />
        </p>
        {/* <span></span> */}
      </div>
    </div>
  );
};
