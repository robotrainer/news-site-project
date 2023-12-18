import {createHeader} from "./header.js";
import {createPostsList} from "./posts-list.js";

import {sortPosts} from "./common.js";

import {data} from "../../../mock/data.js";
import {state} from "../../state/index.js";

export const Main = () => {
  const wrapper = document.createDocumentFragment();

  const posts = sortPosts(data, state.sortType);
  const postsList = createPostsList(posts);
  const main = document.createElement("main");
  main.append(postsList);

  const header = createHeader(postsList);

  wrapper.append(header, main);

  return wrapper;
}