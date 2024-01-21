export function sortPosts(posts, type) {
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

export function searchPosts(posts, searchStr) {
  const regSearch = new RegExp(searchStr, "i");
  const searchedData = searchStr
    ? posts.filter((elem) => regSearch.test(elem.title))
    : posts;
  return searchedData;
}

export function searchAndSort({ posts, sortType, searchStr }) {
  const searchedPosts = searchPosts(posts, searchStr);
  const sortedPosts = sortPosts(searchedPosts, sortType);
  return sortedPosts;
}
