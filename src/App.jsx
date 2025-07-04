import { Routes, Route, Link } from 'react-router-dom';
import AgeCalculator from './components/AgeCalculator';
import DailyTasks from './components/DailyTasks';
import TemperatureConverter from './components/TemperatureConverter';
import CountdownTimer from './components/CountdownTimer';
import StudyTimer from './components/StudyTimer';

function App() {
  return (
    <div className="App">
      <h1>🧰 أدوات يومية</h1>

      <nav>
        <Link to="/">الرئيسية</Link> |{' '}
        <Link to="/age">حساب العمر</Link> |{' '}
        <Link to="/tasks">المهام</Link> |{' '}
        <Link to="/temp">الحرارة</Link> |{' '}
        <Link to="/countdown">مؤقت تنازلي</Link> |{' '}
        <Link to="/study">مؤقت دراسي</Link>
      </nav>

      <Routes>
        <Route path="/" element={<p>اختر أداة من القائمة أعلاه</p>} />
        <Route path="/age" element={<AgeCalculator />} />
        <Route path="/tasks" element={<DailyTasks />} />
        <Route path="/temp" element={<TemperatureConverter />} />
        <Route path="/countdown" element={<CountdownTimer />} />
        <Route path="/study" element={<StudyTimer />} />
      </Routes>
    </div>
  );
}

export default App;
