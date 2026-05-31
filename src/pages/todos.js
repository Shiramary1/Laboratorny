import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import todosService from "../services/todos.js";

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const todoSubmit = document.getElementById("todo-submit");
const todoState = document.getElementById("todo-state");

function setState(message, mode = "info") {
  todoState.textContent = message;
  todoState.className = `todo-state todo-state_${mode}`;
  todoState.hidden = false;
}

function hideState() {
  todoState.hidden = true;
}

function renderTodos(todos) {
  if (!todos.length) {
    todoList.innerHTML = "";
    setState("Пока нет задач. Добавьте первую.", "info");
    return;
  }

  hideState();

  todoList.innerHTML = todos
    .map(
      (todo) => `
        <li class="todo-item">
            <input
                class="todo-item__checkbox"
                type="checkbox"
                data-action="toggle"
                data-id="${todo.id}"
                ${todo.completed ? "checked" : ""}
            >
            <span class="todo-item__description ${todo.completed ? "todo-item__description_completed" : ""}">
                ${todo.description}
            </span>
            <div class="todo-item__actions">
                <button class="todo-item__button todo-item__button_delete" type="button" data-action="delete" data-id="${todo.id}">
                    Удалить
                </button>
            </div>
        </li>
      `
    )
    .join("");
}

async function refreshTodos() {
  loading.start();

  try {
    const todos = await todosService.getAll();
    renderTodos(todos);
  } catch (error) {
    setState(error.message || "Не удалось загрузить задачи.", "error");
  } finally {
    loading.stop();
  }
}

async function createTodo() {
  const description = todoInput.value.trim();

  if (!description) {
    setState("Введите описание задачи.", "error");
    return;
  }

  loading.start();

  try {
    await todosService.create(description);
    todoInput.value = "";
    await refreshTodos();
    setState("Задача успешно добавлена.", "success");
  } catch (error) {
    setState(error.message || "Не удалось добавить задачу.", "error");
  } finally {
    loading.stop();
  }
}

async function toggleTodo(todoId, completed) {
  loading.start();

  try {
    await todosService.update(todoId, completed);
    await refreshTodos();
  } catch (error) {
    setState(error.message || "Не удалось обновить задачу.", "error");
  } finally {
    loading.stop();
  }
}

async function deleteTodo(todoId) {
  loading.start();

  try {
    await todosService.delete(todoId);
    await refreshTodos();
    setState("Задача удалена.", "success");
  } catch (error) {
    setState(error.message || "Не удалось удалить задачу.", "error");
  } finally {
    loading.stop();
  }
}

const init = async () => {
  const { ok: isLogged } = await Auth.me();

  if (!isLogged) {
    return location.login();
  }

  await refreshTodos();

  todoSubmit.addEventListener("click", createTodo);

  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createTodo();
    }
  });

  todoList.addEventListener("change", async (event) => {
    if (event.target.dataset.action !== "toggle") {
      return;
    }

    await toggleTodo(event.target.dataset.id, event.target.checked);
  });

  todoList.addEventListener("click", async (event) => {
    const button = event.target.closest('[data-action="delete"]');

    if (!button) {
      return;
    }

    await deleteTodo(button.dataset.id);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
