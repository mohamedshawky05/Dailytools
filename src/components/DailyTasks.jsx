import { useState, useEffect } from 'react';

function DailyTasks() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // تحميل المهام من localStorage عند بداية الصفحة
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // تحديث localStorage كل ما تتغير المهام
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="tool">
      <h3>المهام اليومية</h3>
      <input
        type="text"
        value={task}
        placeholder="اكتب مهمتك"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>أضف</button>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t} <button onClick={() => deleteTask(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyTasks;
