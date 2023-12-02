import "./index.scss";

import { data } from "./mock/data.js";

const postList = document.querySelector(".posts-list");
const searchInput = document.querySelector(".posts-search");
const postsSort = document.querySelector(".posts-sort");
const form = document.querySelector(".form");

const state = {
  searchStr: "",
  sortType: "new",

  user: {
    id: 1,
    wp: 1,
    name: "Alexander Busygin",
    photo: {
      original: "	https://media.tproger.ru/user-uploads/78336/avatar.png",
      alt: "Аватарка пользователя Alexander Busygin",
    },
  },
};

searchInput.addEventListener("input", (event) => {
  state.searchStr = event.target.value;
  const searchedSortedPosts = searchAndSort(data);
  renderPostsList(searchedSortedPosts);
});

postsSort.addEventListener("change", (event) => {
  const inputElem = event.target;
  const activElem = postsSort.querySelector(".active");

  activElem.classList.remove("active");
  inputElem.parentElement.classList.add("active");

  state.sortType = inputElem.value;

  const searchedSortedPosts = searchAndSort(data);
  renderPostsList(searchedSortedPosts);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get("title");
  const text = formData.get("text");
  const urlThumbnail = formData.get("thumbnail");

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

  sendPost.id = nowMS;
  sendPost.title = title;
  sendPost.authorId = state.user.wp;
  sendPost.excerpt = text;
  sendPost.user = state.user;
  sendPost.publishDate = nowMS;
  sendPost.thumbnail = {
    original: urlThumbnail,
    alt: `Обложка поста ${title}`,
  };

  data.push(sendPost);

  renderPost(sendPost, "afterbegin");

  form.reset();
});

init();

function init() {
  renderPostsList(sortPosts(data, state.sortType));
}

function renderPostsList(posts) {
  while (postList.firstChild) {
    postList.removeChild(postList.firstChild);
  }

  posts.forEach((post) => {
    renderPost(post, "beforeend");
  });
}

function renderPost(post, position) {
  const postTPL = createPostTPL(post);
  postList.insertAdjacentHTML(position, postTPL);
}

function createPostTPL(post) {
  const reactions = post.reactions.reduce((prev, curr) => prev + curr.count, 0);

  const src = post.company?.photo.original || post.user?.photo.original;
  const alt = post.company?.photo.alt || post.user?.photo.alt;
  const name = post.company?.title || post.user?.name;

  const postTPL = `
    <article class="post-card">
      <div class="header">
        <div class="avatar">
          <img src="${src}" alt="${alt}">
        </div>
        <span class="author">${name}</span>
        <span class="time">${post.publishDate}</span>
      </div>
  
      <div class="content">
        <h2 class="title">${post.title}</h2>
        <p class="text">${post.excerpt}</p>
        ${
          post.thumbnail
            ? `<div class="thumbnail">
              <img src="${post.thumbnail.original}" alt="${post.thumbnail.alt}">
              </div>`
            : ""
        }
      </div>
  
      <div class="footer">
        <div>Реакции: ${reactions}</div>
        <div>Коммент: ${post.comments}</div>
        <div>В закладки: ${post.bookmarks.count}</div>
        <div>Просмотры: ${post.view}</div>
      </div>
    </article>`;

  return postTPL;
}

function sortPosts(posts, type) {
  let sortPosts;
  switch (type) {
    case "popular": {
      sortPosts = posts.toSorted((a, b) => b.view - a.view);
      break;
    }

    case "commented": {
      sortPosts = posts.toSorted((a, b) => b.comments - a.comments);
      break;
    }

    default: {
      sortPosts = posts.toSorted((a, b) => b.publishDate - a.publishDate);
      break;
    }
  }

  return sortPosts;
}

function searchPosts(posts, searchStr) {
  const regSearch = new RegExp(searchStr, "i");
  const searchedData = searchStr
    ? posts.filter((elem) => regSearch.test(elem.title))
    : data;
  return searchedData;
}

function searchAndSort(posts) {
  const searchedPosts = searchPosts(posts, state.searchStr);
  const sortedPosts = sortPosts(searchedPosts, state.sortType);
  return sortedPosts;
}
