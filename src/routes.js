/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import { SassColor } from "sass";
import Admin from "layouts/Admin";
import Admin_post from "views/examples/Admin_post.js"; 
import AdminModel from "views/examples/Admin_model";
// 사이드바 생성

var routes = [
  {
    path: "/index",
    name: "홈 화면",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "실시간 분석",
    icon: "ni ni-button-play text-red",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "분석 다시보기",
    icon: "ni ni-camera-compact text-purple",
    component: <Maps />,
    layout: "/admin",
  },
  { 
    path: "/tables/",
    name: "공지사항",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "로그아웃",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  { 
    path: "/user-profile",
    name: "회원관리",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },

  // { 
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
  {
    path: "/admin-post",
    name: "공지사항 작성",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Admin_post/>,
    layout: "/admin",
  },
  {
    path: "/admin/model-update",
    name: "모델 업데이트",
    icon: "ni ni-cloud-upload-96 text-blue",
    component:< AdminModel />,
    layout: "/admin",
  }
];

export default routes;
