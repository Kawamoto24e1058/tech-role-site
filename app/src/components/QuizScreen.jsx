import { shuffleAnswers } from '../quizData'
import { useMemo } from 'react'

function QuizScreen({ quiz, questionNumber, totalQuestions, onAnswerSelect }) {
  const shuffledAnswers = useMemo(() => {
    const shuffled = shuffleAnswers(quiz.answers)
    console.log(`質問${quiz.id}の回答順:`, shuffled.map(a => a.type))
    return shuffled
  }, [quiz.id, quiz.answers])

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            質問 {questionNumber} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 質問 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
          {quiz.question}
        </h2>
      </div>

      {/* 回答選択肢 */}
      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(answer.type)}
            className="w-full p-4 text-left bg-gray-50 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-2 border-gray-200 hover:border-purple-400 rounded-lg transition-all duration-200 transform hover:scale-102"
          >
            <span className="text-gray-800 font-medium">{answer.text}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        ヒント：回答は毎回ランダムな順序で表示されます
      </p>
    </div>
  )
}

export default QuizScreen
