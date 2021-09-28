{
  const QUIZ_API = 'https://opentdb.com/api.php?amount=10&type=multiple';
  class Quiz {
    constructor(quizData) {
      this._quizzes = quizData.results;
    }

    getQuizCategory(index) {
      return this._quizzes[index - 1].category;
    }

    getQuizDifficulty(index) {
      return this._quizzes[index - 1].difficulty;
    }

    getQuizQuestion(index) {
      return this._quizzes[index - 1].question;
    }
  }

  const titleNode = document.getElementById('title');
  const questionNode = document.getElementById('question');
  const answersContainer = document.getElementById('answers')
  const startButton = document.getElementById('start-button');
  const genreNode = document.getElementById('genre');
  const difficultyNode = document.getElementById('difficulty');

  startButton.addEventListener('click', () => {
    startButton.hidden = true;
      fetchQuizData(1);
  });

  const fetchQuizData = async (index) => {
    titleNode.textContent = '取得中';
    questionNode.textContent = '少々お待ち下さい';

    const response = await fetch(QUIZ_API);
    const quizData = await response.json();
    const quizInstance = new Quiz(quizData);

    setNextQuiz(quizInstance, index);
  };

  const makeQuiz = (quizInstance, index) => {
    titleNode.innerHTML = `問題${index}`;
    genreNode.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
    difficultyNode.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
    questionNode.innerHTML = `【クイズ】 ${quizInstance.getQuizQuestion(index)}`;

    const buttonNode = document.createElement('button');
    buttonNode.innerHTML = '次へ';
    answersContainer.appendChild(buttonNode);
    buttonNode.addEventListener('click', () => {
      index++;
      answersContainer.removeChild(answersContainer.firstChild);
      setNextQuiz(quizInstance, index);
    });

    // 次のクイズを表示
    const setNextQuiz = () => {
      if (gameState.currentIndex < gameState.quizzes.length) {
        const quiz = gameState.quizzes[gameState.currentIndex];
        makeQuiz(quiz);
      } else {
        finishQuiz();
      }
    }

  // 最後のクイズ
    const finishQuiz = (quizInstance) => {
      titleNode.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です`
      genreNode.textContent = '';
      difficultyNode.textContent = '';
      questionNode.textContent = '再チャレンジしたい場合は以下をクリック！！'

      const restartButton = document.createElement('button');
      restartButton.textContent = 'ホームに戻る';
      answersContainer.appendChild(restartButton);
      restartButton.addEventListener('click', () => {
        location.reload();
      });
    }
}

}