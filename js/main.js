// Se ejecuta cuando el DOM ha cargado completamente
document.addEventListener('DOMContentLoaded', function () {
  // Obtener elementos del DOM
  const taskInput = document.getElementById('taskInput'); // Input para ingresar tareas
  const addTaskBtn = document.getElementById('addTaskBtn'); // Botón para agregar tarea
  const taskList = document.getElementById('taskList'); // Lista de tareas

  // Función para cargar tareas desde un archivo JSON usando Promesas
  function loadTasksFromJSON() {
    return new Promise((resolve, reject) => {
      // Realizar una solicitud 'fetch' para obtener el archivo JSON
      fetch('datos.json') 
        .then(response => {
          // Verificar si la respuesta es exitosa (código de estado 200-299)
          if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON. Código de estado: ${response.status}`);
          }
          // Parsear la respuesta como JSON y resolver la Promesa con los datos
          return response.json();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  // Función para cargar tareas desde el almacenamiento local
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      createTaskElement(task);
    });
  }

  // Función para guardar tareas en el almacenamiento local
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Función para crear un elemento de tarea en la lista
  function createTaskElement(taskContent) {
    const li = document.createElement('li'); // Crear elemento de lista (li)
    const taskText = document.createElement('span'); // Crear elemento de texto (span)
    const deleteBtn = document.createElement('button'); // Crear botón para eliminar tarea
    const completeBtn = document.createElement('button'); // Crear botón para marcar tarea como completada

    // Configurar contenido y estilos para los elementos creados
    taskText.textContent = taskContent; // Establecer texto de la tarea
    deleteBtn.textContent = '❌'; // Establecer texto del botón de eliminar
    deleteBtn.classList.add('deleteBtn'); // Agregar clase para estilos del botón de eliminar
    completeBtn.textContent = '✔️'; // Establecer texto del botón de completar
    completeBtn.classList.add('completeBtn'); // Agregar clase para estilos del botón de completar

    // Evento para eliminar una tarea al hacer clic en el botón correspondiente
    deleteBtn.addEventListener('click', function () {
      li.remove(); // Eliminar elemento de la lista visualmente

      // Obtener tareas almacenadas, encontrar y eliminar la tarea seleccionada
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const index = tasks.indexOf(taskContent);
      if (index !== -1) {
        tasks.splice(index, 1); // Eliminar la tarea del arreglo
        saveTasks(tasks); // Guardar el arreglo actualizado en el almacenamiento local
      }
    });

    // Evento para marcar una tarea como completada al hacer clic en el botón correspondiente
    completeBtn.addEventListener('click', function () {
      taskText.classList.toggle('taskCompleted'); // Alternar clase para tachado y estilo de tarea completada
    });

    // Agregar elementos creados al elemento de lista
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    taskList.appendChild(li); // Agregar elemento de lista a la lista principal
  }

  // Cargar tareas desde el archivo JSON usando Promesas
  loadTasksFromJSON()
    .then(tasks => {
      tasks.forEach(task => {
        createTaskElement(task);
      });
    })
    .catch(error => console.error('Error al cargar tareas desde el archivo JSON:', error));

  // Cargar tareas existentes al cargar la página desde el almacenamiento local
  loadTasks();

  // Evento para agregar una nueva tarea al hacer clic en el botón correspondiente
  addTaskBtn.addEventListener('click', function () {
    const taskContent = taskInput.value.trim(); // Obtener contenido de la nueva tarea
    if (taskContent !== '') {
      createTaskElement(taskContent); // Crear un nuevo elemento para la tarea

      // Obtener tareas almacenadas, agregar la nueva tarea y guardar en el almacenamiento local
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(taskContent); // Agregar la nueva tarea al arreglo
      saveTasks(tasks); // Guardar el arreglo actualizado en el almacenamiento local

      taskInput.value = ''; // Limpiar el input después de agregar la tarea
    }
  });
});