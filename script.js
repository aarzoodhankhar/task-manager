let taskId = 0;

function addTask() {
    const name = document.getElementById('task-name').value;
    const description = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    const time = document.getElementById('task-time').value;
    const category = document.getElementById('task-category').value;

    if (!name || !description || !date || !time) {
        alert('Please fill all fields!');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({
        id: taskId++,
        name,
        description,
        date,
        time,
        category,
        status: 'pending',
        important: false,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();

    // Clear input fields
    document.getElementById('task-name').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-time').value = '';
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.status === 'done') taskElement.classList.add('done');
        if (task.important) taskElement.classList.add('important-task');

        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <p><strong>Date:</strong> ${task.date} <strong>Time:</strong> ${task.time}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <button onclick="toggleDone(${task.id})">
                ${task.status === 'done' ? 'Undo' : 'Done'}
            </button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="markAsImportant(${task.id})">Mark as Important</button>
        `;
        taskList.appendChild(taskElement);
    });
}

function toggleDone(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = task.status === 'done' ? 'pending' : 'done';
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function markAsImportant(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.important = !task.important;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Initial render
renderTasks();
