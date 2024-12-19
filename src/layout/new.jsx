import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Alert from "../components/Alert";
import "./layout.scss";
import { handleInputChange, useScroll } from "../utils";
import ColorPicker from "../components/color-picker";
import Tags from "../components/tag";
import WishCard from "../components/wishPreview";
import { ArrowLeft, Download } from "lucide-react";

export default function NewWish() {
  const contentRef = useRef(null);
  const [data, setData] = useState({
    wish: "",
    tag: "wish",
    name: "Anonymous",
    color: 1,
  });
  // const [preview, setPreview] = useState(false);

  useLayoutEffect(() => {
    const clean = contentRef.current;
    clean.style.height = clean.firstChild.clientHeight + "px";
    if (!clean) return;
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

  useScroll(contentRef, () => {
    const clean = contentRef.current;
    if (!clean) return;
    const currentScroll = clean.scrollLeft;
    const maxScroll = clean.scrollWidth - clean.clientWidth;
    const scrollRatio = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

    const startHeight = clean.firstChild.clientHeight;
    const endHeight = clean.lastChild.clientHeight;
    const targetHeight = startHeight + (endHeight - startHeight) * scrollRatio;

    clean.style.height = `${targetHeight}px`;

    // setTimeout(() => {
    //   setPreview(scrollRatio > 0.6);
    // }, 1000);
  });

  return (
    <div className="new">
      <h1>New Wish</h1>
      <div className="new-content" ref={contentRef}>
        <WishForm {...{ data, setData, preview }} />
        <WishPreview {...{ data, setData, goBack }} />
      </div>
    </div>
  );
}

const WishForm = ({ data, setData, preview, submit }) => {
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!data.wish) {
      const clean = textareaRef.current;
      setError("Wish cannot be empty");
      if (clean) {
        clean.focus();
      }
      return;
    }

    // try {
    //   await createWish(data);
    //   setWish("");
    // } catch (error) {
    //   setError("Failed to create wish");
    // }
  };

  return (
    <form className="wish-form" onSubmit={handleSubmit}>
      <ColorPicker {...{ data, setData }} />
      <div className="area">
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="Write your wish here..."
          value={data.wish}
          name="wish"
          onChange={(e) => handleInputChange(e, data, setData)}
          rows={6}
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
      <div className="button">
        <button type="button" onClick={preview}>
          Preview
        </button>
        <button type="submit">Submit</button>
      </div>
      {error && <Alert message={error} onClose={() => setError(false)} />}
    </form>
  );
};

const WishPreview = ({ data, setData, goBack }) => {
  const { wish, tag, name, color } = data;
  return (
    <div className="wish-preview">
      <WishCard {...data} />
      <ColorPicker {...{ data, setData }} />
      <div className="button">
        <button type="button" onClick={goBack}>
          <ArrowLeft size={19} strokeWidth={2.5} />
        </button>
        <button type="submit">Submit</button>
        <button type="button" onClick={goBack}>
          <Download size={19} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
