import axios from "axios";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoCard from "./InfoCard";

function WeatherApp() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const inputRef = useRef();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=131b4104735a8c63087ae410f72a3648`;

    const searchLocation = () => {
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.weather[0].icon);
                setData(response.data);
                setLocation('');
                inputRef.current.focus();
            })
            .catch(() => {
                toast.error("Please enter valid location");
            })
    }

    function getWeatherIconUrl(weatherCode) {
        const iconMap = {
            "01d": "../../img/01d.png",
            "02d": "../../img/02d.png",
            "03d": "../../img/03d.png",
            "04d": "../../img/04d.png",
            "09d": "../../img/09d.png",
            "10d": "../../img/10d.png",
            "11d": "../../img/11d.png",
            "13d": "../../img/13d.png",
            "50d": "../../img/50d.png",
        }

        return iconMap[weatherCode] || "";
    }

    return (<>
        <div className="bg-weatherBg h-screen pt-10 font-maven">
            <h1 className="text-[40px] font-bold text-white text-center">React Weather App</h1>
            <div className="flex w-[300px] rounded-lg mx-auto m-4">
                <input
                    type="text"
                    placeholder="Enter city name here......"
                    className="h-9 w-[260px] outline-none rounded-tl-lg rounded-bl-lg ps-3"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    ref={inputRef}
                />
                <button
                    className="flex items-center justify-center border-2 w-10 rounded-ee-lg rounded-tr-lg text-white border-none bg-indigo-700"
                    onClick={() => searchLocation()}
                ><FaSearch /></button>
            </div>

            {data.name && (
                <div className="border-box grid content-center w-[600px] mx-auto p-5 rounded-lg h-auto bg-slate-800 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 ">
                    <h1 className="text-white m-1 text-[40px] text-center">{data.name}</h1>
                    {data.main && <h4 className="text-white flex items-center gap-1 text-[30px] mx-auto"> {data.main.temp} <TbTemperatureCelsius className="text-[35px]" /> </h4>}
                    <div className="flex justify-center m-[-30px]">
                        {data.weather && <img
                            src={getWeatherIconUrl(data.weather[0].icon)}
                            alt={data.weather[0].icon}
                            className="h-[150px] "
                        />}
                    </div>
                    <div className="text-center text-white">
                        {data.weather && <h2>{data.weather[0].main}</h2>}
                        {data.weather && <h3>{data.weather[0].description}</h3>}
                    </div>

                    <div className="border-box flex flex-row flex-wrap gap-3 h-auto p-5">
                        {data.wind && <InfoCard title={"WIND"} value={data.wind.speed} text={"km/h"} />}
                        {data.visibility && <InfoCard title={"VISIBILITY"} value={Math.floor(data.visibility / 1000)} text={"km"} />}
                        {data.main && <InfoCard title={"HUMIIDITY"} value={data.main.humidity} text={"%"} />}
                        {data.main && <InfoCard title={"PRESSURE"} value={data.main.pressure} text={"mb"} />}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div >
    </>);
}

export default WeatherApp;