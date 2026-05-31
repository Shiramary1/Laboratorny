import { Catalog } from "./src/components/catalog.js";
import { postsApi } from "./src/shared/api.js";

const renderPostItem = (item) => `
    <a href="./posts/?id=${item.id}" class="post-item">
        <span class="post-item__id">Пост #${item.id}</span>
        <span class="post-item__title">${item.title}</span>
        <span class="post-item__body">${item.body}</span>
        <span class="post-item__action">Открыть подробнее</span>
    </a>
`;

const getPostItems = async ({ limit, page }) => {
  return postsApi.getPostsPage(page, limit);
};

const init = () => {
  const catalogElement = document.getElementById("catalog");

  new Catalog(catalogElement, {
    renderItem: renderPostItem,
    getItems: getPostItems,
    getErrorMessage: postsApi.formatError,
  }).init();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
