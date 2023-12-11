import { data } from "../mock/data.js";

import { state } from "./state.js";

import { searchAndSort } from "./common.js";

import { renderPostsList, renderPost } from "./posts-list.js";

export function createHeader() {
  const headerWrapper = createHeaderWrapper();

  const header = document.createElement("header");
  header.appendChild(headerWrapper);

  initListener(header);

  return header;
}

function createHeaderWrapper() {
  const headerTPL = `<input class="posts-search" type="text">
  <div class="header-tools">
    <div class="posts-sort">
      <div class="radio active">
        <input type="radio" id="new" name="filter" value="new" checked />
        <label for="new">Новые</label>
      </div>

      <div class="radio">
        <input type="radio" id="popular" name="filter" value="popular" />
        <label for="popular">Популярные</label>
      </div>

      <div class="radio">
        <input type="radio" id="commented" name="filter" value="commented" />
        <label for="commented">Комментируемые</label>
      </div>
    </div>

    <button class="create-post-btn" type="button">Создать пост</button>
  </div>
  <form class="form hidden">
    <label class="label" for="title">
      <span class="label-text">Заголовок</span>
      <input class="input" type="text" name="title" id="title" />
    </label>

    <label class="label" for="text">
      <span class="label-text">Текст статьи</span>
      <textarea
        class="textarea"
        name="text"
        id="text"

        rows="20"
      ></textarea>
    </label>

    <label class="label" for="thumbnail">
      <span class="label-text">URL картинки</span>
      <input class="input" type="text" name="thumbnail" id="thumbnail" />
    </label>

    <input class="submit" type="submit" value="Создать пост" />
  </form>`;

  const headerWrapper = document.createElement("div");
  headerWrapper.classList.add("header-wrapper");

  headerWrapper.insertAdjacentHTML("afterbegin", headerTPL);

  return headerWrapper;
}

function initListener(header) {
  const searchInput = header.querySelector(".posts-search");
  const postsSort = header.querySelector(".posts-sort");
  const form = header.querySelector(".form");
  const showCreatePostFormBtn = header.querySelector(".create-post-btn");

  searchInput.addEventListener("input", search);

  postsSort.addEventListener("change", (event) => {
    sort(event, postsSort);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    createPost(form);
  });

  showCreatePostFormBtn.addEventListener("click", () => {
    toogleShowCreatePostForm(form);
  });
}

function search(event) {
  state.searchStr = event.target.value;
  const searchedSortedPosts = searchAndSort(data, state);
  renderPostsList(searchedSortedPosts);
}

function sort(event, postsSort) {
  const inputElem = event.target;
  const activElem = postsSort.querySelector(".active");

  activElem.classList.remove("active");
  inputElem.parentElement.classList.add("active");

  state.sortType = inputElem.value;

  const searchedSortedPosts = searchAndSort(data, state);
  renderPostsList(searchedSortedPosts);
}

function createPost(form) {
  const formData = new FormData(form);

  const title = formData.get("title");
  const text = formData.get("text");
  const urlThumbnail = formData.get("thumbnail");

  if (!title || !text) return;

  const sendPost = {
    id: null,
    title: "",
    status: "publish",
    authorId: null,
    excerpt: "",
    view: 0,
    bookmarks: {
      count: 0,
      added: false,
    },
    comments: 0,
    reactions: [
      {
        count: 0,
        key: "angry",
        order: 1,
        is_selected: false,
      },
      {
        count: 0,
        key: "surprised",
        order: 2,
        is_selected: false,
      },
      {
        count: 0,
        key: "thinking",
        order: 3,
        is_selected: false,
      },
      {
        count: 0,
        key: "laugh",
        order: 4,
        is_selected: false,
      },
      {
        count: 0,
        key: "like",
        order: 5,
        is_selected: false,
      },
    ],
    user: {},
    publishDate: null,
    thumbnail: {},
  };

  const nowMS = Math.ceil(Date.now() / 1000);

  const thumbnail = {
    original: urlThumbnail,
    alt: `Обложка поста ${title}`,
  }

  sendPost.id = nowMS;
  sendPost.title = title;
  sendPost.authorId = state.user.wp;
  sendPost.excerpt = text;
  sendPost.user = state.user;
  sendPost.publishDate = nowMS;
  sendPost.thumbnail = thumbnail.original ? thumbnail : null;

  data.push(sendPost);

  renderPost(sendPost, "afterbegin");

  form.reset();

  toogleShowCreatePostForm(form);
}

function toogleShowCreatePostForm(form) {
    form.classList.toggle("hidden");
}