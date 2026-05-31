const toPage = (page) => {
  window.location.href = new URL(`./${page}`, window.location.href).href;
};

const location = {
  index: () => toPage("index.html"),
  login: () => toPage("login.html"),
  reg: () => toPage("reg.html"),
  user: () => toPage("user.html"),
  todos: () => toPage("todos.html"),
};

export default location;
