{
  const QUIZ_API = 'https://opentdb.com/api.php?amount=10&type=multiple';

  // クラスの作成
  class Quiz {
    constructor(quizData) {
      this._quizzes = quizData.results;
      this._correctAnswersNum = 0;
    }
    // カテゴリ
    getQuizCategory(index) {
      return this._quizzes[index - 1].category;
    }
    // 難易度
    getQuizDifficulty(index) {
      return this._quizzes[index - 1].difficulty;
    }
    // クイズの数
    getNumOfQuiz() {
      return this._quizzes.length;
    }
    // 問題文取得
    getQuizQuestion(index) {
      return this._quizzes[index - 1].question;
    }
    // 正答を取得
    getCorrectAnswer(index) {
      return this._quizzes[index - 1].correct_answer;
    }
    // 誤答を取得
    getIncorrectAnswers(index) {
      return this._quizzes[index - 1].incorrect_answers;
    }
    // 正答数カウント
    countCorrectAnswersNum(index, answer) {
      const correctAnswer = this._quizzes[index - 1].correct_answer;
      if (answer === correctAnswer) {
        return this._correctAnswersNum++;
      }
    }
    // 正答数を表示
    getCorrectAnswersNum() {
      return this._correctAnswersNum;
    }
  }


  // 必要な要素を定義
  const titleNode = document.getElementById('title');
  const questionNode = document.getElementById('question');
  const answersGroup = document.getElementById('answers')
  const startButton = document.getElementById('start-button');
  const genreNode = document.getElementById('genre');
  const difficultyNode = document.getElementById('difficulty');

  // 開始ボタンをクリックしたときの処理
  startButton.addEventListener('click', () => {
    startButton.hidden = true;
    fetchQuizData(1);
  });

  // 上記の取得中の非同期処理
  const fetchQuizData = async (index) => {
    titleNode.textContent = '取得中';
    questionNode.textContent = '少々お待ち下さい';
    
    try {
      const response = await fetch(QUIZ_API);
      const quizData = await response.json();
      const quizInstance = new Quiz(quizData);  
      setNextQuiz(quizInstance, index);
    } catch(err) {
      alert(err);
    }
  }

  // 次のクイズを表示
  const setNextQuiz = (quizInstance, index) => {
    while (answersGroup.firstChild) {
      answersGroup.removeChild(answersGroup.firstChild);
    }
    
    if (index <= quizInstance.getNumOfQuiz()) {
      makeQuiz(quizInstance, index);
    } else {
      finishQuiz(quizInstance);
    }
  } 

  // クイズ要素一式を生成
  const makeQuiz = (quizInstance, index) => {
    titleNode.innerHTML = `問題 ${index}`;
    genreNode.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
    difficultyNode.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
    questionNode.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)}`;
    
    const answers = buildAnswers(quizInstance, index);
    
    answers.forEach((answer) => {
      const answerElement = document.createElement('li');
      answersGroup.appendChild(answerElement);
    
      const buttonNode = document.createElement('button');
      buttonNode.innerHTML = answer;
      answerElement.appendChild(buttonNode);
    
      buttonNode.addEventListener('click', () => {
        quizInstance.countCorrectAnswersNum(index, answer);
        index++;
        setNextQuiz(quizInstance, index);
      });
    });
  }

  // 最後のクイズ
  const finishQuiz = (quizInstance) => {
    titleNode.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です`
    genreNode.textContent = '';
    difficultyNode.textContent = '';
    questionNode.textContent = '再チャレンジしたい場合は以下をクリック！！'

    const restartButton = document.createElement('button');
    restartButton.textContent = 'ホームに戻る';
    answersGroup.appendChild(restartButton);
    restartButton.addEventListener('click', () => {
      location.reload();
    });
  }
  // 回答要素を構築
  const buildAnswers = (quizInstance, index) => {
    const answers = [
      quizInstance.getCorrectAnswer(index),
      ...quizInstance.getIncorrectAnswers(index)
    ];
    return shuffleArray(answers);
  };
  // 回答要素をシャッフル
  const shuffleArray = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
}
