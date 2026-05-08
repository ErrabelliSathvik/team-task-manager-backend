import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchTasks();

  }, []);




  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;




  return (

    <>

      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Manage your team tasks efficiently
            </p>

          </div>

          <Link
            to="/create-task"
            className="bg-black text-white px-5 py-3 rounded-lg"
          >
            Create Task
          </Link>

        </div>




        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white shadow-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalTasks}
            </p>

          </div>



          <div className="bg-white shadow-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold">
              Completed Tasks
            </h2>

            <p className="text-4xl font-bold mt-4">
              {completedTasks}
            </p>

          </div>




          <div className="bg-white shadow-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold">
              Pending Tasks
            </h2>

            <p className="text-4xl font-bold mt-4">
              {pendingTasks}
            </p>

          </div>

        </div>





        <div className="mt-10 bg-white shadow-md rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Recent Tasks
          </h2>

          <div className="space-y-4">

            {tasks.slice(0, 5).map((task) => (

              <div
                key={task._id}
                className="border rounded-xl p-4"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold text-lg">
                    {task.title}
                  </h3>

                  <span className="text-sm">
                    {task.status}
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  {task.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>

  );

}

export default Dashboard;