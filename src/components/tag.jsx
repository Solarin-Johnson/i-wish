import React from "react";
import { tagList } from "../utils";
import "./ui.scss";
import { Check } from "lucide-react";

const Tags = ({ data, setData }) => {
  return (
    <span className="tags">
      {tagList.map((tag, index) => (
        <Tag
          key={index}
          text={tag}
          id={data.tag === tag ? "active" : ""}
          onClick={() => setData((prev) => ({ ...prev, tag }))}
        />
      ))}
    </span>
  );
};

const Tag = ({ text, ...props }) => {
  return (
    <button title={text} type="button" className="tag" {...props}>
      <span>{text}</span>
      <Check size={14} strokeWidth={2.5} />
    </button>
  );
};

export default Tags;
