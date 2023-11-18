import "./index.scss";

import {data} from "./mock/data.js";

const postList = document.querySelector(".posts-list");
const searchInput = document.querySelector(".posts-search");
const postsSort = document.querySelector(".posts-sort");

const state = {
  searchStr: "",
  sortType: "new",
}

searchInput.addEventListener("input", (event) => {
  state.searchStr = event.target.value;
  const searchedSortedPosts = searchAndSort(data);
  renderPostsList(searchedSortedPosts);
});

postsSort.addEventListener("change", (event) => {
  const inputElem = event.target;
  const activElem = postsSort.querySelector(".posts-sort__radio-active");

  activElem.classList.remove("posts-sort__radio-active");
  inputElem.parentElement.classList.add("posts-sort__radio-active");

  state.sortType = inputElem.value;

  const searchedSortedPosts = searchAndSort(data);
  renderPostsList(searchedSortedPosts);
});

init();

function init() {
  renderPostsList(sortPosts(data, state.sortType));
}

function renderPostsList(posts) {
  while(postList.firstChild) {
    postList.removeChild(postList.firstChild);
  }

  posts.forEach((post) => {
    const postTPL = createPostTPL(post);
    postList.insertAdjacentHTML("beforeend", postTPL);
  });
}

function createPostTPL(post) {
  const reactions = post.reactions.reduce((prev, curr) => prev + curr.count, 0);

  const src = post.company?.photo.original || post.user?.photo.original;
  const alt = post.company?.photo.alt || post.user?.photo.alt;
  const name = post.company?.title || post.user?.name;

  const postTPL = `
    <article class="post-card">
      <div class="post-card__header">
        <div class="post-card__avatar">
          <img src="${src}" alt="${alt}">
        </div>
        <span class="post-card__author">${name}</span>
        <span class="post-card__time">${post.publishDate}</span>
      </div>
  
      <div class="post-card__content">
        <h2 class="post-card__title">${post.title}</h2>
        <p class="post-card__text">${post.excerpt}</p>
        ${
          post.thumbnail
            ? `<div class="post-card__thumbnail">
              <img src="${post.thumbnail.original}" alt="${post.thumbnail.alt}">
              </div>`
            : ""
        }
      </div>
  
      <div class="post-card__footer">
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
  const searchedData = searchStr ? posts.filter((elem) => regSearch.test(elem.title)) : data;
  return searchedData;
}

function searchAndSort(posts) {
  const searchedPosts = searchPosts(posts, state.searchStr);
  const sortedPosts = sortPosts(searchedPosts, state.sortType);
  return sortedPosts;
}
