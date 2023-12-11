import "./index.scss";

import { createHeader } from "./js/header.js";

import { renderPostsList } from "./js/posts-list.js";

import { sortPosts } from "./js/common.js";

import {state} from "./js/state.js"

import { data } from "./mock/data.js";

const ROOT = document.querySelector("#root");


init();

function init() {
  const header = createHeader();
  ROOT.insertAdjacentElement("afterbegin", header);

  renderPostsList(sortPosts(data, state.sortType));
}
