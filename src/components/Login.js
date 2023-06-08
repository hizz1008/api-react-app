import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, PATH_NAME } from "../util/constants";
import api from "../api/axios";

function Login() {
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
      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);

      navigate(PATH_NAME.MYPAGE);
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
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  useEffect(() => {
    if (accessToken) {
      navigate(PATH_NAME.HOME);
      return;
    }
  }, [accessToken, navigate]);

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

        <Link to={PATH_NAME.SIGN_IN}>회원가입 하기</Link>
      </form>
    </div>
  );
}
export default Login;
