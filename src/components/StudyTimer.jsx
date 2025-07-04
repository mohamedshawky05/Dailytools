import { useState, useEffect } from 'react';

function StudyTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // تحميل الوقت المحفوظ
  useEffect(() => {
    const savedMinutes = localStorage.getItem('studyMinutes');
    const savedSeconds = localStorage.getItem('studySeconds');
    if (savedMinutes !== null) setMinutes(parseInt(savedMinutes));
    if (savedSeconds !== null) setSeconds(parseInt(savedSeconds));
  }, []);

  // حفظ الوقت في كل تحديث
  useEffect(() => {
    localStorage.setItem('studyMinutes', minutes);
    localStorage.setItem('studySeconds', seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    let interval = null;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes((m) => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const start = () => setIsRunning(true);

  const reset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
    localStorage.removeItem('studyMinutes');
    localStorage.removeItem('studySeconds');
  };

  return (
    <div className="tool">
      <h3>مؤقت دراسي (25 دقيقة)</h3>
      <p>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <button onClick={start}>ابدأ</button>
      <button onClick={reset}>إعادة</button>
    </div>
  );
}

export default StudyTimer;
