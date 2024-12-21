import { useEffect, useLayoutEffect, useRef } from "react";
import { setVar } from "../utils";
import "./ui.scss";
import { Ribbon } from "lucide-react";
import html2canvas from "html2canvas";
import { useUser } from "../context/UserContext";

const WishCard = ({ index, ex, max, hide, tag, wish, color, name }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    cardRef.current.style.setProperty("--color-s", `var(--accent-${color})`);
    cardRef.current.style.setProperty("--color-f", `var(--accent-${color}00)`);
    cardRef.current.style.setProperty("--color-t", `var(--text-${color})`);
    cardRef.current.style.setProperty("--color-b", `var(--card-bg-${color})`);
  }, [color]);

  return (
    <div
      className={`wish-card ${hide ? "hide" : ""}`}
      id={ex ? "ex" : ""}
      style={{
        "--z": index,
        "--rotate": `${index === max - 1 ? 0 : index <= max - 3 ? 8 : 4}deg`,
      }}
      ref={cardRef}
    >
      <div className="wish-card-tag">{tag}</div>
      <div className="wish-card-body">
        <div className="wish-card-body-text" id="serif">
          {wish.trim() || "Make a wish..."}
        </div>
      </div>
      <div className="wish-card-footer">
        <div className="wish-card-thumb">
          <Ribbon size={18} strokeWidth={1.3} />
        </div>
        <div className="wish-card-author">{name || "Anonymous"}</div>
      </div>
    </div>
  );
};

export const WishCardFull = ({
  tag,
  wish,
  color,
  name,
  download = true,
  author = true,
}) => {
  const containerRef = useRef(null);
  const { setDownload, setMsg } = useUser();

  useLayoutEffect(() => {
    download && setMsg("Downloading your wish card...");
    setVar("--color-s", `var(--accent-${color})`);
    setVar("--color-f", `var(--accent-${color}00)`);
    setVar("--color-t", `var(--text-${color})`);
    setVar("--color-b", `var(--card-bg-${color})`);
  }, []);

  useEffect(() => {
    const captureScreen = async () => {
      let token;
      try {
        token = crypto.randomUUID().toString().slice(0, 6).padStart(6, "0");
      } catch (error) {
        token = Math.random().toString(36).substring(2, 8);
      }

      const clean = containerRef.current;
      if (clean) {
        const canvas = await html2canvas(clean, {
          backgroundColor: "#000",
          scale: 3,
          imageTimeout: 1500,
          width: 380,
          height: clean.clientHeight - 2,
        });
        await new Promise((resolve) => {
          canvas.toBlob(async (blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `wish-card-${name.toLowerCase()}-${token}.jpeg`;
            link.click();
            URL.revokeObjectURL(url);
            resolve();
          }, "image/jpeg");
          // alert("Your wish has been downloaded!");
        }).then(() => {
          setDownload(false);
          setTimeout(() => {
            setMsg(false);
            setTimeout(() => {
              setMsg("Your wish has been downloaded!");
            }, 0);
          }, 1000);
        });
      }
    };
    download && captureScreen();
  }, [containerRef]);

  useEffect(() => {
    containerRef.current.style.setProperty(
      "--color-s",
      `var(--accent-${color})`
    );
    containerRef.current.style.setProperty(
      "--color-f",
      `var(--accent-${color}00)`
    );
    containerRef.current.style.setProperty("--color-t", `var(--text-${color})`);
  }, [color]);
  return (
    <div className="wish-card-container" ref={containerRef}>
      <WishCard {...{ tag, wish, color, name }} />
      {author && (
        <div className="author">
          <span>Built by @dotjs</span>
        </div>
      )}
    </div>
  );
};

export default WishCard;
