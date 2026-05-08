import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="bg-black text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Team Task Manager
      </h1>

      <div className="flex gap-4">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

        <button onClick={logoutHandler}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;