const postsList = document.querySelector(".posts-list");

export function renderPostsList(posts) {
  while (postsList.firstChild) {
    postsList.removeChild(postsList.firstChild);
  }

  posts.forEach((post) => {
    renderPost(post, "beforeend");
  });
}

export function renderPost(post, position) {
  const postTPL = createPostTPL(post);
  postsList.insertAdjacentHTML(position, postTPL);
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