import "./index.scss";

import router from "./js/submodules/spa-router/index.js";

import { Main } from "./js/pages/main/index.js";
// import { Post } from "./js/pages/post/index.js";
import {Login} from "./js/pages/auth/login/index.js";

const ROOT = document.querySelector("#root");

const routes = [
  { path: "/", view: Main },
  { path: "/log-in", view: Login },
];

init();

function init() {
  router.initRouter({ target: ROOT, routes: routes });
}
