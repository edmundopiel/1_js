document.addEventListener('DOMContentLoaded', function() {
  // Elementos del juego obtenidos del HTML
  const suspectsSelect = document.getElementById('suspects');
  const checkButton = document.getElementById('check-btn');
  const resultMessage = document.getElementById('result');
  const clueList = document.getElementById('clue-list');
  const countdownDisplay = document.getElementById('countdown');

  let countdown = 60; // 60 segundos

  // Información de los sospechosos
  const suspects = [
    { name: 'José', role: 'Médico', description: 'Metódico y reservado.' },
    { name: 'María', role: 'Abogada', description: 'Perspicaz y decidida.' },
    { name: 'Andrés', role: 'Profesor', description: 'Inteligente y comprensivo.' },
    { name: 'Sofía', role: 'Ingeniera', description: 'Precisa y analítica.' },
    { name: 'Carlos', role: 'Empresario', description: 'Ambicioso y persuasivo.' },
    { name: 'Camila', role: 'Escritora', description: 'Creativa y observadora.' },
    { name: 'Luis', role: 'Actor', description: 'Carismático y versátil.' }
  ];

  // Índice del asesino seleccionado aleatoriamente
  const killerIndex = Math.floor(Math.random() * suspects.length);
  const killer = suspects[killerIndex];

  // Pistas sobre el asesino
  const clues = [
    `El asesino es ${killer.description.toLowerCase()}.`,
    // ...más pistas
  ];

  // Mostrar las pistas en la lista
  clues.forEach(clue => {
    const li = document.createElement('li');
    li.textContent = clue;
    clueList.appendChild(li);
  });

  // Función para actualizar el contador de tiempo
  function updateCountdown() {
    countdownDisplay.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(timer);
      resultMessage.textContent = 'Se acabó el tiempo. ¡Intenta de nuevo!';
      resultMessage.style.color = 'red';
      checkButton.disabled = true;
    }
  }

  // Iniciar el contador de tiempo
  const timer = setInterval(updateCountdown, 1000);

  // Variables para rastrear intentos y errores
  let incorrectAttempts = 0;
  let totalAttempts = 0;

  // Llenar el menú de opciones con los sospechosos
  suspects.forEach((suspect, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${suspect.name} - ${suspect.role}`;
    suspectsSelect.appendChild(option);
  });

  // Acción al hacer clic en el botón de comprobación
  checkButton.addEventListener('click', function() {
    const selectedSuspect = parseInt(suspectsSelect.value);
    if (!isNaN(selectedSuspect)) {
      totalAttempts++;
      if (selectedSuspect === killerIndex) {
        resultMessage.textContent = `¡Felicidades! Has atrapado al asesino. Porcentaje de errores: ${(incorrectAttempts / totalAttempts * 100).toFixed(2)}%`;
        resultMessage.style.color = 'green';
      } else {
        resultMessage.textContent = `Lo siento, seleccionaste a la persona equivocada. Porcentaje de errores: ${(incorrectAttempts / totalAttempts * 100).toFixed(2)}%`;
        resultMessage.style.color = 'red';
        incorrectAttempts++;
      }
    } else {
      resultMessage.textContent = 'Por favor, selecciona a alguien.';
      resultMessage.style.color = 'black';
    }
  });
});