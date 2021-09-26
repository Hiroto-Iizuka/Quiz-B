const QUIZ_API = 'https://opentdb.com/api.php?amount=10&type=multiple';
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  fetch(QUIZ_API)
    .then(response => response.json())
    .then(data => {
      const quizData = data.results;
      const quizList = document.getElementById('quiz-list');

      quizData.forEach((quiz, index) => {
        const numberTitleItem = document.createElement('li');
        numberTitleItem.textContent = `${index + 1}件目のクイズデータ`;
        quizList.appendChild(numberTitleItem);

        const quizDataList = buildQuizList(quiz);
        numberTitleItem.appendChild(quizDataList);
      });
    });
    
    const buildQuizList = (quiz) => {
      const quizContainer = document.createElement('ul');
      for(const prop in quiz) {
        const item = document.createElement('li');
        item.innerHTML = `<storng>${prop}</storng>: ${quiz[prop]}`;
        quizContainer.appendChild(item);
      }
      return quizContainer;
    }
  });





