import api from "./api.js";

const todosService = {
  async getAll() {
    const response = await api("/todo");
    return response.data || [];
  },

  async create(description) {
    return api("/todo", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
  },

  async update(todoId, completed) {
    return api(`/todo/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
    });
  },

  async delete(todoId) {
    return api(`/todo/${todoId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  },
};

export default todosService;
