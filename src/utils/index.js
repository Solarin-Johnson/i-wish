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

export const initWish = [
  {
    tag: "trip",
    wish: "May your journey be filled with laughter, discovery, and unforgettable memories.",
    name: "Michael Brown",
    color: 3,
  },
  {
    tag: "gift",
    wish: "This gift is a reminder of how special you are to everyone around you.",
    name: "Emily Davis",
    color: 5,
  },
  {
    tag: "wish",
    wish: "Wishing you a future full of bright opportunities and happiness.",
    name: "John Doe",
    color: 3,
  },
  {
    tag: "others",
    wish: "Here’s to a future full of endless possibilities and boundless joy.",
    name: "Anonymous",
    color: 1,
  },
  {
    tag: "gift",
    wish: "A gift from the heart for someone truly special.",
    name: "Laura Perez",
    color: 5,
  },
  {
    tag: "wish",
    wish: "May each moment be more wonderful than the last.",
    name: "Kevin Hall",
    color: 0,
  },
  {
    tag: "others",
    wish: "May you always find beauty in the little things and joy in every day.",
    name: "Jessica Martinez",
    color: 5,
  },
  {
    tag: "trip",
    wish: "Wishing you a journey full of new friendships and beautiful memories.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "others",
    wish: "May you always find the strength to chase your dreams and the courage to make them real.",
    name: "Anonymous",
    color: 1,
  },
  {
    tag: "gift",
    wish: "May this gift bring a smile to your face and warmth to your soul.",
    name: "Alex Johnson",
    color: 0,
  },
  {
    tag: "trip",
    wish: "Wishing you thrilling adventures and safe travels.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "wish",
    wish: "May your heart be filled with love and your life with endless joy.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "trip",
    wish: "May this journey take you to places you’ve always dreamed of visiting.",
    name: "Megan Clark",
    color: 4,
  },
  {
    tag: "gift",
    wish: "Here’s a small token of appreciation for someone truly wonderful.",
    name: "Anonymous",
    color: 1,
  },
  {
    tag: "others",
    wish: "Sending you positive vibes and good energy for all that lies ahead.",
    name: "Chris Taylor",
    color: 0,
  },
  {
    tag: "wish",
    wish: "May your dreams come true and your days be as beautiful as your heart.",
    name: "Jane Smith",
    color: 4,
  },
  {
    tag: "wish",
    wish: "Wishing you peace, love, and all the happiness the world can offer.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "trip",
    wish: "Here’s to exploring new horizons and finding joy in every moment.",
    name: "Sarah Wilson",
    color: 4,
  },
  {
    tag: "gift",
    wish: "This is just a small way to say thank you for being amazing.",
    name: "David Lee",
    color: 3,
  },
  {
    tag: "others",
    wish: "May your path be lined with happiness, and your life be filled with success.",
    name: "Anna Thompson",
    color: 3,
  },
];
