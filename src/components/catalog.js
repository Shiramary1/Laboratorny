export class Catalog {
  #el = null;
  #paginationEl = null;
  #itemsEl = null;
  #stateEl = null;
  #pageLabelEl = null;
  #reloadButtonEl = null;
  #page = null;
  #total = null;
  #renderItem = null;
  #getItems = null;
  #getErrorMessage = null;

  constructor(el, options) {
    const { renderItem, getItems, getErrorMessage } = options;

    this.#el = el;
    this.#page = this.getPage();
    this.#paginationEl = el.querySelector("[data-catalog-pagination]");
    this.#itemsEl = el.querySelector("[data-catalog-items]");
    this.#stateEl = el.querySelector("[data-catalog-state]");
    this.#pageLabelEl = el.querySelector("[data-catalog-page-label]");
    this.#reloadButtonEl = el.querySelector("[data-catalog-reload]");
    this.#renderItem = renderItem;
    this.#getItems = getItems;
    this.#getErrorMessage = getErrorMessage;
  }

  get limit() {
    return 12;
  }

  get pageCount() {
    return Math.max(1, Math.ceil(this.#total / this.limit));
  }

  init() {
    window.addEventListener("popstate", () => {
      const page = this.getPage();

      if (page !== this.#page) {
        this.setPage(page);
        this.loadItems();
      }
    });

    this.#paginationEl.addEventListener("click", (event) => {
      const item = event.target.closest("[data-catalog-pagination-page]");

      if (!item) {
        return;
      }

      const page = Number(item.dataset.catalogPaginationPage);
      this.setPage(page);
      this.pushState();
      this.loadItems();
    });

    this.#reloadButtonEl.addEventListener("click", () => {
      this.loadItems();
    });

    this.loadItems();
  }

  getPage() {
    const url = new URL(window.location.href);
    const page = Number(url.searchParams.get("page"));

    return page || 1;
  }

  setPage(page) {
    this.#page = page;
    this.#pageLabelEl.textContent = String(page);
  }

  pushState() {
    const url = new URL(window.location.href);
    url.searchParams.set("page", this.#page);

    window.history.pushState({}, "", url);
  }

  setState(message, mode = "info") {
    this.#stateEl.textContent = message;
    this.#stateEl.className = `catalog__state catalog__state_${mode}`;
    this.#stateEl.hidden = false;
  }

  hideState() {
    this.#stateEl.hidden = true;
  }

  async loadItems() {
    this.#itemsEl.innerHTML = "";
    this.setState("Загружаем посты...", "info");

    try {
      const { items, total } = await this.#getItems({
        limit: this.limit,
        page: this.#page,
      });

      this.#total = total;
      this.renderItems(items);
      this.renderPagination();

      if (!items.length) {
        this.setState("Посты не найдены.", "warning");
        return;
      }

      this.hideState();
    } catch (error) {
      this.setState(this.#getErrorMessage(error), "error");
      this.#paginationEl.innerHTML = "";
    }
  }

  renderItems(items) {
    this.#itemsEl.innerHTML = items.map(this.#renderItem).join("");
  }

  renderPagination() {
    let html = "";

    for (let index = 0; index < this.pageCount; index += 1) {
      const page = index + 1;
      const classes = ["catalog__pagination-item"];

      if (page === this.#page) {
        classes.push("catalog__pagination-item_active");
      }

      html += `
        <button
          class="${classes.join(" ")}"
          data-catalog-pagination-page="${page}"
          type="button"
        >
          ${page}
        </button>
      `;
    }

    this.#paginationEl.innerHTML = html;
  }
}
