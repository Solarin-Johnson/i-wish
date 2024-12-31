import React, { useState, useEffect } from "react";
import "./countdown.scss";
import NumberFlow from "@number-flow/react";

const Countdown = ({ targetDate = "2025-01-01T00:00:00" }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60).toString(),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <div className="countdown">
        <CountdownTimer value={timeLeft.hours} label="Hours" />
        <CountdownTimer value={timeLeft.minutes} label="Minutes" />
        <CountdownTimer value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

const CountdownTimer = ({ value, label }) => {
  return (
    <div className="countdown-item">
      <span>
        <NumberFlow value={value} />
      </span>
      <p>{label}</p>
    </div>
  );
};

export default Countdown;
