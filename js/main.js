document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('check-btn');
    const guessInput = document.getElementById('guess-input');
    const message = document.getElementById('message');
  
    const minNumber = 1;
    const maxNumber = 10;
    let secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    let attempts = 3;
  
    checkButton.addEventListener('click', function() {
      const userGuess = parseInt(guessInput.value);
  
      if (!isNaN(userGuess)) {
        if (userGuess === secretNumber) {
          message.textContent = '¡Felicidades! Has adivinado el número.';
          message.style.color = 'green';
          guessInput.disabled = true;
          checkButton.disabled = true;
        } else {
          attempts--;
          if (attempts > 0) {
            message.textContent = `Incorrecto. Te quedan ${attempts} intentos.`;
            message.style.color = 'red';
          } else {
            message.textContent = `Has agotado tus intentos. El número era ${secretNumber}.`;
            message.style.color = 'red';
            guessInput.disabled = true;
            checkButton.disabled = true;
          }
        }
      } else {
        message.textContent = 'Por favor, introduce un número válido.';
        message.style.color = 'black';
      }
  
      guessInput.value = '';
    });
  });