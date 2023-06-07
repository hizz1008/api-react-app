import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login({ loggedIn, setLoggedIn }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("auth/signin", {
        userId: id,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setLoggedIn(true);
      navigate("/mypage");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("가입하지 않았거나, 아이디와 비밀번호가 잘못되었습니다.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    navigate("/");
    return;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <div>{errorMsg}</div>}
        <input
          onChange={(e) => handleChange(e, setId)}
          value={id}
          placeholder="ID"
          type="text"
        />
        <input
          onChange={(e) => handleChange(e, setPassword)}
          value={password}
          placeholder="password"
          type="text"
        />
        <button type="submit">Login</button>

        <Link to="/signup">회원가입 하기</Link>
      </form>
    </div>
  );
}

export default Login;
