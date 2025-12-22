import React from 'react'
import { useLocation } from 'react-router-dom'
import { ROLES } from '../data/questions'
import { saveResult } from '../lib/api'

export default function ResultPage(){
  const loc = useLocation()
  const record = loc.state?.record || JSON.parse(localStorage.getItem('results')||'[]').slice(-1)[0]

  React.useEffect(()=>{
    if(!record) return
    // Try saving to supabase (async)
    saveResult(record).catch(err=>console.warn('Supabase save failed',err))
  },[record])

  if(!record) return <div className="p-6">結果が見つかりません。診断を先に行ってください。</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="max-w-3xl mx-auto">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-3">診断結果</h2>
          <p className="text-sm text-gray-600">{record.name}（{record.studentId}） — {new Date(record.createdAt).toLocaleString()}</p>
          <div className="grid gap-3 mt-4">
            {record.result.map(r=> (
              <div key={r.role} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-bold text-purple-600">{roleLabel(r.role)}</div>
                  <div className="text-sm text-gray-600">{roleDesc(r.role)}</div>
                </div>
                <div className="text-xl font-bold">{r.pct}%</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function roleLabel(key){
  return ({commander:'司令係',worker:'作業係',liaison:'渉外係',analyst:'分析係',support:'支援係',creator:'クリエイター'})[key]
}
function roleDesc(key){
  return ({commander:'方針決定や指揮を得意とします。','worker':'実装や作業を着実にこなします。','liaison':'調整と交渉が得意です。','analyst':'論理的な分析で意思決定を支えます。','support':'チームを支えるフォロー役です。','creator':'アイデアやデザインで貢献します。'})[key]
}
