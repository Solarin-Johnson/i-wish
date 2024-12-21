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
    wish: "Have an awesome adventure filled with great memories.",
    name: "Michael Brown",
    color: 3,
  },
  {
    tag: "gift",
    wish: "Hope this gift makes your day a little brighter.",
    name: "Emily Davis",
    color: 5,
  },
  {
    tag: "wish",
    wish: "Good luck with everything you’re working on. You’ve got this!",
    name: "John Doe",
    color: 3,
  },
  {
    tag: "others",
    wish: "Hope your future is full of exciting possibilities and joy.",
    name: "Anonymous",
    color: 1,
  },
  {
    tag: "gift",
    wish: "Just a little something to let you know you’re amazing.",
    name: "Laura Perez",
    color: 5,
  },
  {
    tag: "wish",
    wish: "Hope today brings you something special to smile about.",
    name: "Kevin Hall",
    color: 0,
  },
  {
    tag: "others",
    wish: "Take a moment to appreciate the small things that bring happiness.",
    name: "Jessica Martinez",
    color: 5,
  },
  {
    tag: "trip",
    wish: "Enjoy every bit of your journey—it’s going to be incredible.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "others",
    wish: "Stay strong and keep chasing what makes you happy.",
    name: "Anonymous",
    color: 1,
  },
  {
    tag: "gift",
    wish: "Hope this brings a smile to your face—it’s just for you.",
    name: "Alex Johnson",
    color: 0,
  },
  {
    tag: "trip",
    wish: "Safe travels! Can’t wait to hear all about it when you’re back.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "wish",
    wish: "Hope you’re surrounded by good vibes and happy moments today.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "trip",
    wish: "Go explore and create memories that’ll last forever.",
    name: "Megan Clark",
    color: 4,
  },
  {
    tag: "gift",
    wish: "This is just a little way to show you’re appreciated.",
    name: "Anonymous",
    color: 1,
  },
  {
    tag: "others",
    wish: "Wishing you nothing but positive vibes ahead.",
    name: "Chris Taylor",
    color: 0,
  },
  {
    tag: "wish",
    wish: "Dream big and let every moment count.",
    name: "Jane Smith",
    color: 4,
  },
  {
    tag: "wish",
    wish: "Hope your day is as bright and awesome as you are.",
    name: "Anonymous",
    color: 2,
  },
  {
    tag: "trip",
    wish: "Here’s to making the most of your trip \n\n—have fun!",
    name: "Sarah Wilson",
    color: 4,
  },
  {
    tag: "gift",
    wish: "Just a little something to show how much you’re appreciated.",
    name: "David Lee",
    color: 3,
  },
  {
    tag: "others",
    wish: "Keep moving forward—great things are waiting for you.",
    name: "Anna Thompson",
    color: 3,
  },
];
