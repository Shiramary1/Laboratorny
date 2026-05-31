export const postsApi = {
  async getPostsPage(page = 1, limit = 12) {
    const response = await this.request(`/posts?_page=${page}&_limit=${limit}`);
    const items = await response.json();
    const total = Number(response.headers.get("x-total-count")) || items.length;

    return { items, total };
  },

  async getPostById(id) {
    const response = await this.request(`/posts/${id}`);
    return response.json();
  },

  async getCommentsByPostId(id) {
    const response = await this.request(`/posts/${id}/comments`);
    return response.json();
  },

  getPostIdFromUrl() {
    const url = new URL(window.location.href);
    const id = Number(url.searchParams.get("id"));
    return id > 0 ? id : null;
  },

  formatError(error) {
    return error instanceof Error ? error.message : "Неизвестная ошибка";
  },

  async request(path) {
    const response = await fetch(`https://jsonplaceholder.typicode.com${path}`);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    return response;
  },
};
