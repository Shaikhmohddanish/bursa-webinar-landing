'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
  textSize?: string;
  textColor?: string;
}

export function CountdownTimer({ className = '', textSize = 'text-sm', textColor = 'text-red-500' }: CountdownTimerProps) {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Try to get saved time from localStorage
    const savedEndTime = localStorage.getItem('countdown-end-time');
    let endTime: number;
    
    if (!savedEndTime) {
      // If no saved time, set a new end time (10 minutes from now)
      endTime = Date.now() + (10 * 60 * 1000);
      localStorage.setItem('countdown-end-time', endTime.toString());
    } else {
      endTime = parseInt(savedEndTime);
      
      // If the saved end time is in the past, reset it
      if (endTime < Date.now()) {
        endTime = Date.now() + (10 * 60 * 1000);
        localStorage.setItem('countdown-end-time', endTime.toString());
      }
    }
    
    // Update the timer initially
    updateRemainingTime(endTime);
    
    // Set up interval to update the timer every second
    const countdownInterval = setInterval(() => {
      updateRemainingTime(endTime);
    }, 1000);
    
    // Function to calculate and update remaining time
    function updateRemainingTime(endTime: number) {
      const remainingTime = Math.max(0, endTime - Date.now());
      
      if (remainingTime <= 0) {
        setIsExpired(true);
        clearInterval(countdownInterval);
        return;
      }
      
      const mins = Math.floor(remainingTime / (60 * 1000));
      const secs = Math.floor((remainingTime % (60 * 1000)) / 1000);
      
      setMinutes(mins);
      setSeconds(secs);
    }

    // Clean up interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  // Ensure two digits are displayed
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  if (isExpired) {
    return (
      <span className={`font-bold ${textColor} ${textSize} ${className}`}>
        Offer Expired!
      </span>
    );
  }

  return (
    <span className={`font-bold ${textColor} ${textSize} ${className}`}>
      {formattedMinutes}:{formattedSeconds}
    </span>
  );
}
