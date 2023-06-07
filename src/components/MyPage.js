import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          navigate("/");
          return;
        }
        const response = await api.get("auth/user", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        const userData = response.data;
        setUserInfo(userData);
      } catch {
        console.log("유저 정보를 불러오는 데 실패했습니다");
      }
    };

    getUserInfo();
  }, [navigate]);

  if (!userInfo) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <div>
        <h1>{userInfo.nickname}</h1>
        <img src={userInfo.profileImgUrl} alt="Profile" />
        <br></br>
        <Link to="/member">내 정보 수정</Link>
      </div>
    </div>
  );
}

export default MyPage;
