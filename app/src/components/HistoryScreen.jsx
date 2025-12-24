import React from 'react'

function HistoryScreen({ history, filterStudentId, onBack }) {
  const filtered = filterStudentId ? history.filter(h => h.studentId === filterStudentId) : history

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">結果の履歴</h2>
        <button onClick={onBack} className="text-sm px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">ホームに戻る</button>
      </div>
      {filtered.length === 0 ? (
        <p className="text-gray-600 text-sm">まだ履歴がありません。</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">{new Date(item.timestamp).toLocaleString()}</div>
                <div className="text-sm font-semibold text-gray-800">{item.studentId} / {item.studentName}</div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-700">トップ: <span className="font-bold">{item.topRole}</span></div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div>👑 leader: {item.scores.leader}</div>
                <div>💰 finance: {item.scores.finance}</div>
                <div>💡 creative: {item.scores.creative}</div>
                <div>🔧 executor: {item.scores.executor}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryScreen
