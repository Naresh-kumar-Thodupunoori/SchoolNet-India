import React, { useState, useEffect } from 'react';
import './App.css';

const allQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and most populous city of France.",
    difficulty: "easy"
  },
  {
    id: 2,
    type: "true-false",
    question: "The Earth is flat.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "The Earth is actually an oblate spheroid, slightly flattened at the poles.",
    difficulty: "easy"
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars is often called the Red Planet due to its reddish appearance in the night sky.",
    difficulty: "medium"
  },
  {
    id: 4,
    type: "short-answer",
    question: "What is the chemical symbol for water?",
    correctAnswer: "H2O",
    explanation: "H2O represents two hydrogen atoms and one oxygen atom bonded together.",
    difficulty: "medium"
  },
  {
    id: 5,
    type: "multiple-select",
    question: "Which of the following are prime numbers?",
    options: ["2", "4", "7", "9", "11"],
    correctAnswer: ["2", "7", "11"],
    explanation: "Prime numbers are numbers that have exactly two factors: 1 and themselves.",
    difficulty: "hard"
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Aluminum"],
    correctAnswer: "Gold",
    explanation: "The chemical symbol 'Au' comes from the Latin word for gold, 'aurum'.",
    difficulty: "hard"
  },
  {
    id: 7,
    type: "true-false",
    question: "The Great Wall of China is visible from space.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Contrary to popular belief, the Great Wall of China is not visible from space with the naked eye.",
    difficulty: "easy"
  },
  {
    id: 8,
    type: "multiple-select",
    question: "Which of these countries are in South America?",
    options: ["Brazil", "Spain", "Peru", "Egypt", "Argentina"],
    correctAnswer: ["Brazil", "Peru", "Argentina"],
    explanation: "Brazil, Peru, and Argentina are all countries located in South America.",
    difficulty: "medium"
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "What is the half-life of Carbon-14?",
    options: ["2,730 years", "5,730 years", "7,730 years", "10,730 years"],
    correctAnswer: "5,730 years",
    explanation: "The half-life of Carbon-14 is approximately 5,730 years, which makes it useful for dating objects up to about 50,000 years old.",
    difficulty: "hard"
  },
  {
    id: 10,
    type: "short-answer",
    question: "What is the largest organ in the human body?",
    correctAnswer: "Skin",
    explanation: "The skin is the largest organ in the human body, covering an area of about 20 square feet in an average adult.",
    difficulty: "easy"
  },
  {
    id: 11,
    type: "multiple-choice",
    question: "Which of these is not a type of elementary particle?",
    options: ["Quark", "Lepton", "Boson", "Neutron"],
    correctAnswer: "Neutron",
    explanation: "Neutrons are composite particles made up of quarks, while quarks, leptons, and bosons are elementary particles.",
    difficulty: "hard"
  },
  {
    id: 12,
    type: "true-false",
    question: "Sound travels faster in water than in air.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Sound travels about 4.3 times faster in water than in air due to water's higher density.",
    difficulty: "medium"
  },
  {
    id: 13,
    type: "multiple-select",
    question: "Which of these are mammals?",
    options: ["Bat", "Penguin", "Whale", "Snake", "Platypus"],
    correctAnswer: ["Bat", "Whale", "Platypus"],
    explanation: "Bats, whales, and platypuses are all mammals, characterized by their ability to produce milk and having hair or fur.",
    difficulty: "medium"
  },
  {
    id: 14,
    type: "short-answer",
    question: "What is the most abundant gas in Earth's atmosphere?",
    correctAnswer: "Nitrogen",
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere, followed by oxygen at about 21%.",
    difficulty: "medium"
  },
  {
    id: 15,
    type: "multiple-choice",
    question: "Which of these is not one of the four fundamental forces of nature?",
    options: ["Gravity", "Electromagnetic force", "Strong nuclear force", "Centrifugal force"],
    correctAnswer: "Centrifugal force",
    explanation: "The four fundamental forces are gravity, electromagnetic force, strong nuclear force, and weak nuclear force. Centrifugal force is a fictitious force in a rotating reference frame.",
    difficulty: "hard"
  },
  {
    id: 16,
    type: "true-false",
    question: "Vaccines cause autism.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Numerous scientific studies have found no link between vaccines and autism. The original study suggesting this link was discredited and retracted.",
    difficulty: "easy"
  },
  {
    id: 17,
    type: "multiple-select",
    question: "Which of these elements are noble gases?",
    options: ["Helium", "Oxygen", "Neon", "Chlorine", "Argon"],
    correctAnswer: ["Helium", "Neon", "Argon"],
    explanation: "Helium, neon, and argon are noble gases, characterized by their full outer shell of electrons and chemical inertness.",
    difficulty: "hard"
  },
  {
    id: 18,
    type: "short-answer",
    question: "What is the speed of light in vacuum (in meters per second)?",
    correctAnswer: "299,792,458",
    explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second, as defined by the International System of Units (SI).",
    difficulty: "hard"
  }
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120);
  const [quizState, setQuizState] = useState('not-started');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
    if (quizState === 'in-progress' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, quizState]);

  const startQuiz = () => {
    const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
    setQuestions(shuffleArray(filteredQuestions).slice(0, 10));
    setQuizState('in-progress');
    setTimeLeft(difficulty === 'easy' ? 180 : difficulty === 'medium' ? 240 : 300);
  };

  const handleAnswerSubmit = (selectedAnswer) => {
    const currentQuestionData = questions[currentQuestion];
    let isCorrect = false;

    if (currentQuestionData.type === 'multiple-select') {
      isCorrect = JSON.stringify(selectedOptions.sort()) === JSON.stringify(currentQuestionData.correctAnswer.sort());
      selectedAnswer = selectedOptions;
    } else if (currentQuestionData.type === 'short-answer') {
      isCorrect = selectedAnswer.toLowerCase() === currentQuestionData.correctAnswer.toLowerCase();
    } else {
      isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
    }

    setAnswers({
      ...answers,
      [currentQuestionData.id]: { selectedAnswer, isCorrect }
    });

    if (isCorrect) {
      const difficultyScore = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      setScore(score + difficultyScore);
    }

    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOptions([]);
      } else {
        finishQuiz();
      }
    }, 3000);
  };

  const finishQuiz = () => {
    setShowScore(true);
    setQuizState('finished');
  };

  const restartQuiz = () => {
    console.log("Restarting quiz...");
    window.location.href = "https://quiz-app-schoolnet.vercel.app/";
  };

  const renderProgressBar = () => {
    const progress = (currentQuestion / questions.length) * 100;
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return (
          <div className="answer-options">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerSubmit(option)} className="option-btn" disabled={showExplanation}>
                {option}
              </button>
            ))}
          </div>
        );
      case 'short-answer':
        return (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAnswerSubmit(e.target.answer.value);
          }} className="short-answer-form">
            <input type="text" name="answer" required className="short-answer-input" disabled={showExplanation} />
            <button type="submit" className="submit-btn" disabled={showExplanation}>Submit</button>
          </form>
        );
      case 'multiple-select':
        return (
          <div className="answer-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`option-btn ${selectedOptions.includes(option) ? 'selected' : ''}`}
                disabled={showExplanation}
              >
                {option}
              </button>
            ))}
            <button onClick={() => handleAnswerSubmit(selectedOptions)} className="submit-btn" disabled={showExplanation}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderReview = () => {
    return (
      <div className="review-section">
        <h2>Review Your Answers</h2>
        {questions.map((question, index) => (
          <div key={question.id} className="review-question">
            <h3>Q{index + 1}: {question.question}</h3>
            <p><strong>Your answer:</strong> {Array.isArray(answers[question.id]?.selectedAnswer)
              ? answers[question.id]?.selectedAnswer.join(', ')
              : answers[question.id]?.selectedAnswer || 'Not answered'}</p>
            <p><strong>Correct answer:</strong> {Array.isArray(question.correctAnswer)
              ? question.correctAnswer.join(', ')
              : question.correctAnswer}</p>
            <p className={answers[question.id]?.isCorrect ? 'correct' : 'incorrect'}>
              {answers[question.id]?.isCorrect ? '✅ Correct' : '❌ Incorrect'}
            </p>
            <p><strong>Explanation:</strong> {question.explanation}</p>
          </div>
        ))}
      </div>
    );
  };

  if (quizState === 'not-started') {
    return (      
      <div className="App">
        <div className="quiz-card start-screen">
          <h1>Welcome to the Quiz!</h1>
          <p>Test your knowledge with our quiz. Select a difficulty level to begin.</p>
          <div className="difficulty-selection">
            <button onClick={() => setDifficulty('easy')} className={`difficulty-btn ${difficulty === 'easy' ? 'selected' : ''}`}>Easy</button>
            <button onClick={() => setDifficulty('medium')} className={`difficulty-btn ${difficulty === 'medium' ? 'selected' : ''}`}>Medium</button>
            <button onClick={() => setDifficulty('hard')} className={`difficulty-btn ${difficulty === 'hard' ? 'selected' : ''}`}>Hard</button>
          </div>
          <button onClick={startQuiz} className="start-btn" disabled={!difficulty}>Start Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {showScore ? (
        <div className="quiz-card score-section">
          <h2>Quiz Completed!</h2>
          <p className="score">You scored {score} out of {questions.length * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)}</p>
          <p className="time">Time taken: {(difficulty === 'easy' ? 180 : difficulty === 'medium' ? 240 : 300) - timeLeft} seconds</p>
          {renderReview()}
          <button onClick={restartQuiz} className="restart-btn">Restart Quiz</button>
        </div>
      ) : (
        <div className="quiz-card question-section">
          <div className="quiz-header">
            <h2>Question {currentQuestion + 1}/{questions.length}</h2>
            <p className="timer">Time left: {timeLeft} seconds</p>
          </div>
          {renderProgressBar()}
          <p className="question">{questions[currentQuestion].question}</p>
          {renderQuestion()}
          {showExplanation && (
            <div className={`explanation ${answers[questions[currentQuestion].id]?.isCorrect ? 'correct' : 'incorrect'}`}>
              <p>{questions[currentQuestion].explanation}</p>
            </div>
          )}
          <p className="difficulty-indicator">Current Difficulty: {difficulty}</p>
        </div>
      )}
    </div>
  );
}

export default App;