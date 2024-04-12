import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './style.css';
import sunset from '../assets/sunset.gif';
import sunrise from '../assets/sunrise.gif';
import hot from '../assets/hot.gif';
import cold from '../assets/cold.gif';
import cloudy from '../assets/cloudy.gif';
import humidity from '../assets/humidity.png';
import pressure from '../assets/pressure.png';
import wind from '../assets/wind.gif';
import axios from 'axios';
import moment from 'moment';
import { BounceLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';


import snow from '../assets/Background/snow.gif'
import clear from '../assets/Background/clear.gif'
import rain from '../assets/Background/rain.gif'
import clouds from '../assets/Background/clouds.gif'
import mist from '../assets/Background/mist.gif'
import drizle from '../assets/Background/drizle.jpg'
import thunderstorm from '../assets/Background/thunderstorm.gif'
const backgrounds = {
  Clear: clear,
  Clouds: clouds,
  Drizzle: drizle,
  Rain: rain,
  Thunderstorm: thunderstorm,
  Snow: snow,
  Mist: mist,
};

function Card() {
  const [show, setShow] = useState(false);
  const { cityName, lat, lon } = useParams();
  const [data, setData] = useState('');

  useEffect(() => {
    getData(cityName);
  }, [cityName]);

  const getData = (cityName) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=d8596b1261b43be39522177d29112a96`
      )
      .then((response) => {
        setData({
          desc: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
          city: response.data.name,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
          windSpeed: response.data.wind.speed,
        });
      });
  };
  

  if (!data) {
    return (
      <div className="loader-container">
        <BounceLoader color="white" />
      </div>
    );
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgrounds[data.desc]})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div>
        <Header text='Weather App '  />
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="container">
          {/* <div className='video'>  
          <video  src={clouds} autoPlay loop muted></video></div> */}
        <div className="card" style={backgroundStyle}>
          <>
            <div className="city">
              <h2>
                <i className="fa-sharp fa-solid fa-location-dot"></i> {data.city} {data.country}
              </h2>
            </div>

            <div className="info">
             <h2 style={{ fontSize: '3rem' }}>{data.temp} °C</h2>
            </div>
            <div className="boxes">
              <div className="box">
                <h4>Max Temp</h4>
                <div className="border">
                  <img src={hot} className="img" alt="max_temp" />
                </div>
                <h3>{data.temp_max} °C</h3>
              </div>
              <div className="box">
                <h4>Min Temp</h4>
                <div className="border">
                  <img src={cold} className="img" alt="min_temp" />
                </div>
                <h3>{data.temp_min} °C</h3>
              </div>
              <div className="box">
                <h3>Wind Speed</h3>
                <div className="border">
                  <img src={wind} className="img" alt="sunrise" />
                </div>
                <h3>{data.windSpeed}</h3>
              </div>

              <div className="box">
                <h3>Feels Like</h3>
                <div className="border">
                  <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} className="icon-img" alt="" />
                </div>
                <h3>{data.desc}</h3>
              </div>
              <div className="box rise">
                <h3>Sunrise</h3>
                <div className="border">
                  <img src={sunrise} className="img" alt="sunrise" />
                </div>
                <h3>{moment(data.sunrise * 1000).format("hh:mm a")}</h3>
              </div>
              <div className="box">
                <h3>Sunset</h3>
                <div className="border">
                  <img src={sunset} className="img" alt="sunset" />
                </div>
                <h3>{moment(data.sunset * 1000).format("hh:mm a")}</h3>
              </div>
              <div className="box">
                <h3>Pressure</h3>
                <div className="border">
                  <img src={pressure} className="img" alt="pressure" />
                </div>
                <h3>{data.pressure}</h3>
              </div>
              <div className="box">
                <h3>Humidity</h3>
                <div className="border">
                  <img src={humidity} className="img" alt="humidity" />
                </div>
                <h3>{data.humidity}</h3>
              </div>
            </div>
            <NavLink to={`/map/${lat}/${lon}`} style={{ color: 'red' }}>
              Click here to see Map View of City
            </NavLink>
          </>
        </div>
      </div>
      <Footer/>
    </div>

  );
}

export default Card;