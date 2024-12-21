import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Alert from "../components/Alert";
import "./layout.scss";
import { handleInputChange, useResize, useScroll } from "../utils";
import ColorPicker from "../components/color-picker";
import Tags from "../components/tag";
import WishCard from "../components/wishPreview";
import { ArrowLeft, Download, LoaderCircle } from "lucide-react";
import { useUser } from "../context/UserContext";
import Line from "../styles/icons";
import { postWish } from "../utils/api";

export default function NewWish() {
  const contentRef = useRef(null);
  const [data, setData] = useState({
    wish: "",
    tag: "wish",
    name: "Anonymous",
    color: 1,
  });
  const { msg, setMsg } = useUser();
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  const updateHeight = () => {
    const clean = contentRef.current;
    if (!clean) return;
    const currentScroll = clean.scrollLeft;
    const maxScroll = clean.scrollWidth - clean.clientWidth;
    const scrollRatio = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

    const startHeight = clean.firstChild.clientHeight;
    const endHeight = clean.lastChild.clientHeight;
    const targetHeight = startHeight + (endHeight - startHeight) * scrollRatio;

    clean.style.height = `${targetHeight}px`;
  };

  useLayoutEffect(() => {
    const clean = contentRef.current;
    clean.style.height = clean.firstChild.clientHeight + "px";
    if (!clean) return;
    clean.scrollTo({
      left: 0,
      behavior: "instant",
    });
    // preview();
  }, []);

  const scrollTo = (direction) => {
    const clean = contentRef.current;
    if (clean) {
      clean.style.scrollSnapType = "none";
      clean.scrollTo({
        left: direction === "right" ? clean.scrollWidth : 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        clean.style.scrollSnapType = "x mandatory";
      }, 500);
    }
  };

  const preview = () => scrollTo("right");
  const goBack = () => scrollTo("left");

  useScroll(contentRef, updateHeight);
  useResize(() => {
    setWidth(window.innerWidth);
    updateHeight();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(false);

    if (data.wish.length === 0) {
      const clean = contentRef.current;
      setMsg("Wish cannot be empty");
      if (clean) {
        clean.querySelector("textarea").focus();
      }
      return;
    }

    setLoading(true);
    postWish(data)
      .then((response) => {
        if (response) {
          setMsg(false);
          setTimeout(() => {
            setMsg("Wish submitted successfully");
            scrollTo("left");
            setData({ wish: "", tag: "wish", name: "Anonymous", color: 1 });
          }, 1);
        }
      })
      .catch((error) => {
        setMsg("Failed to submit wish");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="new">
      <h1>
        New Wish
        <Line
          style={{
            scale: `${width > 1440 ? 1.3 : width > 1024 ? 1.2 : 1}`,
          }}
        />
      </h1>
      <form className="new-content" ref={contentRef} onSubmit={handleSubmit}>
        <WishForm {...{ msg, setMsg, data, setData, preview, loading }} />
        <WishPreview {...{ data, setData, goBack, loading }} />
      </form>
    </div>
  );
}

const WishForm = ({ msgS, etMsg, data, setData, preview, loading }) => {
  return (
    <div className="wish-form">
      <ColorPicker {...{ data, setData }} />
      <div className="area">
        <textarea
          type="text"
          placeholder="Write your wish here..."
          value={data.wish}
          name="wish"
          onChange={(e) => handleInputChange(e, data, setData)}
          rows={6}
          spellCheck={"true"}
          maxLength={250}
        />
        <Tags {...{ data, setData }} />
        <div className="author">
          <span>By:</span>
          <input
            type="text"
            name="name"
            placeholder="Anonymous"
            maxLength={20}
            value={data.name}
            onChange={(e) => handleInputChange(e, data, setData)}
          />
        </div>
      </div>
      <ActionButton {...{ data, preview, loading }} />
    </div>
  );
};

const WishPreview = ({ data, setData, goBack, loading }) => {
  const { wish, tag, name, color } = data;
  return (
    <div className="wish-preview">
      <WishCard {...data} />
      <ColorPicker {...{ data, setData }} />
      <ActionButton {...{ goBack, data, loading, download: true }} />
    </div>
  );
};

export function ActionButton({ preview, goBack, download, loading, data }) {
  const { setDownload } = useUser();

  return (
    <div className="button">
      {goBack && (
        <button type="button" onClick={goBack}>
          <ArrowLeft size={19} strokeWidth={2.5} />
        </button>
      )}
      {preview && (
        <button type="button" onClick={preview}>
          Preview
        </button>
      )}
      <button type="submit" id={loading ? "loading" : ""}>
        <div>
          <Loader />
          Submit
        </div>
      </button>
      {download && (
        <button type="button" onClick={() => setDownload(data)}>
          <Download size={19} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export const Loader = ({ children }) => {
  return (
    <span className="loader">
      <LoaderCircle size={23} />
    </span>
  );
};
