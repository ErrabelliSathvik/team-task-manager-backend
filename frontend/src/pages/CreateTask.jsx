import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function CreateTask() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");

  const [error, setError] = useState("");






  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          title,
          description,
          priority,
          assignedTo: user._id,
          projectId: "69fd8b959c26ddaff24d1b19",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/tasks");

    } catch (error) {

      console.log(error);

      setError("Failed to create task");

    }

  };









  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-8">

          <h1 className="text-3xl font-bold mb-6">
            Create Task
          </h1>










          {error && (

            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">

              {error}

            </div>

          )}









          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >

            <div>

              <label className="block mb-2 font-medium">
                Task Title
              </label>

              <input
                type="text"
                placeholder="Enter task title"
                className="w-full border p-3 rounded-lg"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>










            <div>

              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                placeholder="Enter task description"
                className="w-full border p-3 rounded-lg"
                rows="4"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </div>










            <div>

              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                className="w-full border p-3 rounded-lg"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>










            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Create Task
            </button>

          </form>

        </div>

      </div>

    </>

  );

}

export default CreateTask;