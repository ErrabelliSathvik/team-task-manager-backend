import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");






  const fetchTasks = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

      setError("");

    } catch (error) {

      console.log(error);

      setError("Failed to fetch tasks");

    } finally {

      setLoading(false);

    }

  };







  useEffect(() => {

    fetchTasks();

  }, []);








  const updateStatus = async (id, status) => {

    // Instant UI update
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id
          ? { ...task, status }
          : task
      )
    );

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {

      console.log(error);

    }

  };








  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.filter((task) => task._id !== id)
      );

    } catch (error) {

      console.log(error);

    }

  };









  return (

    <>

      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Tasks
        </h1>








        {loading && (

          <div className="bg-white p-6 rounded-2xl shadow-md">

            Loading tasks...

          </div>

        )}








        {error && (

          <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">

            {error}

          </div>

        )}









        <div className="grid gap-6">

          {!loading && tasks.length === 0 && (

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">

              <h2 className="text-2xl font-bold">
                No Tasks Yet
              </h2>

              <p className="text-gray-600 mt-2">
                Create your first task to get started.
              </p>

            </div>

          )}










          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white shadow-md rounded-2xl p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {task.description}
                  </p>

                </div>








                <span
                  className={`px-3 py-1 rounded-lg text-sm ${
                    task.priority === "High"
                      ? "bg-red-500 text-white"
                      : task.priority === "Medium"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {task.priority}
                </span>

              </div>









              <div className="mt-4 flex justify-between items-center">

                <p className="font-medium">
                  Status: {task.status}
                </p>








                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded-lg"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>










              <button
                onClick={() => deleteTask(task._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Task
              </button>

            </div>

          ))}

        </div>

      </div>

    </>

  );

}

export default Tasks;