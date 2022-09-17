import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './style.css'
import Weather from './Weather'



const Temp = () => {

const [searchvalue, setValue] = useState("mumbai")
const [tempInfo, setTempInfo] = useState({});

const  getWeatherinfo = async () => {

  try{

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=cef1e23dc61e10f451c816506b7fb114`;
 
    const res = await fetch(url);
    const data = await res.json();
    
    const { temp, humidity, pressure } = data.main;
    const { main: weathermood } = data.weather[0];
    const { name } = data;
    const { speed } = data.wind;
    const { country, sunset } = data.sys;

    const myNewWeatherInfo = {
      temp,
      humidity,
      pressure,
      weathermood,
      name,
      speed,
      country,
      sunset,
    };

    setTempInfo(myNewWeatherInfo);

  }catch(error){
    console.log(error)
  }


}


useEffect(()=>{
  getWeatherinfo();

},[]);


  return (
    <>
    <div className='wrap'>
      <div className='search'>

        <input type="search" placeholder='Search.......' autoFocus id="search"  className='searchTerm' value={searchvalue} onChange={(e)=>setValue(e.target.value)}/>
        
       <button className='searchButton' type='button'  onClick={getWeatherinfo}>Search</button>
     </div>  
      
    </div>
    
    <Weather tempInfo={tempInfo}/>


</>
  )
}




export default Temp
