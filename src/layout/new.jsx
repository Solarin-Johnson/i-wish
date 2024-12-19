import { useState } from "react";
import Alert from "../components/Alert";
import "./layout.scss";
import { handleInputChange } from "../utils";
import ColorPicker from "../components/color-picker";

export default function NewWish() {
  const [data, setData] = useState({
    wish: "",
    tag: "",
    name: "",
    color: 1,
  });
  return (
    <div className="new">
      <h1>New Wish</h1>
      <div className="new-content">
        <WishForm {...{ data, setData }} />
        <WishPreview {...data} />
      </div>
    </div>
  );
}

const WishForm = ({ data, setData, submit }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!data) {
      setError("Wish cannot be empty");
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
      <textarea
        type="text"
        placeholder="Enter your wish"
        value={data.wish}
        name="wish"
        onChange={(e) => handleInputChange(e, data, setData)}
        rows={6}
      />
      <button type="submit">Submit</button>
      {error && <Alert message={error} onClose={() => setError(false)} />}
    </form>
  );
};

const WishPreview = ({ wish, tag, name, color }) => {
  return <div className="wish-preview">{wish}</div>;
};
