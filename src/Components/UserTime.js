import React, { useState } from 'react'

export default function UserTime({country,countrycode}) {
  let date=new Date()
  const time=date.toLocaleTimeString()
  
  const [currentTime, setCurrentTime] = useState(time)
  
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds= date.getSeconds()
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds=seconds < 10 ? '0'+seconds : seconds;
    var strTime = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    return strTime;
  }
  const updateTime=()=>{
    let newTime=formatAMPM(new Date())
    setCurrentTime(newTime)
  }

  setInterval(updateTime,1000)
  return (
    <div className="clockHolder">
      <div className="countryName">
        {country}
      </div>
      <div className="countryFlag">
        <img src={`https://flagcdn.com/80x60/${countrycode}.png`} alt={`${country}`} />
      </div>
      <div className="Date">

      </div>
      <div className="time">
        {currentTime}
      </div>
    </div>
  )
}
