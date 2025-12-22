import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, ROLES } from '../data/questions'

export default function QuizPage(){
  const [studentId,setStudentId] = useState('')
  const [name,setName] = useState('')
  const [agree,setAgree] = useState(false)
  const [answers,setAnswers] = useState(Array(QUESTIONS.length).fill(null))
  const [current,setCurrent] = useState(0)
  const navigate = useNavigate()

  function start(){
    if(!studentId.trim()||!name.trim()||!agree){alert('学籍番号・氏名・同意は必須です');return}
    // move to question view (we already are on quiz page)
  }

  function selectChoice(idx){
    const next = [...answers]; next[current]=idx; setAnswers(next)
  }
  function next(){
    if(answers[current]===null){alert('選択してください');return}
    if(current<QUESTIONS.length-1){setCurrent(c=>c+1)} else {finish()}
  }
  function back(){ if(current>0) setCurrent(c=>c-1) }

  function finish(){
    // スコア集計
    const totals = {};
    ROLES.forEach(r=>totals[r]=0)
    QUESTIONS.forEach((q,qi)=>{
      const ai = answers[qi]
      const choice = q.choices[ai]
      for(const [k,v] of Object.entries(choice.scores)) totals[k] = (totals[k]||0)+v
    })
    const sum = Object.values(totals).reduce((a,b)=>a+b,0) || 1
    const result = ROLES.map(r=>({role:r,score:totals[r],pct:Math.round((totals[r]/sum)*100)})).sort((a,b)=>b.score-a.score)
    const record = {studentId,name,createdAt:new Date().toISOString(),scores:totals,result,answers}
    // save to localStorage as fallback and navigate to result page with state
    const records = JSON.parse(localStorage.getItem('results')||'[]'); records.push(record); localStorage.setItem('results',JSON.stringify(records))
    navigate('/result',{state:{record}})
  }

  const q = QUESTIONS[current]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="max-w-3xl mx-auto">
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">はじめに</h2>
          <label className="block mb-2">学籍番号<input value={studentId} onChange={e=>setStudentId(e.target.value)} className="mt-1 p-2 border rounded w-full"/></label>
          <label className="block mb-2">氏名<input value={name} onChange={e=>setName(e.target.value)} className="mt-1 p-2 border rounded w-full"/></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/> 結果は部内で閲覧されます（同意）</label>
          <div className="mt-4"><button onClick={start} className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-4 py-2 rounded">開始</button></div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">{current+1} / {QUESTIONS.length}</div>
          <div className="font-bold text-lg mb-4">{q.text}</div>
          <div className="grid gap-3">
            {q.choices.map((c,i)=> (
              <button key={i} onClick={()=>selectChoice(i)} className={`p-3 border rounded text-left ${answers[current]===i? 'ring-2 ring-purple-400':''}`}>
                {c.text}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={back} className="px-3 py-2 border rounded">戻る</button>
            <button onClick={next} className="px-3 py-2 bg-purple-600 text-white rounded">次へ</button>
          </div>
        </section>
      </main>
    </div>
  )
}
