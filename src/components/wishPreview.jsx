import { useEffect } from "react";
import { setVar } from "../utils";
import "./ui.scss";
import { Ribbon } from "lucide-react";

const WishCard = ({ index, ex, max, hide, tag, wish, color, name }) => {
  useEffect(() => {
    setVar("--color-s", `var(--accent-${color})`);
    setVar("--color-f", `var(--accent-${color}00)`);
    setVar("--color-t", `var(--text-${color})`);
  }, [color]);
  return (
    <div
      className={`wish-card ${hide ? "hide" : ""}`}
      id={ex ? "ex" : ""}
      style={{
        "--z": index,
        "--rotate": `${index === max - 1 ? 0 : index <= max - 3 ? 8 : 4}deg`,
      }}
    >
      <div className="wish-card-tag">{tag}</div>
      <div className="wish-card-body">
        <div className="wish-card-body-text" id="serif">
          {wish.trim() || "Make a wish..."}
        </div>
      </div>
      <div className="wish-card-footer">
        <div className="wish-card-thumb">
          <Ribbon size={19} strokeWidth={1.3} />
        </div>
        <div className="wish-card-author">{name || "Anonymous"}</div>
      </div>
    </div>
  );
};

export default WishCard;
