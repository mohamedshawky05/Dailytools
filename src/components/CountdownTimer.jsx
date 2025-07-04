import { useState, useEffect, useRef } from 'react';

function CountdownTimer() {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null); // مرجع للصوت

  // تحميل البيانات من LocalStorage
  useEffect(() => {
    const savedSeconds = localStorage.getItem('countdownSeconds');
    const savedActive = localStorage.getItem('countdownActive');

    if (savedSeconds) setSeconds(parseInt(savedSeconds));
    if (savedActive === 'true') setIsActive(true);
  }, []);

  // حفظ التغييرات
  useEffect(() => {
    localStorage.setItem('countdownSeconds', seconds);
    localStorage.setItem('countdownActive', isActive);
  }, [seconds, isActive]);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      // تشغيل الصوت
      if (audioRef.current) {
        audioRef.current.play();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const start = () => {
    if (seconds > 0) setIsActive(true);
  };

  const reset = () => {
    setSeconds(60);
    setIsActive(false);
    localStorage.removeItem('countdownSeconds');
    localStorage.removeItem('countdownActive');
  };

  const handleChange = (e) => {
    setSeconds(Number(e.target.value));
    setIsActive(false);
  };

  return (
    
    <div className="tool">
      <h3>⏳ مؤقت تنازلي مع صوت</h3>
      <input
        type="number"
        value={seconds}
        disabled={isActive}
        onChange={handleChange}
        placeholder="عدد الثواني"
      />
      <p>المتبقي: {seconds} ثانية</p>
      <button onClick={start} disabled={isActive || seconds <= 0}>ابدأ</button>
      <button onClick={reset}>إعادة</button>

      {/* عنصر الصوت */}
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
      
    </div>
  );
}

export default CountdownTimer;
