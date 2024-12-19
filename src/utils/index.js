import { useEffect } from "react";

export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

export const tagList = ["wish", "gift", "trip", "others"];

export const useScroll = (ref, callback) => {
  useEffect(() => {
    const handleScroll = () => {
      callback();
    };

    const element = ref.current;

    if (element) {
      element.addEventListener("scroll", handleScroll);
      element.addEventListener("touchmove", handleScroll); // For mobile support
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
        element.removeEventListener("touchmove", handleScroll); // Clean up for mobile support
      }
    };
  }, [ref]);
};

export const setVar = (variable, value) => {
  document.documentElement.style.setProperty(variable, value);
};
