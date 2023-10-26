import { useContext, useState } from "react";
import "../Styles/login.css";
import { AuthContext } from "../context/authContext";
import Spinner from "./Spinner";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    //Fetch from our API
    const response = await fetch(
      "https://meal-planner-backend-57g4.onrender.com/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      login(data.token);
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
          <form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>username:</label>
            <input
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            ></input>

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
          <button className="go-back">Back Homepage</button>
          {/* ADD FOOTER */}
        </>
      )}
    </>
  );
}
