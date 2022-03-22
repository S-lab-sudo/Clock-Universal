import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import UserTime from './Components/UserTime';
import SelectedTime from './Components/SelectedTime';

function App() {
  const [dataFromAPI, setDataFromAPI] = useState([])
  const [thisCountry, setThisCountry] = useState('')
  const [thiscountryCode, setThiscountryCode] = useState('')

  const [sortedTimeZone, setSortedTimeZone] = useState([])
  const [filteredFromText, setFilteredFromText] = useState([])

  const [userSelectedTime, setUserSelectedTime] = useState([])

  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.timezonedb.com/v2.1/list-time-zone?key=NKCDTKSSOD7J&format=json').then(res => {
      if (res.status === 200) {
        setDataFromAPI(res.data.zones)
      }
    })
    axios.get('https://json.geoiplookup.io/').then(response => {
      setThisCountry(response.data.country_name)
      setThiscountryCode(response.data.country_code.toLocaleLowerCase())
    })
  }, [])
  useEffect(() => {
    let sortedArray = dataFromAPI.sort((a, b) => {
      let fa = a.countryName.toLowerCase();
      let fb = b.countryName.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setSortedTimeZone(sortedArray)
    setFilteredFromText(sortedArray)
  }, [dataFromAPI])

  const showSearch = (e) => {
    const search = document.querySelector('.search')
    search.style.display = 'block'
  }

  const hideIt = (e) => {
    const search = document.querySelector('.search')
    setSearch('')
    search.style.display = 'none'
  }

  useEffect(()=>{
    let text=document.getElementById('search').value
    console.log(text);
    return ()=>setFilteredFromText(sortedTimeZone.filter(value=>{
      if(!text){
        return true
      }
      if(value.countryName.includes(text) || value.countryCode.includes(text) ){
        return true
      }
    }))
  },[search])
  
  const addTime=(value)=>{
    setUserSelectedTime([...userSelectedTime,value])
  }
  return (
    <div className="App centeredDiv">
      <div className="search">
        <div className="inpclose">
          <input id='search' type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Country's Name" />
          <button onClick={hideIt} >X</button>
        </div>
        <div className="results">
          <div className="lists">
            <ul>
              {filteredFromText.map((value, index) => {
                return <li key={index} onClick={()=>addTime(value)} >{value.countryName}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <UserTime country={thisCountry} countrycode={thiscountryCode} ></UserTime>
        {userSelectedTime.map((value, index) => {
          return <SelectedTime data={value} key={index} />
        })}
        <div className="addTime">
          <button onClick={showSearch} > + </button>
        </div>
      </div>
    </div>
  );
}

export default App;
