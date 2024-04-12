import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import {BounceLoader} from 'react-spinners'
import Header from './Header';
import Footer from './Footer';
const API_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}?limit=20&page=${page}`);
      const newCities = response.data.results;
      setCities(prevCities => [...prevCities, ...newCities]);
      setPage(prevPage => prevPage + 1);
      setHasMore(newCities.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight && hasMore) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore]);

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
  };

  useEffect(()=>{
   fetchDataSearch()
  },[searchTerm])

  const fetchDataSearch = async ()=>{
    try{
      setCities([]);
      const response = await axios.get(`${API_URL}?limit=20&page=${page}&q=${searchTerm}`);
      const newCities = response.data.results;
      console.log(response);
      if (page === 1) {
        setCities(newCities);
      } else {
        setCities(prevCities => [...prevCities, ...newCities]);
      }
      setPage(prevPage => prevPage + 1);
      setHasMore(newCities.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const filteredCities = cities.filter(city =>
    Object.values(city).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCities = sortedColumn ? filteredCities.sort((a, b) => {
    const compareA = typeof a[sortedColumn] === 'string' ? a[sortedColumn].toLowerCase() : a[sortedColumn];
    const compareB = typeof b[sortedColumn] === 'string' ? b[sortedColumn].toLowerCase() : b[sortedColumn];
    if (compareA < compareB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (compareA > compareB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  }) : filteredCities;

  return (
    <>  
    <Header text= 'List of all Cities Population > 1000' />
    <div className="cities-table">
     <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City Name</th>
            <th onClick={() => handleSort('cou_name_en')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
            <th onClick={() => handleSort('timezone')}>Co-Ordinates</th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map(city => (
            <tr key={city.geoname_id}>
              <td>
                <Link to={`/weather/${city.name}/${city.coordinates.lat}/${city.coordinates.lon}`} target="_blank" rel="noopener noreferrer">{city.name}</Link>
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
              <td>{city.coordinates.lat},{city.coordinates.lon}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && <div style={{ display:'flex' , justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <BounceLoader color="black" size={80} />
    </div>}
    </div>
    <Footer/>
    </>
  );
};

export default CitiesTable;
