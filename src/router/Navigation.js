import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import MyPage from "../components/MyPage";
import Member from "../components/Member";

import Auth from "./Auth";
import { PATH_NAME } from "../util/constants";

const router = createBrowserRouter([
  {
    path: "/",
    Element: <Auth />,
    Children: [
      {
        path: "/",
        Element: Home,
      },
      {
        path: PATH_NAME.LOGIN,
        Element: Login,
      },
      {
        path: PATH_NAME.SIGN_UP,
        Element: SignUp,
      },
      {
        path: PATH_NAME.MYPAGE,
        Element: MyPage,
      },
      {
        path: PATH_NAME.MEMBER,
        Element: Member,
      },
    ],
  },
]);

export default router;
