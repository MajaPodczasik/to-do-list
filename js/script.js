document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];
    let hideCompleted = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((_, index) => index !== taskIndex);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index !== taskIndex) {
                return task;
            }

            return {
                ...task,
                done: !task.done,
            };
        });

        render();
    };

    const toggleCompletedVisibility = () => {
        hideCompleted = !hideCompleted;
        render();
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggle-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const toggleCompletedBtn = document.querySelector(".js-toggle-completed");
        if (toggleCompletedBtn) {
            toggleCompletedBtn.addEventListener("click", toggleCompletedVisibility);
            toggleCompletedBtn.textContent = hideCompleted ? "Show completed" : "Hide completed";
        }

        const markAllDoneBtn = document.querySelector(".js-mark-all-done");
        if (markAllDoneBtn) {
            const allDone = tasks.length > 0 && tasks.every((task) => task.done);
            markAllDoneBtn.disabled = allDone;
            markAllDoneBtn.addEventListener("click", markAllDone);
        }
    };


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            if (hideCompleted && task.done) {
                continue;
            }

                htmlString += `
                    <li class="todo-item">
                        <span class="todo-item__text${task.done ? " todo-item__text--done" : ""}">
                            ${task.content}
                        </span>
                        
                        <div class="todo-item__actions">
                            <button class="js-toggle-done todo-item__button" aria-label="Toggle task done">✓</button>
                            <button class="js-remove todo-item__button">remove</button>
                        </div>
                    </li>
                `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const controls = document.querySelector('.task-controls');
        if (controls) {
            if (tasks.length > 0) {
                controls.classList.remove('hidden');
            } else {
                controls.classList.add('hidden');
            }
        }

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
});