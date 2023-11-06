import { useState, useContext } from "react";
import "../Styles/Login.css";
import { AuthContext } from "../context/authContext";
import Spinner from "./Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, setId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

   // const localAPI = "http://localhost:8080/user/login";

    //Fetch from our API
     const deployAPI = "https://meal-planner-backend-57g4.onrender.com/user/login";

    const response = await fetch(deployAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      setTimeout(() => {
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        login(data.token);
        setId(data.Id);
      }, 1000);
    }
  };

  return (
    <>
      {/* ADD LOGO */}
      {isLoading ? (
        <div id="cover-spin">
          <Spinner />
        </div>
      ) : (
        <>
          <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label>Password:</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button>Log in</button>

            {error && <div className="error">{error}</div>}
          </form>

          {/* ADD FOOTER */}
        </>
      )}
    </>
  );
}
