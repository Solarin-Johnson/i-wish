import { Check } from "lucide-react";
import "./ui.scss";

export default function ColorPicker({ data, setData }) {
  const { color } = data;
  const colors = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="color-picker">
      {colors.map((c) => (
        <button
          title="Select color"
          key={c}
          type="button"
          className={`color ${color === c ? "active" : ""}`}
          onClick={() => setData((prev) => ({ ...prev, color: c }))}
        >
          <div>{color === c && <Check size={16} strokeWidth={2.5} />}</div>
        </button>
      ))}
    </div>
  );
}
