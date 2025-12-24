function ResultScreen({ scores, jobDescriptions, onRetake, onOpenHistory }) {
  // スコアが最高の職種を取得
  const getTopJob = () => {
    const entries = Object.entries(scores)
    return entries.reduce((max, current) => 
      current[1] > max[1] ? current : max
    )[0]
  }

  const topJob = getTopJob()
  const topJobInfo = jobDescriptions[topJob]
  const maxScore = Math.max(...Object.values(scores))

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* 結果ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          診断結果
        </h1>
        <p className="text-gray-600">
          あなたに最適な技術職は...
        </p>
      </div>

      {/* メイン結果 */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-8 mb-8 text-center">
        <div className="text-6xl mb-4">{topJobInfo.icon}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {topJobInfo.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {topJobInfo.description}
        </p>
      </div>

      {/* スコア詳細 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          スキルスコア
        </h3>
        <div className="space-y-4">
          {Object.entries(scores).map(([type, score]) => {
            const percentage = (score / maxScore) * 100
            const labels = {
              leader: '👑 リーダー型',
              finance: '💰 会計・管理型',
              creative: '💡 企画・創意型',
              executor: '🔧 実行・作業型'
            }
            return (
              <div key={type}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {labels[type]}
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {score}点
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      type === topJob
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'bg-gray-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* メッセージ */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">💡 ヒント：</span> 結果は現在のあなたの傾向を示しています。複数の職種に興味がある場合は、それらのスキルを組み合わせることで、より広い視点を持つエンジニアになれます！
        </p>
      </div>

      {/* ボタン */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenHistory}
          className="w-full bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50"
        >
          履歴を見る
        </button>
        <button
          onClick={onRetake}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  )
}

export default ResultScreen
