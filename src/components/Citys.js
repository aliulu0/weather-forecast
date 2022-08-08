import { useWeather } from "../context/WeatherContext";
function Citys() {
  const { city, setCity, JsonCity, setIsDark, isDark } = useWeather();
  const HandleChain = (e) => {
    JsonCity.filter((ct) => ct.name === e.target.value && setCity(ct));
  };
  return (
    <div className="select-box">
      <select name="city" id="city" value={city.name} onChange={HandleChain}>
        {JsonCity.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Citys;
