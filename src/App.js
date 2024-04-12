import './App.css';
import { Route, Routes } from "react-router-dom";
import CitiesTable from './components/CitiesTablePage';
import Weather from './components/WeatherPage';
import MyComponent from './components/googleMap'
function App() {
  return (
    <div className='App'> 
    <Routes>  
          <Route path="/"  element={<CitiesTable/>} />
          <Route path="/weather/:cityName/:lat/:lon" element={<Weather/>} />
          <Route path='/map/:lat/:lon' element={<MyComponent/>} />
    </Routes>
    </div>
  );
}

export default App;
