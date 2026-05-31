import { postsApi } from "../src/shared/api.js";

const postId = postsApi.getPostIdFromUrl();

const postState = document.querySelector("[data-post-state]");
const postContent = document.querySelector("[data-post-content]");
const postIdLabel = document.querySelector("[data-post-id]");
const postTitle = document.querySelector("[data-post-title]");
const postBody = document.querySelector("[data-post-body]");

const commentsState = document.querySelector("[data-comments-state]");
const commentsList = document.querySelector("[data-comments-list]");
const reloadCommentsButton = document.querySelector("[data-comments-reload]");

function setState(element, message, mode = "info") {
  element.textContent = message;
  element.className = `detail__state detail__state_${mode}`;
  element.hidden = false;
}

function hideState(element) {
  element.hidden = true;
}

function renderComments(comments) {
  commentsList.innerHTML = comments
    .map(
      (comment) => `
        <article class="comment-item">
            <div class="comment-item__head">
                <strong>${comment.name}</strong>
                <span>${comment.email}</span>
            </div>
            <p>${comment.body}</p>
        </article>
      `
    )
    .join("");
}

async function loadPost() {
  if (!postId) {
    setState(postState, "Некорректный id поста.", "error");
    return;
  }

  setState(postState, "Загружаем пост...", "info");
  postContent.hidden = true;

  try {
    const post = await postsApi.getPostById(postId);
    postIdLabel.textContent = `Пост #${post.id}`;
    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postContent.hidden = false;
    hideState(postState);
  } catch (error) {
    setState(postState, postsApi.formatError(error), "error");
  }
}

async function loadComments() {
  if (!postId) {
    setState(commentsState, "Нельзя загрузить комментарии без id поста.", "error");
    return;
  }

  commentsList.innerHTML = "";
  setState(commentsState, "Загружаем комментарии...", "info");

  try {
    const comments = await postsApi.getCommentsByPostId(postId);

    if (!comments.length) {
      setState(commentsState, "Комментарии не найдены.", "warning");
      return;
    }

    renderComments(comments);
    hideState(commentsState);
  } catch (error) {
    setState(commentsState, postsApi.formatError(error), "error");
  }
}

reloadCommentsButton.addEventListener("click", () => {
  loadComments();
});

await loadPost();
await loadComments();
