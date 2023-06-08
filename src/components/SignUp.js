import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PATH_NAME } from "../util/constants";
import api from "../api/axios";

function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      const response = await api.post("/auth/signup", {
        userId,
        nickname,
        password,
      });
      console.log("회원가입 성공:", response.data);
      navigate(PATH_NAME.LOGIN);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("동일한 userId가 존재합니다.");
      }
    }
  };

  return (
    <div>
      <h1>Sing UP</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <div>{errorMsg}</div> && (
          <div>
            <span>userId: 3~10 글자, 영어 또는 숫자만 가능</span>
            <span>nickname: 3~10 글자, 영어, 숫자, 한글만 가능</span>
            <span>password: 3~10 글자</span>
          </div>
        )}
        <input
          onChange={(e) => handleChange(e, setUserId)}
          value={userId}
          placeholder="ID"
          type="text"
        />
        <input
          onChange={(e) => handleChange(e, setPassword)}
          value={password}
          placeholder="password"
          type="text"
        />
        <input
          onChange={(e) => handleChange(e, setNickName)}
          value={nickname}
          placeholder="nickname"
          type="text"
        />
        <button type="submit">Sing Up</button>
        <Link to={PATH_NAME.LOGIN}>로그인 하기</Link>
      </form>
    </div>
  );
}
export default SignUp;
