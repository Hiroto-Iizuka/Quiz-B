

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986')
    .then(response => response.json())
    .then(data => console.log(data));
});





