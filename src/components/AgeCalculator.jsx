import { useState, useEffect } from 'react';
function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  // تحميل تاريخ الميلاد من LocalStorage
  useEffect(() => {
    const savedBirth = localStorage.getItem('birthDate');
    if (savedBirth) {
      setBirthDate(savedBirth);
      calculateAge(savedBirth);
    }
  }, []);

  const calculateAge = (date = birthDate) => {
    if (!date) return;

    const today = new Date();
    const birth = new Date(date);
    let ageNow = today.getFullYear() - birth.getFullYear();

    // تعديل لو لسه مكمّلش سنة في الشهر/اليوم
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      ageNow--;
    }

    setAge(ageNow);
    localStorage.setItem('birthDate', date);
  };

  return (
    <div className="tool">
      <h3>حاسبة العمر</h3>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => {
          setBirthDate(e.target.value);
          calculateAge(e.target.value);
        }}
      />
      {age !== null && <p>عمرك: {age} سنة</p>}
    </div>
  );
}

export default AgeCalculator;
