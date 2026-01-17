document.addEventListener('DOMContentLoaded', () => {
    const tasks = [
        {
            content: "Learn JavaScript",
            done: false,
        },
        {
            content: "eat dinner",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                    <li style="text-decoration: line-through">
                       ${task.content}
                    </li>
                   `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
});