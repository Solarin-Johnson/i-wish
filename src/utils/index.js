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

    const element = ref;

    if (element) {
      element.addEventListener("scroll", handleScroll, { passive: true });
      element.addEventListener("touchmove", handleScroll, { passive: true }); // For mobile support
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

export const useResize = (callback) => {
  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  });
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  const isMobile =
    /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isTablet =
    /tablet|ipad/.test(userAgent) ||
    (/android/.test(userAgent) && !/mobile/.test(userAgent));
  const isDesktop = !isMobile && !isTablet;

  if (isMobile) {
    return "mobile";
  }

  if (isTablet) {
    return "tablet";
  }

  return "pc";
};

export const shuffler = (array) => {
  if (!Array.isArray(array)) {
    return [];
  }
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled;
};

export const mergeRefs =
  (...refs) =>
  (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };


