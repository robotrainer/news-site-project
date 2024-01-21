import { createHeader } from "./header.js";
import { createPostsList } from "./posts-list.js";

import { sortPosts } from "./common.js";

import { state } from "../../state/index.js";

export const Main = async () => {
  const wrapper = document.createDocumentFragment();

  const postsData = await getPosts();
  state.posts = postsData;

  const posts = sortPosts(state.posts, state.sortType);
  const postsList = createPostsList(posts);
  const main = document.createElement("main");
  main.append(postsList);

  const header = createHeader(postsList);

  wrapper.append(header, main);

  return wrapper;
};

async function getPosts() {
  const response = await fetch(`http://localhost:3001/posts`);
  const posts = await response.json();
  return posts;
}
