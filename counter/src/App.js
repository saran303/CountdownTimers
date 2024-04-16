import { useState, useEffect } from 'react';
import './App.css';
import DisplayButton from './Components/DisplayButton/DisplayButton';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [start, setStart] = useState(false);
  const [targetDate, setTargetDate] = useState("");
  const [countdownData, setCountdownData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });
  const [intervalId, setIntervalId] = useState(null);
  const matches = useMediaQuery('(min-width:600px)');

  const startCountdown = (targetDateTime) => {
    clearInterval(intervalId); // Clear any existing intervals
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDateTime);

      if (target > now) {
        const distance = target - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days <= 99 && hours <= 23 && minutes <= 59 && seconds <= 59) {
          setStart(true);
          setCountdownData({ days, hours, minutes, seconds, message: "" });
        } else {
          setCountdownData({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            message: "Selected time is more than 100 days",
          });
        }
      } else {
        setStart(false);
        setCountdownData({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          message:
            "🎉 The countdown is over! What's next on your adventure? 🎉",
        });
        clearInterval(interval);
      }
    }, 1000);
    setIntervalId(interval);
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [intervalId]);

  let handleStart = (e) => {
    setStart(!start);
    startCountdown(targetDate);
    e.preventDefault();
  }
  const handleCancel = () => {
    clearInterval(intervalId);
    setStart(false);
    setCountdownData({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "",
    });
  };
  return (
    <div className="App">
      <div className='header'>
        <h1 className='header1'>Countdown</h1><h1 className='header2'>Timer</h1>
      </div>
      <form className='formStyle'>
        <input type='datetime-local'className='dateInput' value={targetDate} onChange={e => setTargetDate(e.target.value)}></input>
        {!start ?(<button type='submit' className='btn' onClick={(e) => handleStart(e)}>Start Timer</button>) :
        (<button type='submit' className='btn' onClick={(e) => handleCancel(e)}>Cancel Timer</button>)}
      </form>
      {!(countdownData.message.length > 0)?
      <div className={matches && 'display'}> 
        <DisplayButton counterValue={countdownData.days} counterName="Days"></DisplayButton>
        <DisplayButton counterValue={countdownData.hours} counterName="Hours"></DisplayButton>
        <DisplayButton counterValue={countdownData.minutes} counterName="Minutes"></DisplayButton>
        <DisplayButton counterValue={countdownData.seconds} counterName="Seconds"></DisplayButton>
      </div> : 
      <div className='msg'>{countdownData.message}</div>
      }
    </div>
  );
}

export default App;
