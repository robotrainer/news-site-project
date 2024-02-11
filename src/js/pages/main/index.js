import { postsList } from "./posts-list.js";
import { header } from "./header.js";

import { sortPosts } from "./common.js";

import { state } from "../../state/index.js";
import AbstractPage from "../abstractPage/index.js";

class Main extends AbstractPage {
  constructor() {
    super();
  }

  async #getPosts() {
    try {
      const response = await fetch(`http://localhost:3001/posts`);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const posts = await response.json();
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  async createPage() {
    this.setTitle("Main");

    const wrapper = document.createDocumentFragment();

    const headerElem = document.createElement("header");
    header.mountHeader(headerElem);

    const postsListElem = document.createElement("div");
    postsListElem.classList.add("posts-list");

    postsList.setTarget(postsListElem);

    const postsData = await this.#getPosts();
    state.posts = postsData || [];

    const posts = sortPosts(state.posts, state.sortType);

    postsList.renderPostsList(posts);

    const mainElem = document.createElement("main");
    mainElem.append(postsListElem);

    wrapper.append(headerElem, mainElem);

    return wrapper;
  }
}

export default Main;
