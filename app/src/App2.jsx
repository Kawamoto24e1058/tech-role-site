import React, { useMemo, useState, useEffect } from 'react'
import { ROLES, QUESTIONS } from './data/questions'
import { saveResult, fetchResults } from './lib/api'
import './App.css'

export default function App() {
  const [step, setStep] = useState('intro')
  const [studentId, setStudentId] = useState('')
  const [name, setName] = useState('')
  const [agree, setAgree] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [saving, setSaving] = useState('idle')
  const [record, setRecord] = useState(null)
  const [historyData, setHistoryData] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  const roleLabels = {
    commander: 'まとめ役（リーダー）',
    worker: '実行役（手を動かす）',
    liaison: 'つなぎ役（調整）',
    analyst: '振り返り役（改善）',
    support: 'サポート役（裏方）',
    creator: 'アイデア役（発想）'
  }

  const roleDescriptions = {
    commander: 'みんなの意見をまとめて方向を決め、前に進めるタイプ。',
    worker: '決まったことをコツコツ形にして、予定通り進めるタイプ。',
    liaison: '人と人をつないで調整し、場を円滑にするタイプ。',
    analyst: 'やり方を見直して、より良くするポイントを見つけるタイプ。',
    support: '困りごとに気づき、周りを支えて土台を固めるタイプ。',
    creator: '新しいアイデアを出して、工夫しながら試していくタイプ。'
  }

  const startQuiz = () => {
    if (!studentId || !name || !agree) return
    setStep('quiz')
  }

  const viewHistory = async () => {
    setLoadingHistory(true)
    setStep('history')
    try {
      const data = await fetchResults()
      setHistoryData(data || [])
    } catch (e) {
      console.error('履歴取得エラー:', e)
      setHistoryData([])
    } finally {
      setLoadingHistory(false)
    }
  }

  const currentQuestion = QUESTIONS[current]
  const selectedIndex = answers[current]

  const selectChoice = (idx) => {
    setAnswers(prev => ({ ...prev, [current]: idx }))
  }

  const goNext = () => {
    if (selectedIndex === undefined) return
    if (current < QUESTIONS.length - 1) setCurrent(c => c + 1)
    else finish()
  }

  const goBack = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const totals = useMemo(() => {
    const t = {}
    ROLES.forEach(r => t[r] = 0)
    Object.entries(answers).forEach(([qi, idx]) => {
      const q = QUESTIONS[qi]
      if (!q) return
      const points = q.choices[idx]?.scores || {}
      Object.entries(points).forEach(([role, p]) => { t[role] += p })
    })
    return t
  }, [answers])

  const maxScore = useMemo(() => {
    const total = Object.values(totals).reduce((a, b) => a + b, 0)
    return total || 1
  }, [totals])

  const percentages = useMemo(() => {
    const pct = {}
    Object.entries(totals).forEach(([role, val]) => {
      pct[role] = Math.round((val / maxScore) * 100)
    })
    return pct
  }, [totals, maxScore])

  const sortedRoles = useMemo(() => (
    [...ROLES].sort((a, b) => percentages[b] - percentages[a])
  ), [percentages])

  const topRole = sortedRoles[0]

  const finish = async () => {
    const resultRecord = {
      studentId,
      name,
      result: topRole,
      scores: totals,
      percentages
    }
    setRecord(resultRecord)
    setStep('result')
    try {
      setSaving('saving')
      await saveResult(resultRecord)
      setSaving('saved')
    } catch (e) {
      setSaving('error')
    }
  }

  const restart = () => {
    setStep('intro')
    setCurrent(0)
    setAnswers({})
    setSaving('idle')
    setRecord(null)
    setAgree(false)
  }

  const progress = Math.round(((current + 1) / QUESTIONS.length) * 100)

  return (
    <div className="app-wrap">
      <div className="container">
        <header className="header">
          <h1 className="title">テック部役割診断</h1>
          <p className="subtitle">テック部でのあなたの得意ポジションを手早くチェック</p>
        </header>

        <main className="card">
          {step === 'intro' && (
            <div>
              <div className="form-row">
                <label className="label">学籍番号</label>
                <input className="input" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="例: A12345" />
              </div>
              <div className="form-row">
                <label className="label">氏名</label>
                <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="例: 山田 太郎" />
              </div>
              <div className="form-row">
                <label className="label">注意事項</label>
                <label>
                  <input className="checkbox" type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                  診断結果は部活動の振り返りに使われることを理解し、同意します。
                </label>
              </div>
              <button className={`btn btn-primary btn-block ${(!studentId || !name || !agree) ? 'btn-disabled' : ''}`} onClick={startQuiz}>診断を開始</button>
              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-secondary btn-block" onClick={viewHistory}>過去の診断履歴を見る</button>
              </div>
            </div>
          )}

          {step === 'quiz' && (
            <div>
              <div className="progress-meta">
                <span>質問 {current + 1} / {QUESTIONS.length}</span>
                <span>{progress}%</span>
              </div>
              <div className="progress"><div className="progress-bar" style={{ width: `${progress}%` }} /></div>

              <div style={{ marginTop: '1rem' }}>
                <h2 style={{ color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>{currentQuestion.text}</h2>
                <div style={{ marginTop: '.75rem', display: 'grid', gap: '.75rem' }}>
                  {currentQuestion.choices.map((c, idx) => (
                    <button key={idx} onClick={() => selectChoice(idx)} className={`choice-btn ${selectedIndex === idx ? 'selected' : ''}`}>
                      <span className="choice-prefix">選択 {idx + 1}</span>
                      <span className="choice-text">{c.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1rem' }} className="btn-group">
                <button className={`btn btn-secondary ${current === 0 ? 'btn-disabled' : ''}`} onClick={goBack} disabled={current === 0}>戻る</button>
                {current < QUESTIONS.length - 1 ? (
                  <button className={`btn btn-primary ${selectedIndex === undefined ? 'btn-disabled' : ''}`} onClick={goNext} disabled={selectedIndex === undefined}>次へ</button>
                ) : (
                  <button className={`btn btn-success ${selectedIndex === undefined ? 'btn-disabled' : ''}`} onClick={finish} disabled={selectedIndex === undefined}>結果を見る</button>
                )}
              </div>
            </div>
          )}

          {step === 'result' && record && (
            <div>
              <h2 style={{ color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>診断結果</h2>
              <p style={{ color: '#374151', marginTop: '.25rem' }}>受験者: {record.studentId} / {record.name}</p>
              <p style={{ color: '#1f2937', fontWeight: 700, marginTop: '.75rem' }}>あなたの強みが最も表れている役割: <span className="score-text">{roleLabels[record.result]}</span></p>

              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th className="results-th">役割</th>
                      <th className="results-th">割合</th>
                      <th className="results-th">説明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRoles.map((r) => (
                      <tr className="results-tr" key={r}>
                        <td className="results-td"><span className="role-name">{roleLabels[r]}</span></td>
                        <td className="results-td" style={{ width: 240 }}>
                          <div className="bar-wrap"><div className="bar-fill" style={{ width: `${record.percentages[r]}%` }} /></div>
                          <div style={{ marginTop: '.25rem', color: '#374151' }}>{record.percentages[r]}%</div>
                        </td>
                        <td className="results-td"><span className="role-desc">{roleDescriptions[r]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '1rem' }}>
                {saving === 'idle' && <div className="status wait">結果を保存できます</div>}
                {saving === 'saving' && <div className="status saving">保存中...</div>}
                {saving === 'saved' && <div className="status saved">保存しました</div>}
                {saving === 'error' && <div className="status error">保存に失敗しました（ローカル記録に切替）</div>}
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={restart}>もう一度診断する</button>
              </div>
            </div>
          )}

          {step === 'history' && (
            <div>
              <h2 style={{ color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>診断履歴</h2>
              {loadingHistory ? (
                <div className="status wait">読み込み中...</div>
              ) : historyData.length === 0 ? (
                <p style={{ color: '#6b7280', marginTop: '1rem' }}>まだ診断履歴がありません。</p>
              ) : (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="results-table">
                      <thead>
                        <tr>
                          <th className="results-th">実施日時</th>
                          <th className="results-th">学籍番号</th>
                          <th className="results-th">氏名</th>
                          <th className="results-th">主な役割</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData.slice().reverse().map((item, idx) => (
                          <tr className="results-tr" key={idx}>
                            <td className="results-td">{item.createdAt ? new Date(item.createdAt).toLocaleString('ja-JP') : ''}</td>
                            <td className="results-td">{item.studentId}</td>
                            <td className="results-td">{item.name}</td>
                            <td className="results-td"><span className="role-name">{roleLabels[item.result] || item.result}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '.9rem', marginTop: '.75rem' }}>全 {historyData.length} 件</p>
                </div>
              )}
              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={restart}>トップに戻る</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
