import { useEffect, useRef, useState } from "react";
import Alert from "../components/Alert";
import "./layout.scss";
import { handleInputChange } from "../utils";
import ColorPicker from "../components/color-picker";
import Tags from "../components/tag";

export default function NewWish() {
  const contentRef = useRef(null);
  const [data, setData] = useState({
    wish: "",
    tag: "wish",
    name: "Anonymous Elf",
    color: 1,
  });
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const clean = contentRef.current;
    if (clean) {
      if (preview) {
        clean.scrollTo({
          left: contentRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  }, [preview]);

  return (
    <div className="new">
      <h1>New Wish</h1>
      <div className="new-content" ref={contentRef}>
        <WishForm {...{ data, setData, setPreview }} />
        <WishPreview {...{ data, setData }} />
      </div>
    </div>
  );
}

const WishForm = ({ data, setData, setPreview, submit }) => {
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
      </div>
      <div className="button">
        <button type="button" onClick={() => setPreview(true)}>
          Preview
        </button>
        <button type="submit">Submit</button>
      </div>
      {error && <Alert message={error} onClose={() => setError(false)} />}
    </form>
  );
};

const WishPreview = ({ data, setData }) => {
  const { wish, tag, name, color } = data;
  return (
    <div className="wish-preview">
      <div className="preview">
        <p>{wish}</p>
        <pre>{tag}</pre>
      </div>
      <ColorPicker {...{ data, setData }} />
    </div>
  );
};
