import React, {useState, useEffect} from 'react'
import { fetchResults } from '../lib/api'

export default function Admin(){
  const [email,setEmail] = useState('')
  const [authed,setAuthed] = useState(false)
  const [results,setResults] = useState([])

  async function login(){
    const allowed = import.meta.env.VITE_ADMIN_EMAIL
    if(email.trim()===allowed){ setAuthed(true); load() } else { alert('許可されていないアカウントです') }
  }
  async function load(){
    const data = await fetchResults(); setResults(data || [])
  }

  useEffect(()=>{
    // nothing
  },[])

  if(!authed) return (
    <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="font-bold text-lg mb-4">管理者ログイン（プロトタイプ）</h2>
        <p className="text-sm text-gray-600 mb-4">管理閲覧は tech@andrew.ac.jp のアカウントのみ許可されています。実運用はGoogle OAuthでの制限を推奨します。</p>
        <input className="w-full p-2 border rounded mb-3" placeholder="管理者メール" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="flex justify-end"><button onClick={login} className="px-3 py-2 bg-purple-600 text-white rounded">ログイン</button></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <main className="max-w-5xl mx-auto">
        <h2 className="font-bold text-xl mb-4">管理画面</h2>
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-3">結果一覧（最新 {results.length} 件）</div>
          <table className="w-full text-left border-collapse">
            <thead><tr className="text-sm text-gray-600"><th className="pb-2">氏名</th><th className="pb-2">学籍番号</th><th className="pb-2">上位役割</th><th className="pb-2">日時</th></tr></thead>
            <tbody>
              {results.map((r,i)=> (
                <tr key={i} className="border-t"><td className="py-2">{r.name}</td><td>{r.student_id||r.studentId}</td><td>{(r.result&&r.result[0])? r.result[0].role : ''}</td><td>{r.created_at||r.createdAt}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex gap-2 justify-end">
            <button className="px-3 py-2 border rounded" onClick={()=>{const csv = toCSV(results); downloadCSV(csv,'results.csv')}}>CSVをダウンロード</button>
          </div>
        </div>
      </main>
    </div>
  )
}

function toCSV(data){
  if(!data||!data.length) return ''
  const keys = Object.keys(data[0])
  const header = keys.join(',')
  const rows = data.map(r=>keys.map(k=>`"${(r[k]||'').toString().replace(/\"/g,'""')}"`).join(','))
  return [header,...rows].join('\n')
}
function downloadCSV(text,filename){const blob=new Blob([text],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}
