import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from "./components/About";
import Footer from "./components/Footer";
import AddTask from "./components/AddTask";
function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`);
    const data = await res.json();

    return data;
  };
  // Add task
  const addTask = async (task) => {
    console.log("addTask");
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    console.log([...tasks, data]);
    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
  };
  const setOnClickShow = () => {
    console.log("showAddTask");
    setShowAddTask(!showAddTask);
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  
  return (
    <Router>
      <div className="container">
        <Header showAddTask={showAddTask} onClickShow={setOnClickShow} />
        {showAddTask && <AddTask onAdd={addTask} />}
        <Route
          path="/"
          exact
          render={() => (
            <>
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  toggleReminder={toggleReminder}
                />
              ) : (
                "No Tasks To Show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
