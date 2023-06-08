import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, PATH_NAME } from "../util/constants";
import token from "../util/token";

const PRIVATE_ROUTES = [PATH_NAME.MYPAGE, PATH_NAME.MEMBER];

const PUBLIC_ROUTES = [PATH_NAME.HOME, PATH_NAME.LOGIN, PATH_NAME.SIGN_UP];

const Auth = () => {
  const { pathname } = useLocation(); // 현재 엔드포인트를 가져오는 함수
  const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const accessToken = token.get(ACCESS_TOKEN);

  if (isPrivateRoute) {
    if (!accessToken) {
      return <Navigate to={PATH_NAME.SIGN_UP} />;
    }
    return <Outlet />;
  }

  if (isPublicRoute) {
    if (accessToken) {
      return <Navigate to={PATH_NAME.MYPAGE} />;
    }
    return <Outlet />;
  }
  return <div>페이지를 찾을 수 없습니다.</div>;
};

export default Auth;
