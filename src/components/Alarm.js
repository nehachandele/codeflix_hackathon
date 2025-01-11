// src/components/Alarm.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Alarm = ({ currentAlarm }) => {
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    if (!currentAlarm || !currentAlarm.time) return;

    const checkAlarm = () => {
      const now = new Date();
      if (
        now.getHours() === currentAlarm.time.getHours() &&
        now.getMinutes() === currentAlarm.time.getMinutes()
      ) {
        setIsRinging(true);
      }
    };

    const interval = setInterval(checkAlarm, 1000);

    return () => clearInterval(interval);
  }, [currentAlarm]);

  useEffect(() => {
    if (isRinging) {
      const timer = setTimeout(() => setIsRinging(false), 60000); // Stop ringing after 1 minute
      return () => clearTimeout(timer);
    }
  }, [isRinging]);

  return (
    <div>
      {isRinging && (
        <>
          <p style={{ color: "red", fontWeight: "bold" }}>Alarm is ringing!</p>
          <audio autoPlay loop>
            <source src="/alarm.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </div>
  );
};

Alarm.propTypes = {
  currentAlarm: PropTypes.shape({
    time: PropTypes.instanceOf(Date).isRequired,
  }),
};

Alarm.defaultProps = {
  currentAlarm: null,
};

export default Alarm;
