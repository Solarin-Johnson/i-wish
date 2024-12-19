import { useState } from "react";
import Alert from "../components/Alert";

export default function NewWish() {
  return (
    <div className="new">
      <h1>New Wish</h1>
      <WishForm />
      <Alert severity="info" message={"Hi there"} onClose={() => alert("kk")} />
    </div>
  );
}

const WishForm = () => {
  const [wish, setWish] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!wish) {
      setError("Wish cannot be empty");
      return;
    }

    try {
      await createWish(wish);
      setWish("");
    } catch (error) {
      setError("Failed to create wish");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your wish"
        value={wish}
        onChange={(e) => setWish(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
