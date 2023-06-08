import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../util/constants";

function Home() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(accessToken);
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {accessToken ? (
        <div>
          <button onClick={handleLogout}>로그아웃</button>
          <Link to="/mypage">
            <button>내 정보</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
