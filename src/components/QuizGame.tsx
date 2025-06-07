
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { User, Question, Answer, GameResult } from '../types';
import { getRandomQuestions } from '../data/questions';

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
}

interface QuizGameProps {
  user: User;
  onComplete: (result: GameResult) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const QuizGame: React.FC<QuizGameProps> = ({ user, onComplete }) => {
  const [questions] = useState<ShuffledQuestion[]>(() => {
    const originalQuestions = getRandomQuestions();
    return originalQuestions.map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      const shuffledCorrectAnswer = shuffledOptions.findIndex(
        (option) => option === q.options[q.correctAnswer]
      );
      return { ...q, shuffledOptions, shuffledCorrectAnswer };
    });
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [gameStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setTimeLeft(currentQuestion.timeLimit);
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex, currentQuestion]);

  const handleAnswer = React.useCallback((answerIndex: number | null) => {
    const calculatePoints = (isCorrect: boolean, timeSpent: number, difficulty: string): number => {
      if (!isCorrect) return 0;
      
      const basePoints = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300;
      const timeBonus = Math.max(0, currentQuestion.timeLimit - timeSpent) * 5;
      
      return Math.round(basePoints + timeBonus);
    };

    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    const isCorrect = answerIndex === currentQuestion.shuffledCorrectAnswer;
    const points = calculatePoints(isCorrect, timeSpent, currentQuestion.difficulty);

    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex ?? -1,
      isCorrect,
      timeSpent,
      points
    };

    setAnswers(prev => [...prev, answer]);
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  }, [currentQuestion, questionStartTime]);

  // New useEffect to handle countdown timer
  useEffect(() => {
    if (showResult) {
      return; // Pause timer when showing result
    }
    if (timeLeft <= 0) {
      // Time's up, treat as no answer and show result
      handleAnswer(null);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showResult, handleAnswer]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Add the last answer if not already added
      if (answers.length < questions.length) {
        const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        const points = selectedAnswer !== null && isCorrect
          ? (currentQuestion.difficulty === 'easy' ? 100 : currentQuestion.difficulty === 'medium' ? 200 : 300) + Math.max(0, currentQuestion.timeLimit - timeSpent) * 5
          : 0;
        const lastAnswer: Answer = {
          questionId: currentQuestion.id,
          selectedAnswer: selectedAnswer ?? -1,
          isCorrect,
          timeSpent,
          points
        };
        setAnswers(prev => [...prev, lastAnswer]);
      }
      // Game complete
      const result: GameResult = {
        userName: user.name,
        userEmail: user.email,
        userInstagram: user.instagram,
        score: answers.reduce((sum, a) => sum + a.points, 0),
        correctAnswers: answers.filter(a => a.isCorrect).length,
        totalTime: Math.round((Date.now() - gameStartTime) / 1000),
        answers
      };
      onComplete(result);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </h2>
            <div className="flex items-center gap-2 bg-red-100 px-3 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
              <span className="font-bold text-red-600">{timeLeft}s</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQuestion.difficulty === 'easy' ? 'Fácil' :
               currentQuestion.difficulty === 'medium' ? 'Médio' : 'Difícil'}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {currentQuestion.shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.shuffledCorrectAnswer;
              
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                }
              } else {
                buttonClass += "border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800">
                <strong>Explicação:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}

          {showResult && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Próxima Pergunta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
