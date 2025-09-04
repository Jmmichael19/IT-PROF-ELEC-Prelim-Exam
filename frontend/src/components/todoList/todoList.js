import { getTodos, completeTodo } from "../../api/todoAPI";
import "./todoList.css";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export async function renderTodoList() {
  const container = document.createElement("div");
  container.className = "todo-list";

  const todos = await getTodos();

  container.innerHTML = `
        <table border="1" cellpading="8">
            <tr><th>Todo</th><th>Status</th><th>Action</th></tr>
            ${todos
              .map(
                (t) => `
            <tr>
                <td>${t.text}</td>
                <td>${t.completed ? "Done" : "Pending"}</td>
            <td>
                ${
                  !t.completed
                    ? `<button data-id="${t.id}">Complete</button>`
                    : ""
                }
            </td>
        </tr>
    `
              )
              .join("")}
        </table>
    `;
  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await completeTodo(Number(btn.dataset.id));
      const event = new Event("todosUpdated");
      document.dispatchEvent(event);
    });
  });

  jsConfetti.addConfetti({
    emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
  });

  jsConfetti.addConfetti({
    confettiRadius: 6,
  });

  jsConfetti.addConfetti({
    confettiColors: [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1bd",
      "#f9bec7",
    ],
  });

  jsConfetti.addConfetti();

  return container;
}
