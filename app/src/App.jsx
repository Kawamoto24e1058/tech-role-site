import { useState, useEffect } from 'react'
import './App.css'
import { quizzes, jobDescriptions, shuffleQuizzes } from './quizData'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import HistoryScreen from './components/HistoryScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home') // home, quiz, result, history
  const [shuffledQuizzes, setShuffledQuizzes] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState({ leader: 0, finance: 0, creative: 0, executor: 0 })
  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [history, setHistory] = useState([])

  // 初回表示時にもクイズをシャッフルして10問を用意
  useEffect(() => {
    const initial = shuffleQuizzes(quizzes).slice(0, 10)
    setShuffledQuizzes(initial)
    console.log('初期シャッフル:', initial.map(q => q.id))
    // 履歴読み込み
    const raw = localStorage.getItem('techRoleHistory')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setHistory(Array.isArray(parsed) ? parsed : [])
      } catch {}
    }
  }, [])

  const handleStartQuiz = () => {
    if (!studentId.trim() || !studentName.trim()) {
      alert('学籍番号と名前を入力してください')
      return
    }
    // クイズ開始時に毎回シャッフルし、10問を重複なし抽出
    const newShuffled = shuffleQuizzes(quizzes).slice(0, 10)
    console.log('シャッフルされたクイズ:', newShuffled.map(q => q.id))
    setShuffledQuizzes(newShuffled)
    setCurrentScreen('quiz')
    setCurrentQuestionIndex(0)
    setScores({ leader: 0, finance: 0, creative: 0, executor: 0 })
  }

  const handleAnswerSelect = (answerType) => {
    setScores(prev => ({
      ...prev,
      [answerType]: prev[answerType] + 1
    }))

    if (currentQuestionIndex < shuffledQuizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // 結果画面へ遷移する前に履歴保存
      const top = Object.entries(scores).reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc))
      const topRole = top[0]
      const entry = {
        timestamp: new Date().toISOString(),
        studentId,
        studentName,
        scores: { ...scores, [answerType]: scores[answerType] + 1 },
        topRole
      }
      const nextHistory = [entry, ...history].slice(0, 100)
      setHistory(nextHistory)
      localStorage.setItem('techRoleHistory', JSON.stringify(nextHistory))
      setCurrentScreen('result')
    }
  }

  const handleRetake = () => {
    // ホーム画面に戻す
    setCurrentScreen('home')
    setCurrentQuestionIndex(0)
    setScores({ leader: 0, finance: 0, creative: 0, executor: 0 })
  }

  const openHistory = () => setCurrentScreen('history')
  const backToHome = () => setCurrentScreen('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      {currentScreen === 'home' && (
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            テック部の役割診断
          </h1>
          
          <p className="text-center text-gray-600 mb-8 text-sm">
            学籍番号と名前を入力して診断を開始します。
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">学籍番号</label>
            <input
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. 24A0123"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
            <input
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. 山田 太郎"
            />
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-8">
            <p className="text-center text-sm text-gray-700">
              10個の質問に答えて、あなたのスキルプロファイルを発見しよう！
            </p>
            <p className="text-center text-xs text-gray-600 mt-3">
              質問と回答の順序はランダムです
            </p>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={!studentId.trim() || !studentName.trim()}
            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform ${(!studentId.trim() || !studentName.trim()) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105'}`}
          >
            クイズを開始する
          </button>

          <button
            onClick={openHistory}
            className="w-full mt-3 bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            結果の履歴を見る
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-3 font-semibold">診断できる役割：</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>👑 リーダー型</div>
              <div>💰 会計・管理型</div>
              <div>💡 企画・創意型</div>
              <div>🔧 実行・作業型</div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'quiz' && (
        shuffledQuizzes.length > 0 ? (
          <QuizScreen
            quiz={shuffledQuizzes[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={shuffledQuizzes.length}
            onAnswerSelect={handleAnswerSelect}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <p className="text-gray-600">読み込み中...</p>
          </div>
        )
      )}

      {currentScreen === 'result' && (
        <ResultScreen
          scores={scores}
          jobDescriptions={jobDescriptions}
          onRetake={handleRetake}
          onOpenHistory={openHistory}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryScreen
          history={history}
          filterStudentId={studentId}
          onBack={backToHome}
        />
      )}
    </div>
  )
}

export default App
