const taskInput = document.getElementById('taskInput');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

let tasks = [];

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask !== '') {
    addTask(newTask);
    taskInput.value = '';
  }
});

function addTask(taskText) {
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    tasks[taskIndex].completed = checkbox.checked;
    taskElement.classList.toggle('completed', checkbox.checked);
  });

  const taskTextElement = document.createElement('span');
  taskTextElement.classList.add('task-text');
  taskTextElement.textContent = taskText;

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.textContent = 'Edit';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList.add('edit-input');
  editInput.value = taskText;
  editInput.style.display = 'none';

  editButton.addEventListener('click', () => {
    taskTextElement.style.display = 'none';
    editInput.style.display = 'block';
    editInput.focus();
  });

  editInput.addEventListener('blur', () => {
    const newText = editInput.value.trim();
    if (newText !== '') {
      taskTextElement.textContent = newText;
      const taskIndex = tasks.findIndex(task => task.text === taskText);
      tasks[taskIndex].text = newText;
    }
    taskTextElement.style.display = 'inline';
    editInput.style.display = 'none';
  });

  taskElement.appendChild(checkbox);
  taskElement.appendChild(taskTextElement);
  taskElement.appendChild(editButton);
  taskElement.appendChild(editInput);

  taskList.appendChild(taskElement);
  tasks.push({ text: taskText, completed: false });
}

clearButton.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.completed);
  taskList.innerHTML = '';
  tasks.forEach(addTask);
});