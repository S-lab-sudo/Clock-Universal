import React, { useState } from 'react'

export default function SelectedTime({ data }) {
  const [first, setFirst] = useState()
  
  const dateGen = (offset) => {
    var b = new Date()
    var utc = b.getTime() + (b.getTimezoneOffset() * 60000)
    var date = new Date((utc + (1000 * offset)))
    return date
  }
  const conversionToString = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds()
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    return strTime
  }
  const dateIncrementor=(date)=>{
    return date.setTime(date.getTime()+1000)
  }
  
  setInterval(()=>{
    setFirst(conversionToString(new Date(dateIncrementor(dateGen(data.gmtOffset)))));
  },1000)

  return (
    <div className="clockHolder">
      <div className="countryName">
        {data.countryName}
      </div>
      <div className="countryFlag">
        <img src={`https://flagcdn.com/80x60/${data.countryCode.toLocaleLowerCase()}.png`} alt={`${data.countryName} Flag`} />
      </div>
      <div className="Date">

      </div>
      <div className="time">
        {first}
      </div>
    </div>
  )
}
