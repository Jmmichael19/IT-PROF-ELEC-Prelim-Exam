import "./style.css";
import { renderTodoForm } from "./components/todoForm/todoForm";
import { renderTodoList } from "./components/todoList/todoList";

async function renderTodos() {
  const app = document.querySelector("#app");
  app.innerHTML = "<h1>Todo App</h1>";
  app.appendChild(renderTodoForm());
  app.appendChild(await renderTodoList());
}

//firt render
renderTodos();

//listen for updates
document.addEventListener("todosUpdated", renderTodos);