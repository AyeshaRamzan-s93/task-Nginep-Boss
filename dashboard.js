
const API_URL = "http://localhost:3000/users"; 

// Fetch and render items on page load
document.addEventListener("DOMContentLoaded", fetchAndRenderItems);


// =============  Add task event ================


document.querySelectorAll(".add-item").forEach((btn) => {
    btn.addEventListener("click", () => {
        const column = btn.closest(".todo-column").dataset.state; // todo, doing, done
        const taskName = prompt("Enter task name:");
        if (!taskName) return;

        const newItem = {
            name: taskName,
            image: "",
            state: column
        };

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        })
        .then(res => res.json())
        .then(() => {
            fetchAndRenderItems();                   //  re-fetch so UI always stays in sync
        });
    });
});

// =========== Fetch all items and render them ============

function fetchAndRenderItems() {
    fetch(API_URL)
        .then(res => res.json())
        .then(items => {
            document.querySelectorAll(".todo-column .tasks").forEach(col => col.innerHTML = "");
            items.forEach(item => renderItem(item));
        });
}


// =========== Render a single task =============


function renderItem(item) {
    const column = document.querySelector(`.todo-column[data-state="${item.state}"] .tasks`);
    if (!column) return;

    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
        <h4>${item.name}</h4>
        <div class="image-placeholder"></div>
        <div class="task-actions">
            <i class="fas fa-trash delete"></i>
            <i class="fas fa-edit edit"></i>
        </div>
    `;

    // Delete task
    card.querySelector(".delete").addEventListener("click", () => {
        fetch(`${API_URL}/${item.id}`, { method: "DELETE" })
            .then(() => fetchAndRenderItems());
    });

    // Edit task
    card.querySelector(".edit").addEventListener("click", () => {
        const newName = prompt("Edit task name:", item.name);
        if (!newName) return;
        fetch(`${API_URL}/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName })
        })
        .then(() => fetchAndRenderItems());
    });

    column.appendChild(card);
}
