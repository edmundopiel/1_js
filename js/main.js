document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencias a elementos HTML
  const checkButton = document.getElementById('check-btn');
  const guessInput = document.getElementById('guess-input');
  const message = document.getElementById('message');
  const errorPercentageDisplay = document.getElementById('error-percentage');

  // Definir límites para el número aleatorio
  const minNumber = 1;
  const maxNumber = 10;

  // Generar un número aleatorio entre minNumber y maxNumber
  let secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  // Variables de seguimiento de intentos
  let attemptsLeft = 3;
  let incorrectAttempts = 0;
  let userAttempts = [];

  // Acción al hacer clic en el botón
  checkButton.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);

    if (!isNaN(userGuess)) {
      // Verificar si el número adivinado es correcto
      if (userGuess === secretNumber) {
        // Mostrar mensaje de acierto si el número es correcto
        message.textContent = '¡Adivinaste el número! Felicidades.';
        message.style.color = 'green';
        guessInput.disabled = true;
        checkButton.disabled = true;
      } else {
        // Si el número es incorrecto, mostrar pista y actualizar intentos
        attemptsLeft--;
        incorrectAttempts++;
        let hint = userGuess < secretNumber ? 'El número es mayor.' : 'El número es menor.';
        message.textContent = `Incorrecto. Tienes ${attemptsLeft} intentos. Pista: ${hint}`;
        message.style.color = 'red';

        // Si se agotan los intentos, mostrar el número secreto y deshabilitar la entrada
        if (attemptsLeft === 0) {
          message.textContent = `Se agotaron los intentos. El número era ${secretNumber}.`;
          message.style.color = 'red';
          guessInput.disabled = true;
          checkButton.disabled = true;
        }
      }

      // Registrar intento y calcular porcentaje de error
      userAttempts.push({ number: userGuess, correct: userGuess === secretNumber });
      const errorPercentage = (incorrectAttempts / userAttempts.length) * 100;
      errorPercentageDisplay.textContent = `Porcentaje de error: ${errorPercentage.toFixed(2)}%`;
    } else {
      // Mensaje para entrada de número inválida
      message.textContent = 'Por favor, ingresa un número válido.';
      message.style.color = 'black';
    }

    guessInput.value = ''; // Limpiar entrada después de cada intento
  });

  // Función para encontrar un intento específico por número
  function findAttemptByNumber(number) {
    return userAttempts.find(attempt => attempt.number === number);
  }

  // Función para filtrar intentos correctos
  function filterCorrectAttempts() {
    return userAttempts.filter(attempt => attempt.correct);
  }
});