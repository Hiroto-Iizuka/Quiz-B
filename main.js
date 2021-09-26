const QUIZ_API = 'https://opentdb.com/api.php?amount=10&type=multiple';
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  fetch(QUIZ_API)
    .then(response => response.json())
    .then(data => console.log(data));
  });





