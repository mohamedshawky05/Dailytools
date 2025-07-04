import { useState, useEffect } from 'react';

function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState(null);

  // تحميل آخر درجة حرارة محفوظة
  useEffect(() => {
    const savedC = localStorage.getItem('lastCelsius');
    const savedF = localStorage.getItem('lastFahrenheit');
    if (savedC) setCelsius(savedC);
    if (savedF) setFahrenheit(savedF);
  }, []);

  const convertToF = () => {
    const f = (parseFloat(celsius) * 9) / 5 + 32;
    setFahrenheit(f.toFixed(2));
    localStorage.setItem('lastCelsius', celsius);
    localStorage.setItem('lastFahrenheit', f.toFixed(2));
  };

  return (
    <div className="tool">
      <h3>تحويل درجة الحرارة</h3>
      <input
        type="number"
        value={celsius}
        placeholder="درجة الحرارة بالـ°C"
        onChange={(e) => setCelsius(e.target.value)}
      />
      <button onClick={convertToF}>تحويل إلى فهرنهايت</button>
      {fahrenheit && <p>{fahrenheit} °F</p>}
    </div>
  );
}

export default TemperatureConverter;
