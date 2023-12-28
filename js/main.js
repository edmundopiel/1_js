document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
      createTaskElement(task);
    });
  }

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(taskContent) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const completeBtn = document.createElement('button');

    taskText.textContent = taskContent;
    deleteBtn.textContent = '❌';
    deleteBtn.classList.add('deleteBtn');
    completeBtn.textContent = '✔️';
    completeBtn.classList.add('completeBtn');

    deleteBtn.addEventListener('click', function () {
      li.remove();
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const index = tasks.indexOf(taskContent);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
      }
    });

    completeBtn.addEventListener('click', function () {
      taskText.classList.toggle('taskCompleted');
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    taskList.appendChild(li);
  }

  loadTasks();

  addTaskBtn.addEventListener('click', function () {
    const taskContent = taskInput.value.trim();
    if (taskContent !== '') {
      createTaskElement(taskContent);

      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(taskContent);
      saveTasks(tasks);

      taskInput.value = '';
    }
  });
});