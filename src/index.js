import "./index.scss";

import router from "./js/submodules/spa-router/index.js";

import { state } from "./js/state/index.js";

import { Main } from "./js/pages/main/index.js";
// import { Post } from "./js/pages/post/index.js";
import { Login } from "./js/pages/auth/login/index.js";
import { Signup } from "./js/pages/auth/signup/index.js";

const ROOT = document.querySelector("#root");

const token = localStorage.getItem("token");

const routes =
  token && (await getUser(token))
    ? [{ path: "/", view: Main }]
    : [
        { path: "/log-in", view: Login },
        { path: "/sign-up", view: Signup },
        { path: "/*", view: Login },
      ];

init();

function init() {
  router.initRouter({ target: ROOT, routes: routes });
}

async function getUser(token) {
  try {
    const response = await fetch(`http://localhost:3001/users?token=${token}`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const user = await response.json();

    if (user.length) {
      state.user = { ...user[0], password: undefined };
    }

    return user.length ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
